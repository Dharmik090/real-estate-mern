const Property = require('../models/Property');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const addProperty = async (req, res) => {
    const userid = req.params.userid;
    const { description, price, bhk, area, status, location, city, state, country, latitude, longtitude } = req.body;
    console.log(userid);
    try {
        const user = await User.findById(userid);

        const property = new Property({ description, price, bhk, area, status, location, city, state, country, latitude, longtitude, userid });

        await property.save();
        console.log("ddddddddd");
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

const getPropertyByUserId = async (req, res) => {
    const userid = req.params.userid;
    
    try {
        const user = await User.findById(userid);
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

const updateProperty = async (req,res) => {
    const id = req.params.id;
    try{
        const property = await Property.findByIdAndUpdate(id, req.body, { new: true });
        if (!property) {
            res.status(404).send(`Property with ID ${id} not found`);
        } else {
            res.send(property);
        }
    }catch(e){
        res.status(500).send('Error :'+e);
    }
}

const deletePropertyById = async (req,res) => {
    const id = req.params.id;
   
    try{
        const property = await Property.deleteOne({_id:id});
        if(!property){
            res.status(404).send(`Property with ID ${id} not found`);
            return;
        }
        
        res.send(`Property with ID ${id} deleted successfully`);
    }catch(err){
        res.send('ERROR : ' + err);
    }
}

module.exports = {
    addProperty,
    getAllProperties,
    getPropertyById,
    getPropertyByUserId
}