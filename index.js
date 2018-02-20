'use strict';
var gcs = require('@google-cloud/storage')();
const Datastore = require('@google-cloud/datastore');

const datastore = new Datastore({
  projectId: "loki-195808",
});

exports.http = (request, response) => {
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


exports.postAnswer = (request, response) => {
  var json = request.body;
  console.log(json);
  var kind = 'UserAnswer';
// The name/ID for the new entity
var name = "userAnswer"+json.id + "_" + json.question;
// The Cloud Datastore key for the new entity
var userAnswerKey = datastore.key([kind, name]);
var userAnswer = {
  key: userAnswerKey,
  data: json,
};
datastore
  .save(userAnswer)
  .then(() => {
    console.log(`Saved ${userAnswer.key.name}: ${userAnswer.data.id}`);
    response.status(200).send('Sababa Saved');
  })
  .catch(err => {
    console.error('ERROR:', err);
    response.status(500).send(err);
  });

  // Write to DB
  // gcd.save(json)
  // .then(() => {
  //   response.status(200).send('Sababa');
  // })
  // .catch(err => {
  //   console.log('Save error: ' + err);
  //   response.status(500).send(err);
  // });
  
};
exports.event = (event, callback) => {
  callback();
};


