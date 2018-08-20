const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ADDRESSES_TABLE, ZONES_TABLE } = require('../constants');

const AddressSchema = new Schema({
    FirstName: String,
    LastName: String,
    JobTitle: String,
    Company: String,
    Address1: {
        type: String,
        required: true
    },
    Address2: String,
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    PostalCode: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Timezone: String,
    Latitude: String,
    Longitude: String,
    PhoneNumbers: Array,
    EmailAddresses: Array,
    ValidationStatus: {
        type: Boolean,
        default: false
    },
    GeocodeError: {
        type: Boolean,
        default: false
    },
    Notes: String
});

const AddressModel = mongoose.model(ADDRESSES_TABLE, AddressSchema);

const CoerceArray = object => Array.isArray(object) ? object : [object];

const CreateAddress = async addressData =>
    await AddressModel.create({
        FirstName: addressData.FirstName,
        LastName: addressData.LastName,
        JobTitle: addressData.JobTitle,
        Company: addressData.Company,
        Address1: addressData.Address1,
        Address2: addressData.Address2,
        City: addressData.City,
        State: addressData.State,
        PostalCode: addressData.PostalCode,
        Country: addressData.Country,
        Timezone: addressData.Timezone,
        Latitude: addressData.Latitude,
        Longitude: addressData.Longitude,
        PhoneNumbers: CoerceArray(addressData.PhoneNumbers),
        EmailAddresses: CoerceArray(addressData.EmailAddresses),
        Notes: addressData.Notes
    });

const ProcessAddress = async addressData => {
    const verifiedDeliveryAddress = await GetMatchingAddress(
        addressData.FirstName,
        addressData.LastName,
        addressData.Address1,
        addressData.Address2,
        addressData.City,
        addressData.State,
        addressData.PostalCode
    );

    if (verifiedDeliveryAddress !== null) return verifiedDeliveryAddress

    const similarDeliveryAddress =
        await GetSimilarAddress({
            FirstName: addressData.FirstName,
            Address1: addressData.Address1,
            Address2: addressData.Address2,
            City: addressData.City,
            State: addressData.State,
            PostalCode: addressData.PostalCode,
            PhoneNumbers: addressData.PhoneNumber,
            EmailAddresses: addressData.EmailAddress,
            Notes: addressData.AddressNotes
        });

    if (similarDeliveryAddress !== null) return similarDeliveryAddress;

    try {
        return await CreateAddress({
            Address1: addressData.Address1,
            Address2: addressData.Address2,
            City: addressData.City,
            State: addressData.State,
            PostalCode: addressData.PostalCode,
            Country: addressData.Country || 'US',
            Timezone: addressData.Timezone || -6,
            EmailAddresses: addressData.EmailAddress,
            PhoneNumbers: addressData.PhoneNumber,
            Notes: addressData.AddressNotes
        });
    } catch (e) {
        return null;
    }
    // TODO: Add Timezone Check
}

const GetMatchingAddress = async (FirstName, LastName, Address1, Address2, City, State, PostalCode) =>
    await AddressModel.findOne({
        FirstName,
        LastName,
        Address1,
        Address2,
        City,
        State,
        PostalCode
    });

const GetSimilarAddress = async addressData => {
    const address = await AddressModel.findOne({
        Address1: addressData.Address1,
        City: addressData.City,
        State: addressData.State,
        PostalCode: addressData.PostalCode
    });

    if (address === null) return null;

    return {
        FirstName: addressData.FirstName,
        LastName: addressData.LastName,
        JobTitle: addressData.JobTitle,
        Company: addressData.Company,
        Address1: address.Address1,
        Address2: addressData.Address2,
        City: address.City,
        State: address.State,
        PostalCode: address.PostalCode,
        Country: address.Country,
        Timezone: address.Timezone,
        Latitude: address.Latitude,
        Longitude: address.Longitude,
        PhoneNumbers: CoerceArray(addressData.PhoneNumbers),
        EmailAddresses: CoerceArray(addressData.EmailAddresses),
        ValidationStatus: address.ValidationStatus,
        GeocodeError: address.GeocodeError,
        Notes: addressData.Notes
    };
}


module.exports = {
    AddressModel,
    ProcessAddress,
    CreateAddress
};