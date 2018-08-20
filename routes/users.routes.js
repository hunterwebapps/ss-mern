'use strict';
const router = require('express').Router();
const { OK, CREATED, UNAUTHORIZED, NOT_FOUND, BAD_REQUEST, ERROR } = require('../constants');

const { UserModel, CreateUser } = require('../models/Users.model');
const { AuthModel, CreateAuthentication, UserTypes, Authenticate, UsernameExists, EmailExists, HashPassword, GenerateToken, DecodeToken } = require('../models/Authentication.model');
const { AddressModel } = require('../models/Addresses.model');
const { GetClientIDByCode } = require('../models/Clients.model');

// GET All Users
router.get('/', async (req, res) => {
    const users = await UserModel.find(null);

    if (users.length === 0) {
        return res.status(NOT_FOUND).send('No Users Found...');
    }
    return res.status(OK).json(users);
});

router.get('/Me', async (req, res) => {
    try {
        if (!req.user) return res.status(OK).send();

        const user = await UserModel.findOne({ Username: req.user.Username });

        return res.status(OK).json(user);
    } catch (e) {
        res.status(BAD_REQUEST).send('Could Not Find User: ' + e.message);
    }
});

// GET User by ID
router.get('/:id(\\d+)', async (req, res) => {
    const id = req.params.id;
    if (id === undefined) {
        return res.status(BAD_REQUEST).end(`Missing Parameter [ID]: ${id}`);
    }

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(NOT_FOUND).end(`User ID Not Found: ${id}`);
        }
        return res.status(OK).json(user);
    } catch (ex) {
        res.status(ERROR).end(ex.message);
    }
});

// POST Create New User
router.post('/', async (req, res) => {
    const user = req.body;

    if (await UsernameExists(user.Username)) {
        return res.status(BAD_REQUEST).end(`Username already exists: ${user.Username}`);
    }

    if (await EmailExists(user.EmailAddress)) {
        return res.status(BAD_REQUEST).end(`Email Address already exists: ${user.EmailAddress}`);
    }

    try {
        const auth = await CreateAuthentication(user);

        try {
            const address = await AddressModel.create(user.Contact.Address);

            user.Contact.Address = address;
            try {
                const newUser = await CreateUser(user, req.user.Client);

                return res.status(CREATED).json(newUser);
            } catch (e) {
                res.status(ERROR).end(`Failed to Create User: ${e.message}`);
                await AddressModel.remove(address._doc);
                await AuthModel.remove(auth._doc);
            }
        } catch (e) {
            res.status(ERROR).end(`Failed to Create User Address: ${e.message}`);
            await AuthModel.remove(auth._doc);
        }
    } catch (e) {
        return res.status(ERROR).end(`Failed to Create User Authentication: ${e.message}`);
    }
});

// PUT Update User
router.put('/', async (req, res) => {
    const user = req.body;

    try {
        console.log(
            await AddressModel.update({ _id: user._id }, user)
        );

        return res.status(OK).end();
    } catch (e) {
        return res.status(ERROR).end(`Failed to Update User: ${e.message}`);
    }
});

// POST Login
router.post('/Login', async (req, res) => {
    const login = req.body;

    const user = await Authenticate(login.Username, login.Password, login.RememberMe);
    if (user) {
        const expiresSeconds = login.RememberMe ?
            7 * 24 * 60 * 60
            :
            24 * 60 * 60;
        const authToken = await GenerateToken(user.Username, user.Client, expiresSeconds);
        res.cookie('authToken', authToken, { maxAge: expiresSeconds * 1000 }).status(OK).send(user);
        return true;
    }
    res.status(BAD_REQUEST).send('Invalid Username/Password');
});

router.get('/Logout', async (req, res) => {
    res.cookie('authToken', null, { maxAge: -1 }).status(OK).send(null);
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



    try {
        const auth = await CreateAuthentication(register);

        // TODO: Get clientId based on domain
        const clientId = await GetClientIDByCode('SPRINT');
        if (!clientId) {
            res.status(ERROR).send('FATAL ERROR: Could Not Retrieve Client ID');
            return;
        }

        try {
            const user = await CreateUser(register, clientId);

            const authToken = await GenerateToken(user.Username, user.Client, 24 * 60 * 60);

            res.cookie('authToken', authToken, { maxAge: 24 * 60 * 60 * 1000 }).status(CREATED).send(user);
        } catch (e) {
            res.status(ERROR).send(`Failed to create user: ${e.message}`);
            await AuthModel.remove(auth._doc);
        }
    } catch (e) {
        res.status(ERROR).send(`Failed to create user: ${e.message}`);
    }
});

module.exports = router;
