const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ZONES_TABLE, OPERATING_LOCATIONS_TABLE } = require('../constants');

const ZoneSchema = new Schema({
    OperatingLocation: {
        type: Schema.Types.ObjectId,
        ref: OPERATING_LOCATIONS_TABLE,
        required: true
    },
    Number: {
        type: Number,
        required: true
    },
    PostalCode: {
        type: String,
        required: true,
        unique: true
    }
});

const ZoneModel = mongoose.model(ZONES_TABLE, ZoneSchema);

module.exports = {
    ZoneModel
};