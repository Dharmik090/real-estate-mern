const Property = require('../models/Property');
const User = require('../models/User');


const addProperty = async (req, res) => {
    const userid = req.params.userid;
    const { title, description, price, bhk, area, status, location, city, state, country, latitude, longitude } = req.body;

    const images = req.files.map(file => file.buffer);
    try {
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const property = new Property({ title, description, price, bhk, area, status, location, city, state, country, latitude, longitude, images, userid });

        await property.save();

        res.status(201).json({ message: 'Property created successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}


const getAllProperties = async (req, res) => {

    try {
        const properties = await Property.find().lean();

        if (!properties) {
            return res.status(404).json({ message: 'Properties not found' });
        }

        const newProperties = properties.map(property => {
            property.images = property.images.map(image => `data:image/jpeg;base64,${image.toString('base64')}`);
            return property;
        });

        res.json(newProperties);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}


const getPropertyById = async (req, res) => {
    const id = req.params.id;

    try {
        const property = await Property.findById(id).lean();
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        property.images = property.images.map(image => `data:image/jpeg;base64,${image.toString('base64')}`);

        res.json(property);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}

const getPropertyByUserId = async (req, res) => {
    const userid = req.params.userid;

    try {
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const properties = await Property.find({ userid: user._id });

        const newProperties = properties.map(property => {
            property.images = property.images.map(image =>
                `data:image/jpeg;base64,${image.toString('base64')}`
            );
            return property;
        });

        res.json(newProperties);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}


const getBestProperties = async (req, res) => {
    try {
        const properties = await Property.find({ price: { $lt: 100000000 } }).limit(2).lean();
        if (!properties) {
            return res.status(404).json({ message: 'Properties not found' });
        }

        const newProperties = properties.map(property => {
            property.images = property.images.map(image =>
                `data:image/jpeg;base64,${image.toString('base64')}`
            );
            return property;
        });

        res.json(newProperties);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}


const getRecentProperties = async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: 1 }).limit(3).lean();
        if (!properties) {
            return res.status(404).json({ message: 'Properties not found' });
        }

        const newProperties = properties.map(property => {
            property.images = property.images.map(image =>
                `data:image/jpeg;base64,${image.toString('base64')}`
            );
            return property;
        });

        res.json(newProperties);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}



const updateProperty = async (req, res) => {
    const id = req.params.id;

    const images = req.files.map(file => file.buffer);
    try {
        const property = await Property.updateOne({ _id: id }, { $set: { ...req.body, images } });

        if (!property) {
            return res.status(404).json('Property not found');
        }

        res.json({ message: 'Property updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}

const deletePropertyById = async (req, res) => {
    const id = req.params.id;

    try {
        const property = await Property.deleteOne({ _id: id });
        if (!property) {
            return res.status(404).json('Property not found');
        }

        res.json({ message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}

module.exports = {
    addProperty,
    getAllProperties,
    getPropertyById,
    getPropertyByUserId,
    getBestProperties,
    getRecentProperties,
    updateProperty,
    deletePropertyById
}