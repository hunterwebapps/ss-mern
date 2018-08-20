'use strict';
const router = require('express').Router();
const { OK, CREATED, UNAUTHORIZED, NOT_FOUND, BAD_REQUEST, ERROR } = require('../constants');

const { AddonsModel, AddonExists } = require('../models/Addons.model');

router.get('/', async (req, res) => {
    var addons = await AddonsModel.find(null);

    if (addons.length === 0) {
        res.status(NOT_FOUND).send('No Addons Found...');
        return;
    }

    res.status(OK).send(addons);
});

router.post('/', async (req, res) => {
    const addon = req.body;

    if (await AddonExists(req.user.client, addon.Code)) {
        res.status(BAD_REQUEST).send('Addon Already Exists...');
        return;
    }

    try {
        const newAddon = await AddonsModel.create({
            Client: req.user.client,
            Code: addon.Code,
            Description: addon.Description,
            Charge: addon.Charge,
            PerPackage: addon.PerPackage,
            Image: addon.Image,
            SortOrder: addon.SortOrder,
            InternalUseOnly: addon.InternalUseOnly,
            Inactive: addon.Inactive
        });

        res.status(CREATED).send(newAddon);
    } catch (e) {
        res.status(ERROR).send(`Failed to Create Addon: ${e.message}`);
    }
});

module.exports = router;