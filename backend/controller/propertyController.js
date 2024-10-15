const Property = require('../models/Property');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const addProperty = async (req, res) => {
    const userid = req.params.id;
    const { description, price, bhk, area, status, location, city, state, country, latitude, longtitude } = req.body;

    try {
        const user = await User.findById(userid);

        const property = new Property({ description, price, bhk, area, status, location, city, state, country, latitude, longtitude, userid });

        await property.save();
        res.status(201).json({ message : 'Property created successfully'});
    }
    catch (err) {
        res.status(500).json({ message : 'Server Error : ' + err});
    }
}


const getAllProperties = async (req, res) => {

    try {
        const properties = await Property.find().populate('userid');

        res.json(properties);
    }
    catch (err) {
        res.status(500).json({ message : 'Server Error : ' + err});
    }
}


const getPropertyById = async (req, res) => {
    const id = req.params.id;

    try {
        const property = await Property.findById(id);
        if(!property){
            return res.status(404).json({ message : 'Property not found' });
        }

        res.json(property);
    }
    catch (err) {
        res.status(500).json({ message : 'Server Error : ' + err});
    }
}

const getPropertyByUsername = async (req, res) => {
    const username = req.params.username;
    
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message : 'User not found' });
        }

        const properties = await Property.find({ userid: user._id });
        res.json(properties);
    }
    catch (err) {
        res.status(500).json({ message : 'Server Error : ' + err});
    }
}


module.exports = {
    addProperty,
    getAllProperties,
    getPropertyById,
    getPropertyByUsername
}