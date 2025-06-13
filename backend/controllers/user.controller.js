// const Redis = require('ioredis');
// const redisClient = new Redis();
const redisClient = require('../config/redis');
const userService = require("../services/user.service");


const addUser = async (req, res, next) => {
    const { firstname, lastname, email, username, password } = req.body;

    try {
        const data = { firstname, lastname, email, username, password, avatar: req.file }

        const user = await userService.registerUser(data)
        delete user.password
        res.status(201).json({ message: 'User created successfully', data: user });
    }
    catch (err) {
        next(err)
    }
}

const userLogIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const token = await userService.loginUser({ email, password });
        
        res.cookie('authToken', token, {
            httpOnly: true,    // Prevents JS access
            secure: true,      // Only sent over HTTPS
            // sameSite: 'strict', // Prevents CSRF
            sameSite: 'None', // for render
            maxAge: 3600000,  // 1 hour expiry (in ms)
            // domain: '.onrender.com'
        });
        
        res.json({ token });
    }
    catch (err) {
        next(err)
    }
}

const getUserByUserId = async (req, res, next) => {
    const id = req.user.id;
    const cacheKey = `users:${id}`;
    const cached = await redisClient.get(cacheKey);

    if (cached) {
        return res.status(200).json(JSON.parse(cached));
    }

    try {
        const user = await userService.getUserByUserId({ id });
        delete user.password;

        await redisClient.set(cacheKey, JSON.stringify(user), 'EX', 600);
        return res.status(200).json(user);
    }
    catch (err) {
        next(err)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();

        users.map((user) => {
            delete user.password;
        });

        res.json(users);
    }
    catch (err) {
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    const id = req.user.id;
    const cacheKey = `users:${id}`;
    const cached = await redisClient.get(cacheKey);

    if (cached) {
        await redisClient.del(cacheKey);
    }

    try {
        const data = { id, ...req.body, avatar: req.file }
        await userService.updateUser(data);
        res.status(204).json({ message: 'User updated successfully' });
    } catch (err) {
        next(err)
    }
}

const deleteUserById = async (req, res, next) => {
    const id = req.user.id;

    try {
        const data = { id }
        await userService.deleteUser(data)
        res.status(204).json({ message: `User deleted successfully` });
    } catch (err) {
        next(err)
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