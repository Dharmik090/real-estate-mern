const express = require('express');
const multer = require('multer');
const router = express.Router();

const controller = require('../controllers/property.controller');
const authMiddleware = require('../middlewares/auth.middleware');


const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
});


router.post('/properties', authMiddleware, upload.array('images', 10), controller.addProperty);

router.get('/properties', controller.getAllProperties);

router.get('/properties/recent', controller.getRecentProperties);

router.get('/properties/best', controller.getBestProperties);

router.get('/properties/:id', controller.getPropertyById);

router.get('/users/properties', authMiddleware, controller.getPropertyByUserId);

router.put('/properties/:id', authMiddleware, upload.array('images', 10), controller.updateProperty);

router.delete('/properties/:id', authMiddleware, controller.deletePropertyById);

router.get('/properties/search', authMiddleware, controller.searchProperties);

module.exports = router;

