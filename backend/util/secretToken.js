const jwt = require('jsonwebtoken');

module.exports.createSecretToken = (data) => {
    return jwt.sign({ userId:data._id } , "any_string_used_as_token", {expiresIn:"3h"});
}