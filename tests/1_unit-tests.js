const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();
const testTexts = [
    ["Mangoes are my favorite fruit.", "american-to-british"],
    ["I ate yogurt for breakfast.", "american-to-british"],
    ["We had a party at my friend's condo.", "american-to-british"],
    ["Can you toss this in the trashcan for me?", "american-to-british"],
    ["The parking lot was full.", "american-to-british"],
    ["Like a high tech Rube Goldberg machine.", "american-to-british"],
    ["To play hooky means to skip class or work.", "american-to-british"],
    ["No Mr. Bond, I expect you to die.", "american-to-british"],
    ["Dr. Grosh will see you now.", "american-to-british"],
    ["Lunch is at 12:15 today.", "american-to-british"],
    ["We watched the footie match for a while.", "british-to-american"],
    ["Paracetamol takes up to an hour to work.", "british-to-american"],
    ["First, caramelise the onions.", "british-to-american"],
    ["I spent the bank holiday at the funfair.", "british-to-american"],
    ["I had a bicky then went to the chippy.", "british-to-american"],
    ["I've just got bits and bobs in my bum bag.", "british-to-american"],
    ["The car boot sale at Boxted Airfield was called off.", "british-to-american"],
    ["Have you met Mrs Kalyani?", "british-to-american"],
    ["Prof Joyner of King's College, London.", "british-to-american"],
    ["Tea time is usually around 4 or 4.30.", "british-to-american"]
];

suite('Unit Tests', () => {
    test('Mangoes', () => {
        assert.equal(translator.translate(""), "");
    });
});
