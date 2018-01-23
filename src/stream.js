const config = require('./config');
const twitterClient = require('./twitter');
const mongoConnectionP = require('./db');
const _ = require('lodash');

const isTweet = _.conforms({
  user: _.isObject,
  id_str: _.isString,
  text: _.isString,
});

const tweetStream = twitterClient.stream(
  'statuses/filter',
  { track: config.stream.trackValue },
);

tweetStream.on('error', (err) => {
  throw err;
});

tweetStream.on('data', async (event) => {
  if (isTweet(event)) {
    console.log(`${event.user.name} / @${event.user.screen_name}: ${event.text}`);
    try {
      const mongoConnection = await mongoConnectionP;
      const coll = await mongoConnection.collection(config.stream.trackValue);
      const res = await coll.insertOne(event);
      if (res.insertedCount === 1) {
        console.log('-> success');
      } else {
        console.log('-> no error but did not insert??');
        console.log(JSON.stringify(res));
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('Non-tweet event:');
    console.log(event);
  }
});
