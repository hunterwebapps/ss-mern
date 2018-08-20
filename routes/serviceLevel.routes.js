'use strict';
const router = require('express').Router();
const { OK, CREATED, BAD_REQUEST, NOT_FOUND, ERROR } = require('../constants');

const { ServiceLevelModel, ServiceLevelExists } = require('../models/ServiceLevels.model');

router.get('/', async (req, res) => {
    const serviceLevels = await ServiceLevelModel.find(null);

    if (serviceLevels.length === 0) {
        res.status(NOT_FOUND).send('No Service Levels Found...');
        return;
    }

    res.status(OK).send(serviceLevels);
});

router.post('/', async (req, res) => {
    const serviceLevel = req.body;

    if (await ServiceLevelExists(req.user.client, serviceLevel.Code)) {
        res.status(BAD_REQUEST).send('Service Level Already Exists');
        return;
    }

    try {
        const newServiceLevel = await ServiceLevelModel.create({
            Client: req.user.client,
            Code: serviceLevel.Code,
            Description: serviceLevel.Description,
            ServiceWindowHours: serviceLevel.ServiceWindowHours,
            SortOrder: serviceLevel.SortOrder,
            InternalUseOnly: serviceLevel.InternalUseOnly,
            Inactive: serviceLevel.Inactive
        });

        res.status(CREATED).send(newServiceLevel);
    } catch (e) {
        res.status(ERROR).send(`Failed to Create Service Level: ${e.message}...`);
    }
});

module.exports = router;