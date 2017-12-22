const async = require('async');
// const mongoose = require('mongoose');
// const ShortUrl = mongoose.model('ShortUrl');
const ShortUrl = rootRequire('core/models/url');
const { eg } = rootRequire('core/lib/helpers');
const taskqueue = rootRequire('core/lib/taskqueue');

exports.fetch = (req, res, next) => {
  if (!req.shortUrl) return res.status(400).json(eg(404));
  res.json(req.shortUrl);
};

exports.save = (req, res, next) => {
  if (!req.body || !req.body.url) return res.sendStatus(400);

  const getShortUrl = cb => {
    const cond = {
      url: req.body.url
    };
    ShortUrl.findOne(cond, cb);
  };

  const saveShortUrl = (short, cb) => {
    if (short) return cb(null, short);
    short = new ShortUrl({
      url: req.body.url
    });
    short.save(cb);
  };

  async.waterfall([getShortUrl, saveShortUrl], (err, short) => {
    if (err) return next(err);
    res.json(short);
  });
};

exports.redirect = (req, res, next) => {
  if (!req.shortUrl) return res.redirect('/');

  const jobData = {
    id: req.shortUrl._id,
    lastClick: new Date()
  };

  taskqueue.create('url_click', jobData).removeOnComplete(true).save();

  res.redirect(req.shortUrl.url);
};