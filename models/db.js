const mongoose = require('mongoose');
const { DATABASE } = require('../constants');

mongoose.connect(DATABASE);

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo Server...');
});

mongoose.connection.on('error', error => {
    setTimeout(() => mongoose.connect(DATABASE), 3000);
    console.log('Mongo Connection Error, Retrying in 3 secs...', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongo Disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('App Terminated, Mongo Connection Closed');
        process.exit(0);
    });
});

require('./Users.model');

module.exports = mongoose;