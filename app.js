const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');

const { bootstrap } = require('./core');
const params = require('./core/middlewares/params');

global.rootRequire = name => require(process.cwd() + '/' + name);

const app = express();

bootstrap();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

params.init(app);

require('./apps/api/routes')(app);

// error handler
app.use(errorHandler());

module.exports = app;
