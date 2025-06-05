const jwt = require('jsonwebtoken');

module.exports.createSecretToken = (data) => {
    return jwt.sign({ id: data._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}