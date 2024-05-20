const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    constructor(text, locale) {
        this.text = text;
        this.locale = locale;
    }

    highlight(words) {
        return `<span class="highlight">${words}</span>`
    }

    translate() {

    }
}

module.exports = Translator;