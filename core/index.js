const mongoose = require('mongoose');
const { walk } = require('./lib/helpers');

module.exports.bootstrap = () => {
  walk(`${process.cwd()}/core/models`, null, path => {
    const model = require(path);
    model.on('index', err => {
      if (err) {
        console.error(model.modelName);
        console.error(err);
      }
    });
  });

  mongoose.set('debug', process.env.NODE_ENV != 'production');
};