const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ZONES_TABLE, OPERATING_LOCATIONS_TABLE, CLIENTS_TABLE } = require('../constants');

const ZoneSchema = new Schema({
    OperatingLocation: {
        type: Schema.Types.ObjectId,
        ref: OPERATING_LOCATIONS_TABLE,
        required: true
    },
    Client: {
        type: Schema.Types.ObjectId,
        ref: CLIENTS_TABLE,
        required: true
    },
    ZoneNumber: {
        type: Number,
        required: true
    },
    PostalCode: {
        type: String,
        required: true
    }
});
ZoneSchema.index({ OperatingLocation: 1, ZoneNumber: 1, PostalCode: 1 }, { unique: true });

const ZoneModel = mongoose.model(ZONES_TABLE, ZoneSchema);

const GetOperatingLocationsForPostalCode = async (postalCode, client) => {
    const locations = [];
    const pickupZones = OperatingLocationsModel.find({
        PostalCode: postalCode,
        Client: client
    });
    if (pickupZones === null) return locations;
    pickupZones.forEach(zone => locations.push(zone.OperatingLocation));
    return locations;
}

module.exports = {
    ZoneModel,
    GetOperatingLocationsForPostalCode
};