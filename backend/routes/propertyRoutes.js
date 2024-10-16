const express = require('express');
const router = express.Router();
const controller = require('../controller/propertyController');
const controller2 = require('../controller/imageController');
const authMiddleware = require('../util/authMiddleware');

router.post('/property/:id',controller.addProperty);

router.get('/properties',controller.getAllProperties);

router.get('/property/:username',controller.getPropertyByUsername);

router.put('/property/:id',controller.updateProperty);

router.delete('/property/:id',controller.deletePropertyById);

router.post('/images/:id',controller2.uploadimage);

module.exports = router;

// router.get('/property/:id',controller.getPropertyById);