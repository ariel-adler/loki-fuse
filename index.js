'use strict';

exports.http = (request, response) => {
  response.status(200).send({
    test: true
  });
};

exports.event = (event, callback) => {
  callback();
};
