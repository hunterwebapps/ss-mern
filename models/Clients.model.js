const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { AddressModel } = require('./Addresses.model');
const {
    CLIENTS_TABLE, ADDRESSES_TABLE,
} = require('../constants');

const ClientSchema = new Schema({
    Code: {
        type: String,
        required: true,
        unique: true
    },
    Contact: {
        FirstName: String,
        LastName: String,
        JobTitle: String,
        Company: String,
        Address: AddressModel.schema,
        PhoneNumbers: Array,
        EmailAddresses: Array
    },
    TimeCreated: {
        type: Date,
        default: Date.now
    },
    Inactive: {
        type: Boolean,
        default: false
    }
});

const ClientModel = mongoose.model(CLIENTS_TABLE, ClientSchema);

const ClientCodeExists = async Code => await ClientModel.findOne({ Code }) !== null;

const GetClientIDByCode = async Code => {
    const result = await ClientModel.findOne({ Code });
    if (result) {
        return result._id;
    }
    return null;
}

module.exports = {
    ClientModel,
    GetClientIDByCode,
    ClientCodeExists
};