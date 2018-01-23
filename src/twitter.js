const Twitter = require('twitter');
const config = require('./config');

module.exports = new Twitter({
  consumer_key: config.twitter.apiKey,
  consumer_secret: config.twitter.apiSecret,
  access_token_key: config.twitter.accessToken,
  access_token_secret: config.twitter.accessTokenSecret,
});
