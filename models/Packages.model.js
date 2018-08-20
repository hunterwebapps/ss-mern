const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { PACKAGES_TABLE, SPRINTS_TABLE } = require('../constants');
const { PackageTypeModel } = require('./PackageTypes.model');
const { TrackingLogModel } = require('./TrackingLogs.model');

const PackageSchema = new Schema({
    Sprint: {
        type: Schema.Types.ObjectId,
        ref: SPRINTS_TABLE,
        required: true
    },
    PackageType: {
        type: PackageTypeModel.schema,
        required: true
    },
    TrackingLogs: {
        type: [TrackingLogModel.schema],
        required: true
    },
    Description: String,
    Weight: Number,
    SprintTag: String,
    Price: Number,
    CustomerPackageNumber: String,
    Notes: String,
    Height: Number,
    Width: Number,
    Length: Number
});

const PackageModel = mongoose.model(PACKAGES_TABLE, PackageSchema);

const GetPackagePrice = async () => {

};

module.exports = {
    PackageModel,
    GetPackagePrice
};