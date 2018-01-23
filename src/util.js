const _ = require('lodash');

module.exports = {
  isTweet: _.conforms({
    user: _.isObject,
    id_str: _.isString,
    text: _.isString,
  }),
};
