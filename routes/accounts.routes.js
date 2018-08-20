const router = require('express').Router();
const { OK, CREATED, BAD_REQUEST, NOT_FOUND, ERROR } = require('../constants');

const { AccountModel, AccountModelExists } = require('../models/Accounts.model');
const { UserModel } = require('../models/Users.model');

router.get('/', async (req, res) => {
    const accounts = await AccountModel.find(null);

    if (accounts.length === 0) {
        res.status(NOT_FOUND).send('No User Accounts Found...');
        return;
    }

    res.status(OK).send(accounts);
});

router.post('/', async (req, res) => {
    const account = req.body;
    console.log(account);
    if (account.AccountNumber && await AccountModelExists(account.AccountNumber)) {
        res.status(BAD_REQUEST).send('Account Number Already Exists...');
        return;
    }

    try {
        const newAccount = await AccountModel.create({
            AccountLabel: account.AccountLabel,
            PaymentMethod: account.PaymentMethod,
            Address: account.Address,
            AccountNumber: account.AccountNumber,
            CreditLimit: account.CreditLimit,
            Inactive: account.Inactive
        });

        try {
            const updateUser = await UserModel.findOne({ Username: req.user.Username });

            if (!updateUser.Customer) updateUser.Customer = {};
            if (!updateUser.Customer.Accounts) updateUser.Customer.Accounts = [];

            updateUser.Customer.Accounts.push(newAccount._id);

            await UserModel.update({ Username: req.user.Username }, updateUser);

            res.status(CREATED).send(newAccount);
        } catch (e) {
            res.status(ERROR).send(`Failed to Update User Accounts: ${e.message}`);
            await AccountModel.remove(newAccount._doc);
        }
    } catch (e) {
        res.status(ERROR).send(`Failed to Create Account: ${e.message}`);
    }
});

module.exports = router;