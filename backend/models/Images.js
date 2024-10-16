const mongoose = require('mongoose');
const Property = require('./Property');  // Ensure this model exists and is imported

const imageSchema = new mongoose.Schema({
   filename: {
      type: String,
      required: true
   },
   path: {
      type: String,
      required: true
   },
   property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',  // Ensure this reference matches your Property model
      required: true
   }
});

module.exports = mongoose.model('Image', imageSchema);
