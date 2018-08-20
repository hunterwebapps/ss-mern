'use strict';
const debug = require('debug'),
    express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    db = require('./models/db'),
    auth = require('./middleware/authentication');

const routes = require('./routes/index.routes');
const api = require('./routes/api.routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/', [
    logger('dev'),
    express.json(),
    express.urlencoded({ extended: false }),
    express.static(path.join(__dirname, 'public')),
    express.static(path.join(__dirname, 'models')),
    cookieParser(),
    favicon(path.join(__dirname, 'public/favicon.ico')),
    auth
]);

// Catch API Calls First
app.use('/api', api);

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        console.log(err, err.message);
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err.message);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Express server listening on port ${port}...`));