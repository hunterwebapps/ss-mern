'use strict';
const express = require('express');
const router = express.Router();
const { join } = require('path');

// GET ControlTower - Catch manager page and Authorize, if not forward to public app
router.get('/ControlTower', (req, res) => {
    res.render('index', { ReactBundle: join(req.baseUrl, '/Bundle.manager.js') });
});

// GET Home Page
router.get('*', (req, res) => {
    res.render('index', { ReactBundle: join(req.baseUrl, '/Bundle.user.js') });
});

module.exports = router;