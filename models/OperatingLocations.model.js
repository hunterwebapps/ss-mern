const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { AddressModel } = require('./Addresses.model');
const {
    OPERATING_LOCATIONS_TABLE, ADDRESSES_TABLE, CLIENTS_TABLE, PACKAGE_TYPES_TABLE, ZONES_TABLE, ADDONS_TABLE
} = require('../constants');

const LoadListSorts = [
    SHORTEST_DISTANCE = 0,
    FASTEST_TIME = 1,
    BALANCED_ROUTE = 2
];

const OperatingLocationsSchema = new Schema({
    Client: {
        type: Schema.Types.ObjectId,
        ref: CLIENTS_TABLE,
        required: true
    },
    Code: {
        type: String,
        required: true
    },
    Address: AddressModel.schema,
    MinutesPerMile: Schema.Types.Decimal128,
    MinutesPerStop: Schema.Types.Decimal128,
    Hours: {
        type: [{
            Weekday: {
                type: String,
                required: true
            },
            OpeningHour: {
                type: String,
                required: true
            },
            ClosingHour: {
                type: String,
                required: true
            }
        }]
    },
    Holidays: {
        type: [{
            CalendarDate: {
                type: Date,
                required: true
            },
            Closed: {
                type: Boolean,
                default: false
            },
            OpeningHour: String,
            ClosingHour: String
        }]
    },
    Notifications: Array,
    Pricing: {
        type: [{
            PackageType: {
                type: Schema.Types.ObjectId,
                ref: PACKAGE_TYPES_TABLE,
                required: true
            },
            Price: {
                type: Schema.Types.Decimal128,
                required: true
            }
        }]
    },
    TimeCreated: {
        type: Date,
        default: Date.now
    },
    PackageType: {
        type: Schema.Types.ObjectId,
        ref: PACKAGE_TYPES_TABLE,
        required: true
    },
    LoadListSort: {
        type: Number,
        enum: [...LoadListSorts]
    },
    Addons: [{
        type: Schema.Types.ObjectId,
        ref: ADDONS_TABLE
    }]
});
OperatingLocationsSchema.index({ Code: 1, Client: 1 }, { unique: true });

const OperatingLocationsModel = mongoose.model(OPERATING_LOCATIONS_TABLE, OperatingLocationsSchema);

const OperatingLocationExists = async values => {
    const result = await OperatingLocationsModel.find({
        $or: [
            { Code: values.Code },
            { Contact: { Address: { PostalCode: values.PostalCode } } }
        ]
    });
}

module.exports = {
    OperatingLocationsModel,
    OperatingLocationExists
};