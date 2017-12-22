const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const ShortUrlSchema = new Schema({
  _id: { type: String, default: shortid.generate },
  url: String,
  createdAt: {type: Date, default: Date.now},
  click: {type: Number, default: 0},
  lastClick: Date,
  ttl: {type: Number, default: 0}
});

ShortUrlSchema.index({ click: -1 });
ShortUrlSchema.index({ createdAt: -1 });
ShortUrlSchema.index({ url: 1 });

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);