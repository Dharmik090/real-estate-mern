const express = require('express');
const router = express.Router();
const controller = require('../controller/propertyController');
const authMiddleware = require('../util/authMiddleware');

router.post('/property/:userid',authMiddleware,controller.addProperty);

router.get('/properties',controller.getAllProperties);

router.get('/property/:userid',controller.getPropertyByUserId);

// Update Delete with authMiddleware

module.exports = router;

// router.get('/property/:id',controller.getPropertyById);