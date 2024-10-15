const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
    // 'Authorization' : 'Bearer <token>'
    const token = req.header('Authorization').split(' ')[1]; 

    try{
        if(!token){
            return res.status(401).json({ message : 'Unauthorized access'});
        }

        const verified = jwt.verify(token, 'any_string_used_as_token');
        req.user = verified;
        next();
    }
    catch(err){
        return res.status(400).json({ message : 'Invalid token' });
    }
}

module.exports = authMiddleware;