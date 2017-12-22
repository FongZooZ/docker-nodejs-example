const fs = require('fs');
const path = require('path');
const { ERROR } = require('./constants');

// load any additional files you have in routes and apply those to the app
module.exports.loadRoutes = (cwd, ...args) => {
  const files = fs.readdirSync(cwd);
  for (let index in files) {
    const file = files[index];
    if (file === 'index.js') continue;
    // skip non-javascript files
    if (path.extname(file) != '.js') continue;

    const route = require(path.resolve(cwd, path.basename(file)));

    if (typeof route === 'function') {
      route(...args);
    }
  }
};

module.exports.walk = (modulesPath, excludeDir, callback) => {
  fs.readdirSync(modulesPath).forEach(function (file) {
    var newPath = path.join(modulesPath, file);
    var stat = fs.statSync(newPath);
    if (stat.isFile() && /(.*)\.(js|coffee)$/.test(file)) {
      callback(newPath);
    } else if (stat.isDirectory() && file !== excludeDir) {
      walk(newPath, excludeDir, callback);
    }
  });
};

module.exports.eg = (statusCode, message, errorCode, type, reason) => {
  const error = ERROR[statusCode];
  return {
    error: {
      type: type || error.type,
      message: message || error.message,
      code: errorCode || error.code,
      reason: reason || error.reason
    }
  };
};