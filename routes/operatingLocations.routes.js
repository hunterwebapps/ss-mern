'use strict';
const router = require('express').Router();
const { isEmpty } = require('lodash');
const { OK, CREATED, UNAUTHORIZED, NOT_FOUND, BAD_REQUEST, ERROR } = require('../constants');

const { OperatingLocationsModel, OperatingLocationExists } = require('../models/OperatingLocations.model');
const { AddressModel } = require('../models/Addresses.model');
const { ZoneModel } = require('../models/Zones.model');

router.get('/', async (req, res) => {
    var locations = await OperatingLocationsModel.find(null);

    if (locations.length === 0) {
        res.status(NOT_FOUND).send('No Operating Locations Found...');
        return;
    }

    res.status(OK).send(locations);
});

router.post('/', async (req, res) => {
    const location = req.body;

    if (await OperatingLocationExists(location)) {
        res.status(BAD_REQUEST).send('Operating Location Already Exists...');
        return;
    }

    try {
        const newAddress = await AddressModel.create({
            Address1: location.Address1,
            Address2: location.Address2,
            City: location.City,
            State: location.State,
            PostalCode: location.PostalCode,
            Country: location.Country,
            Timezone: location.Timezone,
            Latitude: location.Latitude,
            Longitude: location.Longitude
        });

        try {
            const newLocation = await OperatingLocationsModel.create({
                Client: req.user.client,
                Code: location.Code,
                Contact: {
                    FirstName: location.FirstName,
                    LastName: location.LastName,
                    Company: location.Company,
                    Address: newAddress,
                    PhoneNumbers: location.PhoneNumbers,
                    EmailAddresses: location.EmailAddresses,
                    Website: location.Website
                },
                MinutesPerMile: location.MinutesPerMile,
                MinutesPerStop: location.MinutesPerStop,
                Hours: location.Hours.filter(h => !isEmpty(h)),
                Holidays: location.Holidays.filter(h => !isEmpty(h)),
                Notifications: location.Notifications.filter(n => !isEmpty(n)),
                Pricing: location.Pricing.filter(p => !isEmpty(p)),
                PackageType: location.PackageType,
                LoadListSort: location.LoadListSort,
                Addons: location.Addons.filter(a => !isEmpty(a)).map(a => a.Addon)
            });

            try {
                const createdPostalCodes = [];
                const routes = location.Zones
                    .filter(zone => !isEmpty(zone))
                    .map(zone => {
                        if (createdPostalCodes.includes(zone.PostalCode)) return;
                        createdPostalCodes.push(zone.PostalCode);
                        return {
                            OperatingLocation: newLocation._id,
                            Client: req.user.Client,
                            ZoneNumber: zone.ZoneNumber,
                            PostalCode: zone.PostalCode
                        };
                    });

                const newRoutes = await ZoneModel.insertMany(routes);
            } catch (e) {
                res.status(ERROR).send(`Failed to Create Zones: ${e.message}`);
                await OperatingLocationsModel.remove({ _id: newLocation._id });
                await AddressModel.remove({ _id: newAddress._id });
                return;
            }
            res.status(CREATED).send(newLocation);
        } catch (e) {
            res.status(ERROR).send(`Failed to Create Operating Location: ${e.message}`);
            await AddressModel.remove({ _id: newAddress._id });
        }
    } catch (e) {
        res.status(ERROR).send(`Failed to Create Address: ${e.message}`);
    }
});

module.exports = router;