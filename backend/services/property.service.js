const Property = require('../models/property.model')
const ApiError = require('../util/error.util');


const searchProperties = async (data) => {
    const results = await Property.find(data.query)
        .skip((data.page - 1) * data.limit)
        .limit(data.limit)
        .lean();

    const newProperties = results.map(property => {
        property.images = property.images.map(img =>
            `data:jpeg;base64,${img.toString('base64')}`
        )

        return property;
    });

    return newProperties;
}

const addProperty = async (data) => {
    const property = new Property({
        ...data,
        images: data.images.map(img => img.buffer)
    });

    return await property.save();
}

const getAllProperties = async (data) => {
    const properties = await Property.find().skip((data.page - 1) * data.limit).limit(data.limit).lean();

    const newProperties = properties.map(property => {
        property.images = property.images.map(img =>
            `data:jpeg;base64,${img.toString('base64')}`
        );
        return property;
    });

    return newProperties;
}

const getPropertyById = async (data) => {
    const property = await Property.findById(data.id).lean();
    if (!property) {
        throw new ApiError('Property not found', 404);
    }

    property.images = property.images.map(img =>
        `data:jpeg;base64,${img.toString('base64')}`
    );

    return property;
}

const getPropertiesByUserId = async (data) => {
    const properties = await Property.find({ userid: data.userid }).lean();

    const responseProperties = properties.map(property => {

        property.images = property.images.map(img => {
            return `data:image/jpeg;base64,${img.toString('base64')}`
        })
        return property;
    });

    return responseProperties
}

const getRecentProperties = async (data) => {
    const properties = await Property.find().sort({ createdAt: 1 }).limit(3).lean();
    if (!properties) {
        throw new ApiError('Properties not found', 404);
    }

    const newProperties = properties.map(property => {
        property.images = property.images.map(img =>
            `data:jpeg;base64,${img.toString('base64')}`
        )

        return property;
    });

    return newProperties;
}

const getBestProperties = async (data) => {
    const properties = await Property.find({ price: { $lt: 100000000 } }).limit(6).lean();
    if (!properties) {
        throw new ApiError('Properties not found', 404);
    }

    const newProperties = properties.map(property => {
        property.images = property.images.map(img =>
            `data:jpeg;base64,${img.toString('base64')}`
        )

        return property;
    });

    return newProperties;
}

const updateProperty = async (data) => {
    if (data.images.length !== 0) {
        data.images = data.images.map(img => img.buffer);
    }
    else {
        delete data.images
    }

    const property = await Property.updateOne(
        { _id: data.id },
        { $set: data }
    );

    if (property.matchedCount === 0) {
        throw new ApiError('Property not found', 404);
    }
}

const deleteProperty = async (data) => {
    const property = await Property.deleteOne({ _id: data.id });
    if (property.deletedCount === 0) {
        throw new ApiError('Property not found', 404);
    }
}

const deletePropertiesByUserId = async (data) => {
    const property = await Property.deleteMany({ userid: data.userid })
}

module.exports = {
    searchProperties,
    addProperty,
    getAllProperties,
    getPropertyById,
    getPropertiesByUserId,
    getRecentProperties,
    getBestProperties,
    updateProperty,
    deleteProperty,
    deletePropertiesByUserId
}