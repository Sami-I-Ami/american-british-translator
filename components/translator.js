const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    highlight(words) {
        return `<span class="highlight">${words}</span>`
    }

    translate(text, locale) {
        let words = text.split(" ");
        let translatedWords = [];
        for (let i = 0; i < words.length; i++) {
            let word = words[i];

            // check for capitalization or punctuation
            let isCapitalized = false;
            let hasPunctuation = false;
            let punctuation = "";
            if (/[A-Z]/.test(word[0])) {
                word = word.toLowerCase();
                isCapitalized = true;
            }
            if (
                /[^a-z]/.test(word.slice(-1))
                & !americanToBritishTitles.hasOwnProperty(word) // titles need their punctuation
            ) {
                punctuation = word.slice(-1);
                word = word.slice(0, -1);
                hasPunctuation = true;
            }

            // translate and set to highlight
            let highlightWord = false;
            if (locale === "american-to-british") {
                if (americanOnly.hasOwnProperty(word)) {
                    word = americanOnly[word];
                    highlightWord = true;
                } else if (americanOnly.hasOwnProperty(word + " " + words[i + 1])) {
                    word = americanOnly[word + " " + words[i + 1]];
                    i += 1;
                    highlightWord = true;
                } else if (americanToBritishTitles.hasOwnProperty(word)) {
                    word = americanToBritishTitles[word];
                    highlightWord = true;
                } else if (americanToBritishSpelling.hasOwnProperty(word)) {
                    word = americanToBritishSpelling[word];
                    highlightWord = true;
                } else if (/[0-9]+:[0-9]+/.test(word)) {
                    const parts = word.split(":");
                    word = parts[0] + "." + parts[1];
                    highlightWord = true;
                }      
            }

            // put back capitalization and punctuation and highlight
            if (isCapitalized) {
                word = word[0].toUpperCase() + word.slice(1);
            }
            if (hasPunctuation) {
                word += punctuation;
            }
            if (highlightWord) {
                word = this.highlight(word);
            }

            translatedWords.push(word);
        }

        return translatedWords.join(" ");
    }
}

module.exports = Translator;