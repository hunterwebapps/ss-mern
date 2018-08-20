'use strict';
const router = require('express').Router();
const {
    // Tables
    PACKAGE_TYPES_TABLE,
    // HTTP Status Codes
    OK, CREATED, NOT_FOUND, BAD_REQUEST, ERROR
} = require('../constants');

const { PackageTypeModel, PackageTypeDescriptionExists } = require('../models/PackageTypes.model');

router.get('/:id?', async (req, res) => {
    const types = await PackageTypeModel.find(req.params.id);

    if (types.length === 0) {
        res.status(NOT_FOUND).send('No Package Types Found...');
        return;
    }

    res.status(OK).send(types);
});

router.post('/', async (req, res) => {
    const type = req.body;
    if (await PackageTypeDescriptionExists(type.Description)) {
        res.status(BAD_REQUEST).send(`Package Type Description already exist: ${type.Description}`);
        return;
    }

    try {
        const newType = await PackageTypeModel.create({
            Description: type.Description,
            Price: type.Price,
            SortOrder: type.SortOrder,
            InternalUseOnly: type.InternalUseOnly,
            Inactive: type.Inactive
        });

        res.status(CREATED).send(newType);
    } catch (e) {
        res.status(ERROR).send(`Failed to create Package Type: ${e.message}`);
    }
});

module.exports = router;