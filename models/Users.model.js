const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const {
    // Tables
    USERS_TABLE, AUTHENTICATION_TABLE, CLIENTS_TABLE, OPERATING_LOCATIONS_TABLE, VEHICLES_TABLE,
    ADDRESSES_TABLE, ADDONS_TABLE, PACKAGE_TYPES_TABLE, SPRINTS_TABLE, USER_GROUPS_TABLE,
    // HTTP Status Codes
    OK, CREATED, NOT_FOUND, BAD_REQUEST
} = require('../constants');

const AuthSchema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    EmailAddress: {
        type: String,
        required: true,
        unique: true
    },
    EmailConfirmed: {
        type: Boolean,
        default: false
    },
    PasswordHash: {
        type: String,
        required: true
    },
    PasswordSalt: {
        type: String,
        required: true
    },
    FailedAttempts: {
        type: Number,
        default: 0
    }
});

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
    Contact: {
        Title: String,
        FirstName: String,
        LastName: String,
        Suffix: String,
        Nickname: String,
        Company: String,
        JobTitle: String,
        Address: {
            type: Schema.Types.ObjectId,
            ref: ADDRESSES_TABLE
        },
        PhoneNumbers: Array,
        EmailAddresses: Array,
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
                PerSprint: Number,
                PerHour: Number,
                PerDay: Number
            },
            Vehicle: {
                type: Schema.Types.ObjectId,
                ref: VEHICLES_TABLE,
                unique: true
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
                ref: PACKAGE_TYPES_TABLE
            },
            ImportConversion: String,
            LabelTemplate: String,
            LateDelivery: String,
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

const AuthModel = mongoose.model(AUTHENTICATION_TABLE, AuthSchema);

const UserModel = mongoose.model(USERS_TABLE, UserSchema);

const UsernameExists = async username => await AuthModel.findOne({ Username: username }) !== null;

const EmailExists = async email => await AuthModel.findOne({ EmailAddress: email }) !== null;

const HashPassword = async password => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return {
        salt,
        hash
    };
}

module.exports = {
    AuthModel,
    UserModel,
    UsernameExists,
    EmailExists,
    HashPassword
}