const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
    // Tables
    USERS_TABLE, AUTHENTICATION_TABLE, CLIENTS_TABLE, OPERATING_LOCATIONS_TABLE, VEHICLES_TABLE,
    ADDRESSES_TABLE, ADDONS_TABLE, PACKAGE_TYPES_TABLE, SPRINTS_TABLE, USER_GROUPS_TABLE,
    // HTTP Status Codes
    OK, CREATED, NOT_FOUND, BAD_REQUEST
} = require('../constants');

const UserSchema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Client: {
        type: Schema.Types.ObjectId,
        ref: CLIENTS_TABLE,
        required: true
    },
    EmailAddress: {
        type: String,
        required: true
    },
    Contact: {
        Nickname: String,
        Address: {
            type: Schema.Types.ObjectId,
            ref: ADDRESSES_TABLE
        },
        Website: String,
        BirthDate: Date,
        Avatar: String
    },
    Groups: [{
        type: Schema.Types.ObjectId,
        ref: USER_GROUPS_TABLE
    }],
    Administrator: {
        type: Boolean,
        default: false
    },
    Superuser: {
        type: Boolean,
        default: false
    },
    FullClientAccess: {
        type: Boolean,
        default: false
    },
    Driver: {
        type: {
            OperatingLocation: {
                type: Schema.Types.ObjectId,
                ref: OPERATING_LOCATIONS_TABLE,
                required: true
            },
            StartDate: {
                type: Date,
                default: Date.now
            },
            EndDate: {
                type: Date
            },
            MaxWeight: {
                type: Number
            },
            DriverLicense: {
                Number: Number,
                State: String,
                Expiration: Date
            },
            PayRate: {
                PerSprint: Schema.Types.Decimal128,
                PerHour: Schema.Types.Decimal128,
                PerDay: Schema.Types.Decimal128
            },
            WeekdayRates: [{
                Weekday: String,
                Percent: Schema.Types.Decimal128,
                PerSprint: Schema.Types.Decimal128,
                PerDay: Schema.Types.Decimal128
            }],
            Vehicle: {
                type: Schema.Types.ObjectId,
                ref: VEHICLES_TABLE
            }
        },
        required: false
    },
    Customer: {
        type: {
            DefaultAddon: {
                type: Schema.Types.ObjectId,
                ref: ADDONS_TABLE
            },
            DefaultPackageType: {
                type: Schema.Types.ObjectId,
                ref: PACKAGE_TYPES_TABLE,
                required: true
            },
            ImportConversion: String,
            LabelTemplate: String,
            LateDelivery: String,
            UserAddresses: [{
                type: Schema.Types.ObjectId,
                ref: ADDRESSES_TABLE
            }],
            Sprints: [{
                type: Schema.Types.ObjectId,
                ref: SPRINTS_TABLE
            }]
        },
        required: false
    },
    TimeCreated: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model(USERS_TABLE, UserSchema);

const CreateUser = async (userData, client) => {
    const user = await UserModel.create({
        Username: userData.Username,
        Client: client,
        EmailAddress: userData.EmailAddress,
        Contact: userData.Contact,
        Administrator: userData.Administrator,
        Superuser: userData.Superuser,
        FullClientAccess: userData.FullClientAccess,
        Driver: userData.Driver,
        Customer: userData.Customer
    });

    return user;
}

module.exports = {
    UserModel,
    CreateUser
};