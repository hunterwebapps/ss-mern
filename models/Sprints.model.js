const mongoose = require('mongoose');
const uuid = require('uuid/v4');
const Schema = mongoose.Schema;

const { SPRINTS_TABLE, CLIENTS_TABLE, OPERATING_LOCATIONS_TABLE, STOPS_TABLE, USERS_TABLE, ACCOUNTS_TABLE, PROMOTIONS_TABLE } = require('../constants');
const { StopModel } = require('./Stops.model');
const { PackageModel } = require('./Packages.model');

const SprintSchema = new Schema({
    Client: {
        type: Schema.Types.ObjectId,
        ref: CLIENTS_TABLE,
        required: true
    },
    OperatingLocation: {
        type: Schema.Types.ObjectId,
        ref: OPERATING_LOCATIONS_TABLE,
        required: true
    },
    Stops: {
        type: [StopModel.schema],
        required: true
    },
    Packages: [PackageModel.schema],
    Creator: {
        type: Schema.Types.ObjectId,
        ref: USERS_TABLE,
        required: true
    },
    TrackingID: {
        type: String,
        required: true,
        unique: true
    },
    TimeCreated: {
        type: Date,
        default: Date.now
    },
    Account: {
        type: Schema.Types.ObjectId,
        ref: ACCOUNTS_TABLE,
        required: true
    },
    Promotion: {
        type: Schema.Types.ObjectId,
        ref: PROMOTIONS_TABLE
    },
    DeclaredValue: Number,
    TipAmount: Number,
    CustomerOrderNumber: String,
    Notes: String,
    RouteID: String
});

const SprintModel = mongoose.model(SPRINTS_TABLE, SprintSchema);

const ParseCSV = async (pickupAddressId, pickupDate, serviceLevelId, packageTypeId, chargeAccountId, csv) => {

}

const CreateSprint = async sprintData => {

}

const GenerateTrackingID = async () => {
    do {
        const trackingId = uuid();

        const sprint = await SprintModel.findOne({ TrackingID: trackingId });
    } while (sprint !== null);

    return trackingId;
}

module.exports = {
    SprintModel,
    CreateSprint,
    GenerateTrackingID
};