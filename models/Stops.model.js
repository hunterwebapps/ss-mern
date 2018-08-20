const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { STOPS_TABLE, ADDRESSES_TABLE } = require('../constants');

const { AddressModel } = require('./Addresses.model');

const StopSchema = new Schema({
    Address: {
        type: AddressModel.schema,
        required: true
    },
    StopAfter: {
        type: Date,
        required: true
    },
    StopBefore: {
        type: Date,
        required: true
    }
});

const StopModel = mongoose.model(STOPS_TABLE, StopSchema);

module.exports = {
    StopModel
};