const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {
    CLIENTS_TABLE, ADDRESSES_TABLE,
} = require('../constants');

const { AddressModel } = require('./Addresses.model');

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
        Address: [AddressModel.schema],
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

const CodeExists = async code => await ClientModel.findOne({ Code: code }) !== null;

const GetClientIDByCode = async code => {
    const result = await ClientModel.findOne({ Code: code });
    if (result) {
        return result._id;
    }
    return null;
}

module.exports = {
    ClientModel,
    GetClientIDByCode,
    CodeExists
};