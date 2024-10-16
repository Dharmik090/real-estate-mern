const express = require('express');
const router = express.Router();
const controller = require('../controller/imageController');
const multer = require('multer');

const upload = multer({
   storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'uploads/'),
      filename: (req, file, cb) => {
         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
         cb(null, uniqueSuffix + path.extname(file.originalname));
      }
   }),
   fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (mimetype && extname) cb(null, true);
      else cb('Error: Only images are allowed!');
   },
   limits: { fileSize: 10 * 1024 * 1024 }
});

// Updated route
router.post('/images', controller.uploadImage);

module.exports = router;
