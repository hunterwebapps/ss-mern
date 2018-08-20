'use strict';
const router = require('express').Router();
const { OK, CREATED, UNAUTHORIZED, NOT_FOUND, BAD_REQUEST, ERROR } = require('../constants');

const { ClientModel, ClientCodeExists } = require('../models/Clients.model');
const { AddressModel } = require('../models/Addresses.model');

router.get('/', async (req, res) => {
    var clients = await ClientModel.find(null);

    if (clients.length === 0) {
        res.status(NOT_FOUND).send('No Clients Found...');
        return;
    }
    res.status(OK).send(clients);
});

// POST Create Client
router.post('/', async (req, res) => {
    const client = req.body;
    
    if (await ClientCodeExists(client.Code)) {
        res.status(BAD_REQUEST).send('Client Code already exists...');
        return;
    }

    try {
        const newAddress = await AddressModel.create({
            FirstName: client.FirstName,
            LastName: client.LastName,
            JobTitle: client.JobTitle,
            Company: client.Company,
            Address1: client.Address1,
            Address2: client.Address2,
            City: client.City,
            State: client.State,
            PostalCode: client.PostalCode,
            Country: client.Country,
            PhoneNumbers: client.PhoneNumbers,
            EmailAddresses: client.EmailAddresses
        });

        try {
            const newClient = await ClientModel.create({
                Code: client.Code,
                Contact: {
                    Address: newAddress
                }
            });

            res.status(CREATED).send(newClient);
        } catch (e) {
            res.status(BAD_REQUEST).send(`Failed to create client: ${e.message}`);
            await AddressModel.remove(newAddress._doc);
        }
    } catch (e) {
        res.status(BAD_REQUEST).send(`Failed to Create Address; ${e.message}`);
    }
});

module.exports = router;