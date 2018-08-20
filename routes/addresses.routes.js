const router = require('express').Router();
const { OK, CREATED, NOT_FOUND, BAD_REQUEST, ERROR } = require('../constants');

const { UserModel } = require('../models/Users.model');
const { AddressModel } = require('../models/Addresses.model');

router.get('/', async (req, res) => {
    const addresses = await AddressModel.find(null);

    if (addresses.length === 0) {
        res.status(NOT_FOUND).send('No Addresses Found...');
        return;
    }

    res.status(OK).send(addresses);
});

router.post('/', async (req, res) => {

});

router.post('/UserAddresses', async (req, res) => {
    const address = req.body;

    try {
        const newAddress = await AddressModel.create({
            FirstName: address.FirstName,
            LastName: address.LastName,
            JobTitle: address.JobTitle,
            Company: address.Company,
            Address1: address.Address1,
            Address2: address.Address2,
            City: address.City,
            State: address.State,
            PostalCode: address.PostalCode,
            Country: address.Country,
            Timezone: address.Timezone,
            PhoneNumbers: address.PhoneNumbers,
            EmailAddresses: address.EmailAddresses
        });

        try {
            const updateUser = await UserModel.findOne({ Username: req.user.Username });

            if (!updateUser.Customer) updateUser.Customer = {};
            if (!updateUser.Customer.PickupAddresses) updateUser.Customer.UserAddresses = [];

            updateUser.Customer.UserAddresses.push(newAddress._id);

            await UserModel.update({ Username: req.user.Username }, updateUser);
        } catch (e) {
            res.status(ERROR).send(`Failed to Update User Pickup Addresses: ${e.message}`);
            await AddressModel.remove(newAddress._doc);
        }

        res.status(CREATED).send(newAddress);
    } catch (e) {
        res.status(ERROR).send(`Failed to Create Address: ${e.message}`);
    }
})

module.exports = router;