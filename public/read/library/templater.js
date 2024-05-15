const fs = require("fs");
const safeEval = require("safe-eval");
const got = require('got');
const VARIABLES = {};

function textBetween(str, start, end) {
  start = start.replaceAll("*", "\\*");
  end = end.replaceAll("*", "\\*");
  return str.match(new RegExp(start + "\\n+((.|\\n)*)\\n*" + end))[1];
}

async function templater(data) {
  // COMPONENT OR PAGE
  const isPage = data.split("\n", 1)[0] == "**PAGE**" ? true : false;

  // SECTIONING DEPENDING ON isPage
  let vars, head, body, styles, scripts;
  if (isPage) {
    vars = textBetween(data, "**VARS**", "**HEAD**").split("\n");

    vars.forEach((line) => {
      const [varName, varValue] = line.split(/\s*=\s*/);
      VARIABLES[varName] = varValue;
      data = data.replace(new RegExp("\\$" + varName, "g"), varValue);
    });

    head = textBetween(data, "**HEAD**", "**BODY**");
  } else {
    vars = textBetween(data, "**VARS**", "**BODY**").split("\n");

    vars.forEach((line) => {
    const [varName, varValue] = line.split(/\s*=\s*/);
      VARIABLES[varName] = varValue;
      data = data.replace(new RegExp("\\$" + varName, "g"), varValue);
    });

    head = false;
  }

  // JS REPLACEMENTS / SAFE EVAL
  data = data.replace(/(<\/*.*>)\+/g, "_+=`$1`;");
  [...data.matchAll(/(^\s*#|#$)(([^#]|\n)*)(^\s*#|#$)/gm)].forEach(
    (match_) => {
      data = data.replace(
        match_[0],
        safeEval('function () {let _="";' + match_[2] + "return _}()")
      );
    }
  );

  // SECTIONING INDEPENDENT OF isPage
  body = textBetween(data, "**BODY**", "**STYLES**");
  styles = textBetween(data, "**STYLES**", "**SCRIPTS**");
  scripts = data.split("**SCRIPTS**")[1];

  // COMPONENT SYSTEM
  async function addComponents() {
    const matches = [...body.matchAll(/\*\*(.*)\*\*/g)];
    for (let i = 0; i < matches.length; i++) {
      const match_ = matches[i];
      console.log("REQUESTED COMPONENT ", match_[1]);
      let rendered_component = await got('http://127.0.0.1:3000/' + match_[1]);
      body = body.replace(match_[0],  rendered_component.body);
    }
    return body;
  }

  await addComponents();

  // COMPILING BASED ON isPage
  if (!isPage) return /*html*/ `<style style="display: none">${styles}</style><script style="display: none" defer type='module'>${scripts}</script>${body}`;
  else return  /*html*/ `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">${head}<style>${styles}</style><script defer type="module">${scripts}</script></head><body>${body}</body></html>`;
}

module.exports = {
  Templater: templater,
  read: (url) => fs.readFileSync(url, { encoding: "utf8" }),
}