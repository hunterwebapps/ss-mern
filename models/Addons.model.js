'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ADDONS_TABLE, CLIENTS_TABLE } = require('../constants');

const AddonsSchema = new Schema({
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
    Charge: {
        type: Schema.Types.Decimal128,
        required: true
    },
    PerPackage: {
        type: Boolean,
        default: false
    },
    Image: String,
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
AddonsSchema.index({ Client: 1, Code: 1 }, { unique: true });

const AddonsModel = mongoose.model(ADDONS_TABLE, AddonsSchema);

const AddonExists = async (Client, Code) => await AddonsModel.findOne({ Client, Code }) !== null;

module.exports = {
    AddonsModel,
    AddonExists
};