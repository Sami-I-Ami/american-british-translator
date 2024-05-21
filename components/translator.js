const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    // snippet from stack overflow
    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
    
    highlight(words) {
        return `<span class="highlight">${words}</span>`
    }

    translate(text, locale, highlightWords) {
        let words = text.split(" ");
        let translatedWords = [];
        for (let i = 0; i < words.length; i++) {
            let word = words[i];

            // check for capitalization or punctuation
            let isCapitalized = false;
            let hasPunctuation = false;
            let punctuation;
            if (/[A-Z]/.test(word[0])) {
                word = word[0].toLowerCase() + word.slice(1);
                isCapitalized = true;
            }
            if (
                /[^A-Za-z0-9]/.test(word.slice(-1))
                & !americanToBritishTitles.hasOwnProperty(word) // titles need their punctuation
            ) {
                punctuation = word.slice(-1);
                word = word.slice(0, -1);
                hasPunctuation = true;
            }
            
            // translate and set to highlight
            let highlightWord = false;
            let secondWord = words[i + 1];
            if (secondWord) {
                if (/[^A-Za-z]/.test(secondWord.slice(-1))) { // test if the 2nd word has punctuation
                    punctuation = secondWord.slice(-1);
                    secondWord = secondWord.slice(0, -1);
                }
            }
            if (locale === "american-to-british") {
                if (americanOnly.hasOwnProperty(word)) {
                    word = americanOnly[word];
                    highlightWord = true;
                } else if (americanOnly.hasOwnProperty(word + " " + secondWord)) { // 2-words
                    word = americanOnly[word + " " + secondWord];
                    if (punctuation) {
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
            } else if (locale === "british-to-american") {
                if (britishOnly.hasOwnProperty(word)) {
                    word = britishOnly[word];
                    highlightWord = true;
                } else if (britishOnly.hasOwnProperty(word + " " + secondWord)) { // 2-words
                    word = britishOnly[word + " " + secondWord];
                    if (punctuation) {
                        hasPunctuation = true;
                    }
                    i += 1;
                    highlightWord = true;
                } else if (word === "heath" | word === "bits") { // special 3 words
                    if (word === "heath") {
                        word = britishOnly["heath robinson device"]
                    } else {
                        word = britishOnly["bits and bobs"]
                    }
                    if (/[^a-z]/.test(words[i + 2].slice(-1))) {
                        punctuation = words[i + 2].slice(-1);
                        hasPunctuation = true;
                    }
                    i += 2;
                    highlightWord = true;
                } else if (Object.values(americanToBritishTitles).includes(word)) {
                    word = this.getKeyByValue(americanToBritishTitles, word);
                    console.log(word);
                    highlightWord = true;
                } else if (Object.values(americanToBritishSpelling).includes(word)) {
                    word = this.getKeyByValue(americanToBritishSpelling, word);
                    highlightWord = true;
                } else if (/[0-9]+.[0-9]+/.test(word)) {
                    const parts = word.split(".");
                    word = parts[0] + ":" + parts[1];
                    highlightWord = true;
                }      
            }

            // put back capitalization and punctuation and highlight
            if (isCapitalized) {
                word = word[0].toUpperCase() + word.slice(1);
            }
            if (highlightWord & highlightWords) {
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