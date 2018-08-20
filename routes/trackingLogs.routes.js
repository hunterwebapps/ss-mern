const router = require('express').Router();
const { OK, CREATED, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, ERROR } = require('../constants');

const { TrackingLogTypeModel, TrackingLogTypeExists } = require('../models/TrackingLogTypes.model');

router.get('/Types', async (req, res) => {
    const types = await TrackingLogTypeModel.find(null);

    if (types.length === 0) {
        return res.status(NOT_FOUND).end('No Tracking Log Types Found...');
    }

    res.status(OK).json(types);
});

router.post('/Types', async (req, res) => {
    const type = req.body;

    if (await TrackingLogTypeExists(type.Code)) {
        return res.status(BAD_REQUEST).end('Tracking Log Type Already Exists');
    }

    try {
        const newType = await TrackingLogTypeModel.create({
            Client: req.user.Client,
            Code: type.Code,
            Description: type.Description,
            SortOrder: type.SortOrder,
            AllowMultiple: type.AllowMultiple,
            InternalUseOnly: type.InternalUseOnly,
            Inactive: type.Inactive
        });

        res.status(CREATED).json(newType);
    } catch (e) {
        return res.status(ERROR).end(`Failed to Create Tracking Log Type: ${e.message}`);
    }
});

module.exports = router;