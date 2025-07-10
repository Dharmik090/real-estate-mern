const express = require('express');
const multer = require('multer');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const accessMiddleware = require('../middlewares/access.middleware')


const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
});

router.get('/users/owner/:userId', userController.getOwnerDetails);

router.post('/users', upload.single('avatar'), userController.addUser);

router.put('/users', authMiddleware, upload.single('avatar'), userController.updateUser);

// router.get('/users/:userId', authMiddleware, accessMiddleware.checkUserAccess, userController.getUserByUserId);
router.get('/users', authMiddleware, userController.getUserByUserId);

router.delete('/users/:userId', authMiddleware, accessMiddleware.checkUserAccess, userController.deleteUserById);

router.get('/users', userController.getAllUsers);

router.post('/login', userController.userLogIn);

// Apply to /validate route
router.get('/validate', authMiddleware, (req, res) => {
    res.json({ valid: true, user: req.user }); // Optional: Return user data
});

router.post('/logout', authMiddleware, (req, res) => {
    // res.clearCookie('authToken'); // Remove the HTTP-only cookie

    res.clearCookie("token", {
        httpOnly: true,
        secure: true,       // Only if using HTTPS
        sameSite: "None",   // If using cross-origin cookies
        path: "/",
    });

    res.json({ success: true });
});

module.exports = router;