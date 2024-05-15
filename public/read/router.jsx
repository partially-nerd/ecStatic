const { Templater, read } = require("../../public/read/library/templater");

module.exports = (url) => {
    return Templater(read(url));
}