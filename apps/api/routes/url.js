const url = require('../controllers/url');

module.exports = app => {
  app.route('/api/short-url')
    .post(url.save);

  app.route('/api/short-url/:shortUrl')
    .get(url.fetch);

  app.route('/:shortUrl')
    .get(url.redirect);
};