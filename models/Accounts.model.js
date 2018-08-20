const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ACCOUNTS_TABLE, ADDRESSES_TABLE } = require('../constants');

const PaymentMethods = [
    'Authorize.Net',
    'BankAccount',
    'ChargeAccount',
    'CreditCard',
    'Paypal'
];

const AccountSchema = new Schema({
    AccountLabel: {
        type: String,
        required: true
    },
    PaymentMethod: {
        type: String,
        enum: PaymentMethods
    },
    Address: {
        type: Schema.Types.ObjectId,
        ref: ADDRESSES_TABLE
    },
    AccountNumber: Number,
    CreditLimit: Schema.Types.Decimal128,
    Inactive: {
        type: Boolean,
        default: false
    }
});

const AccountModel = mongoose.model(ACCOUNTS_TABLE, AccountSchema);

const AccountModelExists = async AccountNumber => await AccountModel.findOne({ AccountNumber }) !== null;

module.exports = {
    AccountModel,
    AccountModelExists
};