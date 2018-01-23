const config = require('./config');
const { MongoClient } = require('mongodb');

module.exports = MongoClient.connect(`mongodb://localhost:27017/${config.database.database}`);
