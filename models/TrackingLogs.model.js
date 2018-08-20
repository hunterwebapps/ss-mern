const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { TRACKING_LOGS_TABLE, USERS_TABLE } = require('../constants');
const { TrackingLogTypeModel } = require('./TrackingLogTypes.model');

const TrackingLogSchema = new Schema({
    TrackingLogType: {
        type: TrackingLogTypeModel.schema,
        required: true
    },
    TimeCreated: {
        type: Date,
        default: Date.now
    },
    Latitude: String,
    Longitude: String,
    Speed: String,
    User: {
        type: Schema.Types.ObjectId,
        ref: USERS_TABLE
    },
    DeviceID: String,
    Notes: String
});

const TrackingLogModel = mongoose.model(TRACKING_LOGS_TABLE, TrackingLogSchema);

module.exports = {
    TrackingLogModel
};