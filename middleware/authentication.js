const { AuthModel, DecodeToken } = require('../models/Authentication.model');
const { PageModel } = require('../models/Pages.model');
const { UNAUTHORIZED } = require('../constants');

const authentication = async (req, res, next) => {
    let isAuthenticated = false;
    
    try {
        if (req.cookies.authToken) {
            const authToken = await DecodeToken(req.cookies.authToken);
            if (authToken) {
                const userAuth = await AuthModel.findOne({ Username: authToken.username });
                userAuth.Client = authToken.client;
                req.user = userAuth
                isAuthenticated = true;
            }
        }
    } catch (e) { }

    //if (!isAuthenticated && !req.originalUrl.includes('/User/Login')) {
    //    res.redirect('/User/Login');
    //    return;
    //}
    
    // TODO: Add Pages Check
    const pages = PageModel.find(null);

    next();
};

module.exports = authentication;