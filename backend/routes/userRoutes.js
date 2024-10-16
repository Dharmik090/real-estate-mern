const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');


router.post('/user',controller.addUser);

router.get('/user/:userid',controller.getUserByUserId);

router.get('/users',controller.getAllUsers);

router.post('/login',controller.userLogIn);   

router.get('/login/:username',controller.getUserByUsername);   // Flutter 


module.exports = router;