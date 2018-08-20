const router = require('express').Router();
const multer = require('multer');
const destination = multer({ dest: 'data/imports' });
const fs = require('fs');
const parser = require('csv-parse');
const moment = require('moment');
const { OK, CREATED, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, ERROR } = require('../constants');

const { SprintModel, CreateSprint, GenerateTrackingID } = require('../models/Sprints.model');
const { UserModel } = require('../models/Users.model');
const { ServiceLevelModel } = require('../models/ServiceLevels.model');
const { AddressModel, CreateAddress, ProcessAddress } = require('../models/Addresses.model');
const { PackageTypeModel } = require('../models/PackageTypes.model');
const { OperatingLocationsModel } = require('../models/OperatingLocations.model');
const { ZoneModel, GetOperatingLocationsForPostalCode } = require('../models/Zones.model');
const { PackageModel, GetPackagePrice } = require('../models/Packages.model');
const { GetPackageTypeById } = require('../models/PackageTypes.model');
const { TrackingLogTypeModel } = require('../models/TrackingLogTypes.model');

router.post('/Import', destination.single('sprintsCsv'), async (req, res) => {
    const data = req.body;

    // Verify Form Posted
    if (!data.pickupAddressId ||
        !data.pickupAfter ||
        !data.pickupBefore ||
        !data.deliveryAfter ||
        !data.deliveryBefore ||
        !data.packageTypeId ||
        !data.accountId) {
        return res.status(BAD_REQUEST).end('Missing Required Parameter');
    }

    // Verify CSV Uploaded
    if (!req.file || !req.file.length) {
        return res.status(BAD_REQUEST).end('No CSV Uploaded');
    }

    // TODO: Verify CSV Has Not Already Been Uploaded (MD5 Hash and Store)

    // Set Delivery Dates
    const pickupAfter = moment(data.pickupAfter);
    const pickupBefore = moment(data.pickupBefore);
    const deliveryAfter = moment(data.deliveryAfter);
    const deliveryBefore = moment(data.deliveryBefore);

    // Get Pickup Address
    const pickupAddress = await AddressModel.findOne({ _id: data.pickupAddressId })
    if (pickupAddress === null) {
        return res.status(ERROR).end('Could Not Get Pickup Address');
    }

    // Get Creating User and Check Import Conversion
    const user = await UserModel.findOne({ Username: req.user.Username });
    if (user === null) {
        return res.status(UNAUTHORIZED).end('Could not get user data');
    } else if (!user.Customer || !user.Customer.ImportConversion) {
        return res.status(BAD_REQUEST).end('Import Conversion Not Available');
    }

    // Parse Import Conversion Property
    const conversionLines = user.Customer.ImportConversion.split(/\r?\n/);
    const conversionFields = {};
    conversionLines.forEach(row => {
        const fields = row.split('=');
        if (fields.length === 2) {
            conversionFields[fields[0].trim()] = fields[1].trim();
        }
    });

    // Get Pickup Locations
    const pickupLocations =
        GetOperatingLocationsForPostalCode(
            pickupAddress.PostalCode,
            req.user.Client
        );
    if (!pickupLocations.length) {
        return res.status(NOT_FOUND).end(`No Operating Locations for Postal Code ${pickupAddress.PostalCode}`);
    }

    // Get WAITING_PICKUP Tracking Log Type
    const waitingPickupLog = await TrackingLogTypeModel.findOne({ Code: 'WAITING_PICKUP' });
    if (waitingPickupLog === null) {
        return res.status(ERROR).end('Could not get Waiting Pickup Tracking Log');
    }

    // Loop Each CSV Line
    const stream = await fs.createReadStream(req.file.path, 'utf8');
    let rows = 0;
    let skipCount = 0;
    let headers = [];
    const sprintsToCreate = [];
    stream.pipe(parser())
        .on('data', async data => {
            rows++
            const rowData = {};
            if (rows === 1) {
                // First Row is Headers, Get and Trim whitespace
                headers = data.map(d => d.trim());
                return;
            } else {
                // Map subsequent rows to associated column header
                for (var i = 0; i < data.length; i++) {
                    if (conversionFields.hasOwnProperty(headers[i])) {
                        rowData[headers[i]] = data[i];
                    }
                    else { return; }
                }
            }

            if (!rowData.DeliveryPostalCode) {
                skipCount++;
                return;
            }

            // Delivery Locations
            const deliveryLocations =
                GetOperatingLocationsForPostalCode(
                    rowData.DeliveryPostalCode,
                    req.user.Client
                );
            if (!deliveryLocations.length) {
                return res.status(NOT_FOUND).end(`No Operating Locations for Postal Code ${rowData.DeliveryPostalCode}`);
            }

            // Find Shared Operating Location
            const sharedLocations = [];
            for (var i = 0; i < deliveryLocations.length; i++) {
                const index = pickupLocations.indexOf(
                    deliveryLocations[i]
                );
                if (index > -1) {
                    sharedLocations.push(deliveryLocations[i]);
                }
            }

            // If Multiple Locations, throw Error
            if (!sharedLocations.length) {
                return res.status(ERROR)
                    .end(`Could not find an operating location for postal codes ${pickupAddress.PostalCode} & ${rowData.DeliveryPostalCode}`);
            }
            if (sharedLocations.length > 1) {
                return res.status(ERROR)
                    .end(`Found Multiple Locations for ${pickupAddress.PostalCode} & ${rowData.DeliveryPostalCode}`);
            }

            const operatingLocation = sharedLocations[0];

            // Create Package Object
            const packageTypeId = rowData.PackageTypeID || data.packageTypeId;

            const packageType = await PackageTypeModel.findOne({ _id: packageTypeId });
            if (packageType === null) {
                return res.status(ERROR).end(`Invalid Package Type at Row ${rows}`);
            }

            const packages = [{
                PackageType: packageType,
                TrackingLogs: [{
                    TrackingLogType: waitingPickupLog,
                    User: user._id
                }],
                Description: rowData.PackageDescription,
                Weight: rowData.PackageWeight,
                Notes: rowData.PackageNotes,
                CustomerPackageNumber: rowData.CustomerPackageNumber,
                Price: GetPackagePrice(packageTypeId, user, operatingLocation)
            }];

            if (rowData.PackageCount > 1) {
                for (let i = 1; i <= rowData.PackageCount.length; i++) {
                    packages[i] = Object.assign({}, packages[0]);
                }
            }

            // Process Delivery Address
            const verifiedDeliveryAddress = ProcessAddress(rowData);

            if (verifiedDeliveryAddress === null) {
                return res.status(BAD_REQUEST).end('Failed to Create Delivery Address');
            }

            sprintsToCreate.push({
                Client: user.Client,
                OperatingLocation: operatingLocation._id,
                Stops: [
                    {
                        Address: pickupAddress,
                        StopAfter: pickupAfter,
                        StopBefore: pickupBefore
                    },
                    {
                        Address: verifiedDeliveryAddress,
                        StopAfter: deliveryAfter,
                        StopBefore: deliveryBefore
                    }
                ],
                Packages: packages,
                Creator: user._id,
                TrackingID: GenerateTrackingID(),
                Account: data.accountId,
                DeclaredValue: rowData.DeclaredValue,
                CustomerOrderNumber: rowData.CustomerOrderNumber,
                Notes: rowData.Notes,
                RouteID: rowData.RouteID
            });
        }).on('end', async () => {
            let newSprintCount = 0;
            let updateSprintCount = 0;
            let newPackageCount = 0;
            let updatePackageCount = 0;
            let totalPrice = 0;
            sprintsToCreate.forEach(async (sprint, index) => {
                if (sprint.CustomerOrderNumber) {
                    const existingSprint =
                        await SprintModel.findOne({
                            CustomerOrderNumber: sprint.CustomerOrderNumber,
                            Creator: sprint.Creator
                        });

                    if (existingSprint !== null) {
                        const updateSprint = Object.assign(sprint, existingSprint);

                        try {
                            await SprintModel.updateOne({ _id: updateSprint._id }, updateSprint);

                            updateSprintCount++;
                            updatePackageCount += updateSprint.Packages.length;
                        } catch (e) {
                            return res.status(ERROR).end(`Failed to update Sprint at Row ${index}: ${e.message}`);
                        }
                    } else {
                        try {
                            const createdSprint = await SprintModel.create(sprint);

                            newSprintCount++;
                            newPackageCount += createdSprint.Packages.length;
                        } catch (e) {
                            return res.status(ERROR).end(`Failed to Create Sprint at Row ${index}: ${e.message}`);
                        }
                    }
                }
            });


        });
});

module.exports = router;