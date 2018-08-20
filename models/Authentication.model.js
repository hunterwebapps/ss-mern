const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { UserModel } = require('./Users.model');

const {
    // Tables
    AUTHENTICATION_TABLE,
    // HTTP Status Codes
    OK, CREATED, NOT_FOUND, BAD_REQUEST
} = require('../constants');

const UserTypes = [
    'User',
    'Administrator',
    'Superuser'
];

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
    },
    UserType: {
        type: String,
        required: true,
        enum: [...UserTypes]
    }
});

const AuthModel = mongoose.model(AUTHENTICATION_TABLE, AuthSchema);

const Authenticate = async (Username, Password, RememberMe) => {
    try {
        const auth = await AuthModel.findOne({ Username });

        const hashedPassword = await HashPassword(Password, auth.PasswordSalt);

        if (hashedPassword.hash === auth.PasswordHash) {
            const user = await UserModel.findOne({ Username: auth.Username });
            return user;
        }
    } catch (e) { }
    return false;
}

const CreateAuthentication = async registerData => {
    const { salt, hash } = await HashPassword(registerData.Password);

    const auth = await AuthModel.create({
        Username: registerData.Username,
        EmailAddress: registerData.EmailAddress,
        PasswordHash: hash,
        PasswordSalt: salt,
        UserType:
            registerData.Administrator ?
                'Administrator'
                :
                registerData.Superuser ?
                    'Superuser'
                    :
                    'User'
    });

    return auth;
}

const UsernameExists = async username => await AuthModel.findOne({ Username: username }) !== null;

const EmailExists = async email => await AuthModel.findOne({ EmailAddress: email }) !== null;

const HashPassword = async (password, salt) => {
    if (salt === undefined) {
        salt = await bcrypt.genSalt(12);
    }
    const hash = await bcrypt.hash(password, salt);
    return {
        salt,
        hash
    };
}

const tokenKey = 'Qc=cMK^xFY4L=^u^FMy+';

const GenerateToken = async (username, client, expirationSeconds) => {
    try {
        const token = await jwt.sign({ username, client },
            tokenKey,
            { expiresIn: expirationSeconds });

        return token;
    } catch (e) {
        return null;
    }
}

const DecodeToken = async token => {
    try {
        return await jwt.verify(token, tokenKey);
    } catch (e) {
        console.log('Decode Token Error', e);
        return null
    }
}

module.exports = {
    AuthModel,
    CreateAuthentication,
    UserTypes,
    UsernameExists,
    EmailExists,
    HashPassword,
    GenerateToken,
    DecodeToken,
    Authenticate
};