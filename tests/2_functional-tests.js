const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const translateText = ["I've just got bits and bobs in my bum bag.", "british-to-american"];
const translation = [`I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`, "Everything looks good to me!"]
const noTranslateText = ["Lovely day we're having.", "american-to-british"];

suite('Functional Tests', () => {
    test('Translate with valid fields', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({
                text: translateText[0],
                locale: translateText[1]
            })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.text, translateText[0]);
            assert.equal(res.body.translation, translation[0]);
            done();
          });
    });
    test('Translate with invalid locale', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({
                text: translateText[0],
                locale: "not-a-locale"
            })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.error, "Invalid value for locale field");
            done();
          });
    });
    test('Translate with no text given', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({
                locale: translateText[1]
            })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.error, "Required field(s) missing");
            done();
          });
    });
    test('Translate with no locale given', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({
                text: translateText[0]
            })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.error, "Required field(s) missing");
            done();
          });
    });
    test('Translate with empty text', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({
                text: "",
                locale: translateText[1]
            })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.error, "No text to translate");
            done();
          });
    });
    test('Translate with no needed translation', function(done) {
        chai.request(server)
          .post('/api/translate')
          .send({
                text: noTranslateText[0],
                locale: noTranslateText[1]
            })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.body.text, noTranslateText[0]);
            assert.equal(res.body.translation, translation[1]);
            done();
          });
    });
});
