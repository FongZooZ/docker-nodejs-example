const kue = require('kue');
const config = rootRequire('core/config');

module.exports = kue.createQueue(config.kue);