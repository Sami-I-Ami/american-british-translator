'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const {text, locale} = req.body
      const translation = translator.translate(text, locale);
      if (text === translation) {
        res.json({text, translation: "Everything looks good to me!"});
      } else {
        res.json({text, translation});
      }
    });
};
