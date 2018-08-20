const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { TRACKING_LOG_TYPES_TABLE, CLIENTS_TABLE } = require('../constants');

const TrackingLogTypeSchema = new Schema({
    Client: {
        type: Schema.Types.ObjectId,
        ref: CLIENTS_TABLE,
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
    SortOrder: {
        type: Number,
        default: 0
    },
    AllowMultiple: {
        type: Boolean,
        default: false
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

const TrackingLogTypeModel = mongoose.model(TRACKING_LOG_TYPES_TABLE, TrackingLogTypeSchema);

const TrackingLogTypeExists = async Code => await TrackingLogTypeModel.findOne({ Code }) !== null;

module.exports = {
    TrackingLogTypeModel,
    TrackingLogTypeExists
};