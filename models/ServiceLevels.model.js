'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { SERVICE_LEVELS_TABLE } = require('../constants');

const ServiceLevelSchema = new Schema({
    Client: {
        type: Schema.Types.ObjectId,
        required: true
    },
    Code: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    ServiceWindowHours: {
        type: Schema.Types.Decimal128,
        required: true
    },
    SortOrder: {
        type: Number,
        required: true
    },
    InternalUseOnly: {
        type: Boolean,
        default: false
    },
    Inactive: {
        type: Boolean,
        default: false
    }
});
ServiceLevelSchema.index({ Client: 1, Code: 1 }, { unique: true });

const ServiceLevelModel = mongoose.model(SERVICE_LEVELS_TABLE, ServiceLevelSchema);

const ServiceLevelExists = async (Client, Code) => await ServiceLevelModel.findOne({ Client, Code }) !== null;

module.exports = {
    ServiceLevelModel,
    ServiceLevelExists
};