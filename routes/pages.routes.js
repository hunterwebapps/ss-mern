'use strict'
const router = require('express').Router();
const { OK, CREATED, NOT_FOUND, BAD_REQUEST, ERROR } = require('../constants');

const mongoose = require('mongoose');
const { PageModel, PageCodeExists } = require('../models/Pages.model');

router.get('/', async (req, res) => {
    var pages = await PageModel.find(null);

    if (pages.length === 0) {
        res.status(NOT_FOUND).send('No Pages Found...');
        return;
    }
    res.status(OK).send(pages);
});

router.post('/', async (req, res) => {
    const page = req.body;

    if (await PageCodeExists(page.Code)) {
        res.status(BAD_REQUEST).send('Page Code already exists...');
        return;
    }

    try {
        const newPage = await PageModel.create({
            Code: page.Code,
            Description: page.Description,
            Link: page.Link,
            Creator: req.user._id,
            Inactive: page.Inactive
        });

        res.status(CREATED).send(newPage);
    } catch (e) {
        res.status(BAD_REQUEST).send(`Failed to Create Page: ${e.message}`);
    }
});

module.exports = router;