// services/user.service.js
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const ApiError = require('../util/error.util');
const { createSecretToken } = require('../util/token.util');
const propertyService = require('./property.service')


const registerUser = async (data) => {
    const existingUserEmail = await User.findOne({ email: data.email });
    const existingUserUsername = await User.findOne({ username: data.username })

    if (existingUserEmail) {
        throw new ApiError('Email already exist', 400);
    }
    else if (existingUserUsername) {
        throw new ApiError('Username already exist', 400);
    }


    if (data.avatar) {
        data.avatar = data.avatar.buffer;
    }
    else {
        const defaultImagePath = path.join(__dirname, '../uploads/default.jpeg');
        try {
            data.avatar = fs.readFileSync(defaultImagePath);
        } catch (error) {
            throw new ApiError('Could not load default avatar.', 500);
        }
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = new User({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        username: data.username,
        password: hashPassword,
        avatar: data.avatar
    });
    return await user.save();
};

const loginUser = async (data) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
        throw new ApiError('Email does not exist', 404);
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
        throw new ApiError('Incorrect Password', 400);
    }

    const token = createSecretToken(user);
    return token
};

const getUserByUserId = async (data) => {
    const user = await User.findById(data.id).lean();

    if (!user) {
        throw new ApiError('User not found', 404);
    }

    user.avatar = `data:image/jpeg;base64,${user.avatar.toString('base64')}`; // Adjust MIME type if needed

    return user
}

const getAllUsers = async (data) => {
    const users = await User.find();
    return users
}

const updateUser = async (data) => {
    // Check if username     is being changed and if it already exists
    if (data.username) {
        const existingUserUsername = await User.findOne({ username: data.username });
        if (existingUserUsername && existingUserUsername._id.toString() !== data.id) {
            throw new ApiError('Username already exists', 400);
        }
    }

    // Handle avatar
    if (data.avatar) {
        data.avatar = data.avatar.buffer;
    }

    console.log(data);
    const result = await User.updateOne(
        { _id: data.id },
        { $set: data }
    );

    console.log(result);
    if (result.matchedCount === 0) {
        throw new ApiError('User not found', 404);
    }

    return result;
}

const deleteUser = async (data) => {
    const user = await User.findById({ _id: data.id });

    if (!user) {
        throw new ApiError(`User not found`, 404);
    }

    await user.deleteOne()
    await propertyService.deletePropertiesByUserId({ userid: data.id })

}


module.exports = {
    registerUser,
    loginUser,
    getUserByUserId,
    getAllUsers,
    updateUser,
    deleteUser
}