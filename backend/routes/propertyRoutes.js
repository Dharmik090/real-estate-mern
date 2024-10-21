const express = require('express');
const router = express.Router();
const controller = require('../controller/propertyController');
const authMiddleware = require('../util/authMiddleware');
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, 
});


router.post('/property/:userid',authMiddleware,upload.array('images',10),controller.addProperty);

router.get('/properties',controller.getAllProperties);

router.get('/user/property/:userid',authMiddleware,controller.getPropertyByUserId);

router.get('/property/:id',controller.getPropertyById);

router.get('/best/property/',controller.getBestProperties);

router.put('/property/:id',authMiddleware,upload.array('images',10),controller.updateProperty);

router.delete('/property/:id',authMiddleware,controller.deletePropertyById);


module.exports = router;


// router.get('/property/:id',controller.getPropertyById);