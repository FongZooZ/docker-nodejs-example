const { loadRoutes } = rootRequire('core/lib/helpers');

module.exports = app => {
  loadRoutes(__dirname, app);
};