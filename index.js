'use strict';
var gcs = require('@google-cloud/storage')();

exports.questions = (request, response) => {
  var file = gcs.bucket('loki-195808.appspot.com').file('/games/loki-games.json');
  var readStream = file.createReadStream();
  var file_content = '';
  var retval = '';
  readStream
    .on('data', function(d) {
      file_content += d.toString();
    })
    .on('end', function() {
      var json_content = JSON.parse(file_content);
      json_content.games.forEach(function(game) {
        console.log('game' + game.name);
        game.questions.forEach(function(question) {
          console.log('question' + question.id);
          question.answers.forEach(function(answer){
            console.log('answer' + answer.id);
            delete answer.correct;
          });
        });
      });
      retval = JSON.stringify(json_content);
      response.setHeader('content-type', 'application/json');
      response.status(200).send(retval).end();
    });

}


exports.event = (event, callback) => {
  callback();
};


