const homeController = require('../controllers/home');

module.exports = app => {
  app.route('/')
    .get(homeController.index);
};