const axios = require('axios');
const { faker } = require('@faker-js/faker');
const db = require('../config/db')
const User = require('../models/user.model');

async function createUsers() {
    for (let i = 0; i < 50; i++) {
        await User.create({
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email(),
            password: 'hashedPasswordHere',
            username: faker.person.fullName()
        });
    }
}
createUsers()