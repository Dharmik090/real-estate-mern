const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
    // 'Authorization' : 'Bearer <token>'
    // const token = req.header('Authorization').split(' ')[1];
    const token = req.cookies.authToken;

    try{
        if(!token){
            return res.status(401).json({ message : 'Unauthorized access'});
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: verified.id };
        next();
    }
    catch(err){
        return res.status(400).json({ message : 'Invalid token' });
    }
}

module.exports = authMiddleware;