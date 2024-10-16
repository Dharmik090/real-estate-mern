const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');



const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
});




router.post('/user',upload.single('avatar'),controller.addUser);

router.get('/user/:userid',controller.getUserByUserId);

router.get('/users',controller.getAllUsers);

router.post('/login',controller.userLogIn);   

router.get('/login/:username',controller.getUserByUsername);   // Flutter 

router.put('/user/:userid',controller.updateUser);

router.delete('/user/:userid',controller.deleteUserById);

module.exports = router;