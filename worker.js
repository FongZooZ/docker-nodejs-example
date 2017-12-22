const kue = require('kue');
const mongoose = require('mongoose');

const ShortUrl = require('./core/models/url');
const config = require('./core/config');

const queue = kue.createQueue(config.kue);

const db = mongoose.connect(config.db.host, config.db.options);
const conn = mongoose.connection;
conn.on('error', console.log.bind(console, '**Could not connect to MongoDB. Please ensure mongod is running and restart app.**\n'));

conn.once('open', () => {
  const KUE_PORT = 3009;
  kue.app.listen(KUE_PORT, () => {
    console.log(`Kue server is listen on ${KUE_PORT}`);
  });
});

queue.process('url_click', (job, done) => {
  if (!job.data) return done();

  ShortUrl.findOne({
    _id: job.data.id
  }, (err, shortUrl) => {
    if (err) return done(err);
    ++shortUrl.click;
    shortUrl.lastClick = job.data.lastClick ? job.data.lastClick : shortUrl.lastClick;
    shortUrl.save(done);
  });
});

queue.watchStuckJobs(5000);

queue.on('error', (err) => {
  console.log('Oops... ', err);
});