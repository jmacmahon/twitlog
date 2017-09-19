/* eslint no-console: "off" */

const Twitter = require('twitter');
const { MongoClient } = require('mongodb');
const _ = require('lodash');

const database = process.env.DATABASE || 'twitlog';
const trackValue = process.env.TRACK_VALUE || 'maclambda_test';
const apiKey = process.env.API_KEY || '';
const apiSecret = process.env.API_SECRET || '';
const accessToken = process.env.ACCESS_TOKEN || '';
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || '';

const isTweet = _.conforms({
  user: _.isObject,
  id_str: _.isString,
  text: _.isString,
});

const mongoConnectionP = MongoClient.connect(`mongodb://localhost:27017/${database}`);

const twitterClient = new Twitter({
  consumer_key: apiKey,
  consumer_secret: apiSecret,
  access_token_key: accessToken,
  access_token_secret: accessTokenSecret,
});

const tweetStream = twitterClient.stream(
  'statuses/filter',
  { track: trackValue },
);
tweetStream.on('error', (err) => {
  throw err;
});
tweetStream.on('data', (event) => {
  if (isTweet(event)) {
    console.log(`${event.user.name} / @${event.user.screen_name}: ${event.text}`);
    mongoConnectionP
      .then(db => db.collection(trackValue))
      .then(coll => coll.insertOne(event))
      .then((res) => {
        if (res.insertedCount === 1) {
          console.log('-> success');
        } else {
          console.log('-> no error but did not insert??');
        }
      })
      .catch(err => console.log(err));
  } else {
    console.log('Non-tweet event:');
    console.log(event);
  }
});
