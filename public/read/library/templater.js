const yaml = require("yaml");
const fs = require("fs");
const safeEval = require('safe-eval');

const VARIABLES = {};

module.exports = {
    Templater: (data) => {
        const vars = data.split("**VARS**\n")[1].split("\n\n**HEAD**")[0].split("\n");
        vars.forEach(line => {
            const [varName, varValue] = line.split("=");
            VARIABLES[varName] = varValue;
            data = data.replace(new RegExp("\\$"+varName, "g"), varValue);
        });
        data = data.replace(/(<\/*.*>)\+/g, "_+=`$1`;");
        // while (true) {
        //     let match_ = data.match(/(^\s*#|#$)(([^#]|\n)*)(^\s*#|#$)/m);
        //     if (!match_) break;
        //     data = data.replace(match_[0], safeEval('function () {let _="";'+match_[2]+'return _}()'));
        // }
        [...data.matchAll(/(^\s*#|#$)(([^#]|\n)*)(^\s*#|#$)/mg)].forEach(match_ => {
            data = data.replace(match_[0], safeEval('function () {let _="";'+match_[2]+'return _}()'));
        });
        const head    = data.split("**HEAD**\n")[1].split("\n\n**BODY**")[0];
        const body    = data.split("**BODY**\n")[1].split("\n\n**STYLES**")[0];
        const styles  = data.split("**STYLES**\n")[1].split("\n\n**SCRIPTS**")[0];
        const scripts = data.split("**SCRIPTS**\n")[1];
        return /*html*/ `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" type="image/x-icon" href="/public/read/favicon.ico">
            ${head}
            <style>
                ${styles}
            </style>
            <script defer type='module'>
                ${scripts}
            </script>
        </head>
        <body>
            ${body}
        </body>
        </html>`;
    },
    read: (url) => fs.readFileSync(url, { encoding: 'utf8' })
}