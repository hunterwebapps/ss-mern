'use strict';
const express = require('express');
const router = express.Router();
const { join } = require('path');

// GET Home Page
router.get('*', (req, res) => {
    res.render('index');
});

module.exports = router;