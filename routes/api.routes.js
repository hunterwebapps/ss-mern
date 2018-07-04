'use strict';
const router = require('express').Router();
const usersApi = require('./users.routes');
const clientsApi = require('./clients.routes');

router.use('/Users', usersApi);
router.use('/Clients', clientsApi);

module.exports = router;