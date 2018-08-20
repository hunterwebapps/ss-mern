const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
    PACKAGE_TYPES_TABLE
} = require('../constants');

const PackageTypeSchema = new Schema({
    Description: {
        type: String,
        required: true,
        unique: true
    },
    Price: {
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

const PackageTypeModel = mongoose.model(PACKAGE_TYPES_TABLE, PackageTypeSchema);

const PackageTypeDescriptionExists = async Description => await PackageTypeModel.findOne({ Description }) !== null;

const GetPackageTypeById = async _id => await PackageTypeModel.findOne({ _id });

module.exports = {
    PackageTypeModel,
    PackageTypeDescriptionExists,
    GetPackageTypeById
};