module.exports.kue = {
  prefix: 'q',
  redis: {
    port: '6379',
    host: 'redis',
    db: 1
  }
};

module.exports.db = {
  host: 'mongodb://db/short-url',
  options: {
    useMongoClient: true
  }
};