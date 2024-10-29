const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { createSecretToken } = require("../util/secretToken");
const bcryptjs = require("bcryptjs");
const path = require('path');
const fs = require('fs');

const addUser = async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;

    let avatar;
    if (req.file) {
        avatar = req.file.buffer;
    }
    else {
        const defaultImagePath = path.join(__dirname, '../uploads/default.jpeg');
        try {
            avatar = fs.readFileSync(defaultImagePath);
        } catch (error) {
            return res.status(500).json({ message: 'Could not load default avatar.' });
        }
    }

    try {
        const existingUserEmail = await User.findOne({ email });
        const existingUserUsername = await User.findOne({ username });

        if (existingUserEmail) {
            return res.status(400).json({ message: 'Email already exist' });
        }
        else if (existingUserUsername) {
            return res.status(400).json({ message: 'Username already exist' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({ firstname, lastname, email, username, password: hashPassword, avatar });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}


const userLogIn = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email does not exist' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }

        const token = createSecretToken(user);
        res.json({ token, userId: user._id });
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}


const getUserByUserId = async (req, res) => {
    const userid = req.params.userid;

    try {
        // To get plain JS object from mogoose document
        const user = await User.findById(userid).lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        user.avatar = `data:image/jpeg;base64,${user.avatar.toString('base64')}`; // Adjust MIME type if needed

        delete user.password;
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err })
    }
}


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        users.map((user) => {
            delete user.password;
        });
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err })
    }
}


const updateUser = async (req, res) => {
    const id = req.params.userid;


    let avatar;
    if (req.file) {
        avatar = req.file.buffer;
    }
    else {
        const defaultImagePath = path.join(__dirname, '../uploads/default.jpeg');
        try {
            avatar = fs.readFileSync(defaultImagePath);
        } catch (error) {
            return res.status(500).json({ message: 'Could not load default avatar.' });
        }
    }

    try {

        const user = await User.updateOne({ _id: id }, { $set: { ...req.body, avatar }});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err })
    }
}

const deleteUserById = async (req, res) => {
    const id = req.params.userid;
    try {
        const user = await User.DeleteOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: `User not found` });
        }
        res.json({ message: `User deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err })
    }

}

module.exports = {
    addUser,
    getUserByUserId,
    getAllUsers,
    userLogIn,
    updateUser,
    deleteUserById
}