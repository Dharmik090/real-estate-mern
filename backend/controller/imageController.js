const multer = require('multer');
const Image = require('../models/Images');  // Assuming you have an Image model
const path = require('path');

const uploadImage = async (req, res) => {
    console.log("dasdsdasdasdddddddddddddddddddddddd");
//    const { pid } = req.params;  // Get the property ID from the URL

//    try {
//       if (!req.file) {
//          return res.status(400).json({ message: 'No file uploaded' });
//       }

//       // File was uploaded successfully, now save to the database
//       const filePath = req.file.path;  // This is the relative path to the uploaded file
//       const newImage = new Image({
//          filename: req.file.filename,
//          path: filePath,
//          property_id: pid,  // Associate with the property ID
//       });

//       await newImage.save();  // Save the image record to the database

//       res.status(201).json({ message: 'Image uploaded successfully', filePath });
//    } catch (error) {
//       res.status(500).json({ message: 'Error uploading image', error: error.message });
//    }
};

module.exports = { uploadImage };
