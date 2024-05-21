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
        assert.equal(translator.translate(testTexts[0][0], testTexts[0][1]), "Mangoes are my favourite fruit.");
    });
    test('Yogurt', () => {
        assert.equal(translator.translate(testTexts[1][0], testTexts[1][1]), "I ate yoghurt for breakfast.");
    });
    test('Party', () => {
        assert.equal(translator.translate(testTexts[2][0], testTexts[2][1]), "We had a party at my friend's flat.");
    });
    test('Toss', () => {
        assert.equal(translator.translate(testTexts[3][0], testTexts[3][1]), "Can you toss this in the bin for me?");
    });
    test('Parking lot', () => {
        assert.equal(translator.translate(testTexts[4][0], testTexts[4][1]), "The car park was full.");
    });
    test('High tech', () => {
        assert.equal(translator.translate(testTexts[5][0], testTexts[5][1]), "Like a high tech Heath Robinson device.");
    });
    test('Play hooky', () => {
        assert.equal(translator.translate(testTexts[6][0], testTexts[6][1]), "To bunk off means to skip class or work.");
    });
    test('Mr. Bond', () => {
        assert.equal(translator.translate(testTexts[7][0], testTexts[7][1]), "No Mr Bond, I expect you to die.");
    });
    test('Dr. Grosh', () => {
        assert.equal(translator.translate(testTexts[8][0], testTexts[8][1]), "Dr Grosh will see you now.");
    });
    test('Lunch', () => {
        assert.equal(translator.translate(testTexts[9][0], testTexts[9][1]), "Lunch is at 12.15 today.");
    });
    test('Footie', () => {
        assert.equal(translator.translate(testTexts[10][0], testTexts[10][1]), "We watched the soccer match for a while.");
    });
    test('Paracetamol', () => {
        assert.equal(translator.translate(testTexts[11][0], testTexts[11][1]), "Tylenol takes up to an hour to work.");
    });
    test('Caramelise', () => {
        assert.equal(translator.translate(testTexts[12][0], testTexts[12][1]), "First, caramelize the onions.");
    });
    test('Bank holiday', () => {
        assert.equal(translator.translate(testTexts[13][0], testTexts[13][1]), "I spent the public holiday at the carnival.");
    });
    test('Bicky', () => {
        assert.equal(translator.translate(testTexts[14][0], testTexts[14][1]), "I had a cookie then went to the fish-and-chip shop.");
    });
    test('Bits and bobs', () => {
        assert.equal(translator.translate(testTexts[15][0], testTexts[15][1]), "I've just got odds and ends in my fanny pack.");
    });
    test('Car boot sale', () => {
        assert.equal(translator.translate(testTexts[16][0], testTexts[16][1]), "The trunk sale at Boxted Airfield was called off.");
    });
    test('Mrs Kalyani', () => {
        assert.equal(translator.translate(testTexts[17][0], testTexts[17][1]), "Have you met Mrs. Kalyani?");
    });
    test('Prof Joyner', () => {
        assert.equal(translator.translate(testTexts[18][0], testTexts[18][1]), "Prof. Joyner of King's College, London.");
    });
    test('Tea time', () => {
        assert.equal(translator.translate(testTexts[19][0], testTexts[19][1]), "Tea time is usually around 4 or 4:30.");
    });
    test('Highlight mangoes', () => {
        assert.equal(translator.translate(testTexts[0][0], testTexts[0][1], true), 'Mangoes are my <span class="highlight">favourite</span> fruit.');
    });
    test('Highlight yogurt', () => {
        assert.equal(translator.translate(testTexts[1][0], testTexts[1][1], true), 'I ate <span class="highlight">yoghurt</span> for breakfast.');
    });
    test('Highlight footie', () => {
        assert.equal(translator.translate(testTexts[10][0], testTexts[10][1], true), 'We watched the <span class="highlight">soccer</span> match for a while.');
    });
    test('Highlight paracetamol', () => {
        assert.equal(translator.translate(testTexts[11][0], testTexts[11][1], true), '<span class="highlight">Tylenol</span> takes up to an hour to work.');
    });
});
