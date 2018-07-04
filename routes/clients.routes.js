'use strict';
const router = require('express').Router();
const { OK, CREATED, UNAUTHORIZED, NOT_FOUND, BAD_REQUEST, ERROR } = require('../constants');

const mongoose = require('mongoose');
const { ClientModel, CodeExists } = require('../models/Clients.model');
const { AddressSchema } = require('../models/Addresses.model');

router.get('/', async (req, res) => {

});

// POST Create Client
router.post('/', async (req, res) => {
    const client = req.body;
    
    if (await CodeExists(client.Code)) {
        res.status(BAD_REQUEST).send('Client Code already exists...');
        return;
    }

    try {
        const newClient = await ClientModel.create({
            Code: client.Code,
            Contact: {
                FirstName: client.FirstName,
                LastName: client.LastName,
                JobTitle: client.JobTitle,
                Company: client.Company,
                Address: {
                    Address1: client.Address1,
                    Address2: client.Address2,
                    City: client.City,
                    State: client.State,
                    PostalCode: client.PostalCode,
                    Country: client.Country
                },
                PhoneNumbers: client.PhoneNumbers,
                EmailAddresses: client.EmailAddresses
            }
        });
    } catch (e) {
        res.status(ERROR).send(`Failed to create client: ${e.message}`);
        return;
    }

    res.status(CREATED).send(newClient);
});

module.exports = router;