const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ADDRESSES_TABLE, ZONES_TABLE } = require('../constants');

const AddressSchema = new Schema({
    Address1: {
        type: String,
        required: true
    },
    Address2: String,
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    PostalCode: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Timezone: String,
    Latitude: String,
    Longitude: String,
    Zone: {
        type: Schema.Types.ObjectId,
        ref: ZONES_TABLE
    },
    ValidationStatus: {
        type: Boolean,
        default: false
    },
    GeocodeError: {
        type: Boolean,
        default: false
    },
    Notes: String
});

const AddressModel = mongoose.model(ADDRESSES_TABLE, AddressSchema);

module.exports = {
    AddressModel
};