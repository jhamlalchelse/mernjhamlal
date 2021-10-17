const User = require('../modles/userSchema')
const jwt = require('jsonwebtoken')


const authenticate = async (req,res,next) =>{ 
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRETE_KEY)
        console.log(`verify token is ${verifyToken}`);
        const rootUser = await User.findOne({ _id:verifyToken._id});
        console.log(rootUser.name);
        if(!rootUser){throw new Error('User not found')}
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    }catch (e) {
        res.status('401').send('Unathorized: No token provide')
        console.log("JsonWebTokenError: jwt must be provided");
    }
}

module.exports = authenticate;