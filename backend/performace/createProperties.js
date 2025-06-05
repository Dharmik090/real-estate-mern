const db = require('../config/db')
const path = require('path');
const fs = require('fs');

const Property = require('../models/property.model'); // adjust path
const User = require('../models/user.model');         // adjust path
const { faker } = require('@faker-js/faker');


async function seedProperties() {
    try {
        const users = await User.find(); // You must already have users
        if (users.length === 0) {
            console.log('Add some users first!');
            return;
        }

        const properties = [];

        for (let i = 0; i < 1000; i++) {
            const user = users[Math.floor(Math.random() * users.length)];

            const images = [];
            for (let j = 0; j < 10; j++) {
                let defaultImagePath = path.join(__dirname, '../uploads/default.jpeg');
                try {
                    defaultImagePath = fs.readFileSync(defaultImagePath);
                } catch (error) {
                    console.log(error)
                }

                images.push(defaultImagePath)
                // OR use your CDN/local image path
            }



            properties.push({
                title: faker.lorem.word(),
                description: faker.lorem.paragraph(),
                price: 2000000,
                bhk: 3,
                area: 2000,
                status: "pending",
                location: faker.location.streetAddress(),
                city: faker.location.city,
                state: faker.location.state(),
                country: faker.location.country(),
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude(),
                userid: user._id,
                images
            });
        }

        await Property.insertMany(properties);
        console.log('Dummy properties created!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedProperties();
