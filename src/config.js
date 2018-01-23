module.exports = {
  database: {
    database: process.env.DATABASE || 'twitlog',
  },
  stream: {
    trackValue: process.env.TRACK_VALUE || 'maclambda_test',
  },
  twitter: {
    apiKey: process.env.API_KEY || '',
    apiSecret: process.env.API_SECRET || '',
    accessToken: process.env.ACCESS_TOKEN || '',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
  },
};
