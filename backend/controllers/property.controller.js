// const Redis = require('ioredis')
// const redisClient = new Redis();
const redisClient = require('../config/redis');
const propertyService = require('../services/property.service');
const userService = require('../services/user.service');


const searchProperties = async (req, res, next) => {
    const { q, cities, states, countries, type, status, bhk, maxPrice, minPrice } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    try {

        // Build the base query
        const query = {};

        if (q) {
            console.log(q)
            query.location = { $regex: q, $options: 'i' };
            query.description = { $regex: q, $options: 'i' };
        }
        console.log(query.location, query.description)
        // Handle array parameters (cities and countries)
        if (cities || states || countries) {
            const orConditions = [];

            if (cities) {
                const cityList = Array.isArray(cities) ? cities : cities.split(',');
                orConditions.push({
                    city: { $in: cityList.map(city => new RegExp(city, 'i')) }
                });
            }
            if (states) {
                const stateList = Array.isArray(states) ? states : states.split(',');
                orConditions.push({
                    state: { $in: stateList.map(state => new RegExp(state, 'i')) }
                });
            }

            if (countries) {
                const countryList = Array.isArray(countries) ? countries : countries.split(',');
                orConditions.push({
                    country: { $in: countryList.map(country => new RegExp(country, 'i')) }
                });
            }

            if (orConditions.length > 0) {
                query.$or = query.$or ? query.$or.concat(orConditions) : orConditions;
            }
        }


        if (type) {
            const typeList = Array.isArray(type) ? type : type.split(',');
            query.type = { $in: typeList.map(type => new RegExp(type, 'i')) };
        }

        if (status) {
            const statusList = Array.isArray(status) ? status : status.split(',');
            query.status = { $in: statusList.map(status => new RegExp(status, 'i')) };
        } 

        if (bhk) {
            const bhkList = Array.isArray(bhk) ? bhk : bhk.split(',');
            query.bhk = { $in: bhkList.map(bhk => Number(bhk)) };
        } 

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseInt(minPrice);
            if (maxPrice) query.price.$lte = parseInt(maxPrice);
        }

        const properties = await propertyService.searchProperties({ page, limit, query });
        return res.status(200).json({
            page,
            limit,
            data: properties
        });

    } catch (err) {
        next(err);
    }
};

const addProperty = async (req, res, next) => {
    const userid = req.user.id;
    const { title, description, price, bhk, area, status, location, city, state, country, latitude, longitude } = req.body;

    try {
        const data = { title, description, price, bhk, area, status, location, city, state, country, latitude, longitude, images: req.files, userid }
        await userService.getUserByUserId({ id: userid })
        const property = await propertyService.addProperty(data);


        const cacheKeys = ['properties/recent', 'properties/best'];
        const cached = cacheKeys.map(async (key) => await redisClient.get(key));

        cached.map(async (cache) => {
            if (cache)
                await redisClient.del(cache);
        })

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