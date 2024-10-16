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
            return res.status(400).json({ message: 'Invalid Password' });
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
        // To get plain JS object form mogoose document
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
        res.send("ERROR : " + err);
    }
}


// Flutter 
const getUserByUsername = async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.find({ username: username });
        res.status(200).send(user);
    }
    catch (err) {
        res.send("ERROR : " + err)
    }
}


module.exports = {
    addUser,
    getUserByUserId,
    getUserByUsername,
    getAllUsers,
    userLogIn
}