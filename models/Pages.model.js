'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { PAGES_TABLE } = require('../constants');

const PageSchema = new Schema({
    Code: {
        type: String,
        required: true,
        unique: true
    },
    Description: {
        type: String,
        required: true,
        unique: true
    },
    Link: {
        type: String,
        required: true,
        unique: true
    },
    Creator: {
        type: Schema.Types.ObjectId,
        required: true
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

const PageModel = mongoose.model(PAGES_TABLE, PageSchema);

const PageCodeExists = async Code => await PageModel.findOne({ Code }) !== null

module.exports = {
    PageModel,
    PageCodeExists
}