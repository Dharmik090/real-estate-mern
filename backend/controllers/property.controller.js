const Redis = require('ioredis')
const redisClient = new Redis();
const propertyService = require('../services/property.service');
const userService = require('../services/user.service');


const searchProperties = async (req, res, next) => {
    const query = req.query.q;

    try {
        const properties = await propertyService.searchProperties({ query });
        return res.status(200).json({ data: properties });
    }
    catch (err) {
        next(err);
    }
}

const addProperty = async (req, res, next) => {
    const userid = req.user.id;
    const { title, description, price, bhk, area, status, location, city, state, country, latitude, longitude } = req.body;


    try {
        const data = { title, description, price, bhk, area, status, location, city, state, country, latitude, longitude, images: req.files, userid }
        await userService.getUserByUserId({ id: userid })
        const property = await propertyService.addProperty(data);

        res.status(201).json({ message: 'Property created successfully' });
    }
    catch (err) {
        next(err)
    }
}

const getAllProperties = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const properties = await propertyService.getAllProperties({ page, limit })
        res.status(200).json({ page, limit, data: properties });
    }
    catch (err) {
        next(err)
    }
}

const getPropertyById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const property = await propertyService.getPropertyById({ id });
        res.status(200).json(property);
    }
    catch (err) {
        next(err)
    }
}

const getPropertyByUserId = async (req, res, next) => {
    const userid = req.user.id;

    try {
        await userService.getUserByUserId({ id: userid })

        const properties = await propertyService.getPropertiesByUserId({ userid })
        res.status(200).json(properties);
    }
    catch (err) {
        next(err)
    }
}

const getRecentProperties = async (req, res, next) => {
    const cacheKey = `properties/recent`;
    const cached = await redisClient.get(cacheKey);

    if (cached) {
        return res.status(200).json(JSON.parse(cached));
    }

    try {
        const properties = await propertyService.getRecentProperties();
        await redisClient.set(cacheKey, JSON.stringify(properties), 'EX', 600);
        res.json(properties);
    }
    catch (err) {
        next(err)
    }
}

const getBestProperties = async (req, res, next) => {
    const cacheKey = `properties/best`;
    const cached = await redisClient.get(cacheKey);

    if (cached) {
        return res.status(200).json(JSON.parse(cached));
    }

    try {
        const properties = await propertyService.getBestProperties()
        await redisClient.set(cacheKey, JSON.stringify(properties), 'EX', 600);
        res.json(properties);
    }
    catch (err) {
        next(err)
    }
}

const updateProperty = async (req, res, next) => {
    const id = req.params.id;

    try {
        await propertyService.updateProperty({ id, ...req.body, images: req.files })
        res.status(200).json({ message: 'Property updated successfully' });
    } catch (err) {
        next(err)
    }
}

const deletePropertyById = async (req, res, next) => {
    const id = req.params.id;

    try {
        await propertyService.deleteProperty({ id })
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
        next(err)
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
    deletePropertyById,
    searchProperties
}