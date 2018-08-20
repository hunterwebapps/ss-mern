'use strict';
const router = require('express').Router();
const usersApi = require('./users.routes');
const clientsApi = require('./clients.routes');
const pagesApi = require('./pages.routes');
const packageTypesApi = require('./packageTypes.routes');
const operatingLocationsApi = require('./operatingLocations.routes');
const addonsApi = require('./addons.routes');
const serviceLevelsApi = require('./serviceLevel.routes');
const addressesApi = require('./addresses.routes');
const accountsApi = require('./accounts.routes');
const sprintsApi = require('./sprints.routes');
const trackingLogsApi = require('./trackingLogs.routes');
const { NOT_FOUND } = require('../constants');

router.use('/Users', usersApi);
router.use('/Clients', clientsApi);
router.use('/Pages', pagesApi);
router.use('/PackageTypes', packageTypesApi);
router.use('/OperatingLocations', operatingLocationsApi);
router.use('/Addons', addonsApi);
router.use('/ServiceLevels', serviceLevelsApi);
router.use('/Addresses', addressesApi);
router.use('/Accounts', accountsApi);
router.use('/Sprints', sprintsApi);
router.use('/TrackingLogs', trackingLogsApi);
router.use('/*', (req, res) => res.status(NOT_FOUND).send('Could Not Find Resources'));

module.exports = router;