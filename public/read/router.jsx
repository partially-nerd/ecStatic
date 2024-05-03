const { Templater, read } = require("./library/templater");

module.exports = (url) => {
    return Templater(read(url));
}