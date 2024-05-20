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
                /[^a-z0-9]/.test(word.slice(-1))
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
                } else if (americanOnly.hasOwnProperty(word + " " + words[i + 1])) { // 2-words
                    word = americanOnly[word + " " + words[i + 1]];
                    if (/[^a-z]/.test(words[i + 1].slice(-1))) {
                        punctuation = words[i + 1].slice(-1);
                        hasPunctuation = true;
                    }
                    i += 1;
                    highlightWord = true;
                } else if (word === "rube") { // special 3 words
                    if (words[i + 2] === "device") {
                        word = americanOnly["rube goldberg device"];
                    } else {
                        word = americanOnly["rube goldberg machine"];
                    }
                    if (/[^a-z]/.test(words[i + 2].slice(-1))) {
                        punctuation = words[i + 2].slice(-1);
                        hasPunctuation = true;
                    }
                    i += 2;
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
            if (highlightWord) {
                word = this.highlight(word);
            }
            if (hasPunctuation) {
                word += punctuation;
            }

            translatedWords.push(word);
        }

        return translatedWords.join(" ");
    }
}

module.exports = Translator;