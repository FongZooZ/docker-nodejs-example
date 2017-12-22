// const mongoose = require('mongoose');
// const ShortUrl = mongoose.model('ShortUrl');
const ShortUrl = require('../models/url');

const shortUrl = (req, res, next) => {
  ShortUrl.findOne({
    _id: req.params.shortUrl
  }, (err, short) => {
    if (err) return next(err);
    req.shortUrl = short;
    next();
  });
};

module.exports.init = app => {
	app.param('shortUrl', shortUrl);
};