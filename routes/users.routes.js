'use strict';
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {
    CLIENTS_TABLE,
    OK, CREATED, UNAUTHORIZED, NOT_FOUND, BAD_REQUEST, ERROR
} = require('../constants');

const mongoose = require('mongoose');

const { UserModel, AuthModel, HashPassword, UsernameExists, EmailExists } = require('../models/Users.model');
const { GetClientIDByCode } = require('../models/Clients.model');

// GET All Users
router.get('/', async (req, res) => {
    const users = await UserModel.find(null);
    if (users.length === 0) {
        res.status(NOT_FOUND).send('No Users Found...');
        return;
    }
    res.status(OK).send(users);
});

// GET User by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (id === undefined) {
        res.status(BAD_REQUEST).send(`Missing Parameter [ID]: ${id}`);
    }
    
    try {
        const user = await UserSchema.findById(id);
        if (!user) {
            res.status(NOT_FOUND).send(`User ID Not Found: ${id}`);
            return;
        }
        res.status(OK).send(user);
    } catch (ex) {
        res.status(ERROR).send(ex.message);
    }
});

// POST Create New User
router.post('/', async (req, res) => {
    const user = req.body;
    if (UsernameExists(user.Username)) {
        res.status(BAD_REQUEST).send(`Username already exists: ${user.Username}`);
        return;
    }
    if (EmailExists(user.EmailAddress)) {
        res.status(BAD_REQUEST).send(`Email Address already exists: ${user.EmailAddress}`);
        return;
    }
    await AuthenticationSchema.create(user);
    var created = await UserSchema.create(user);
    res.status(CREATED).send(created);
});

// POST Login
router.post('/Login', async (req, res) => {

});

// POST Register
router.post('/Register', async (req, res) => {
    const register = req.body;

    if (register.Password !== register.ConfirmPassword) {
        res.status(BAD_REQUEST).send('Passwords do not match...');
        return;
    }

    if (await UsernameExists(register.Username)) {
        res.status(BAD_REQUEST).send('Username already exists...');
        return;
    }

    if (await EmailExists(register.EmailAddress)) {
        res.status(BAD_REQUEST).send('Email Address already exist...');
        return;
    }

    const { salt, hash } = await HashPassword(register.Password);

    let auth;
    try {
        auth = await AuthModel.create({
            Username: register.Username,
            EmailAddress: register.EmailAddress,
            PasswordHash: hash,
            PasswordSalt: salt
        });
    } catch (e) {
        res.status(ERROR).send(`Failed to create user: ${e.message}`);
        return;
    }

    // TODO: Get clientId based on domain
    const clientId = await GetClientIDByCode('SPRINT');
    if (!clientId) {
        res.status(ERROR).send('FATAL ERROR: Could Not Retrieve Client ID');
        return;
    }

    try {
        const user = await UserModel.create({
            Username: register.Username,
            Client: clientId,
            Contact: {
                EmailAddresses: [register.EmailAddress]
            },
            Administrator: true,
            Superuser: true,
            FullClientAccess: true
        });
        res.status(CREATED).send(user);
    } catch (e) {
        res.status(ERROR).send(`Failed to create user: ${e.message}`);
        AuthModel.remove(auth._doc);
    }
});

module.exports = router;
