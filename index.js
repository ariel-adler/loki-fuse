'use strict';
var gcs = require('@google-cloud/storage')();

exports.http = (request, response) => {
  var file = gcs.bucket('loki-195808.appspot.com').file('/games/loki-games.json');
  var readStream = file.createReadStream();
  readStream.pipe(response);
};

exports.event = (event, callback) => {
  callback();
};
