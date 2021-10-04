const {User} = require ('../models/user_model');
const jwt = require('jsonwebtoken')
require ('dotenv').config()

exports.checkToken = async(req,res,next) => {
    try{
        //check if we have a valid token
        const accessToken = req.headers['x-access-token'];
        if(accessToken){
            //verify token
            const {id,email,expiration} = jwt.verify(accessToken, process.env.DB_SECRET);
            console.log(id);
            console.log(email);
            console.log(expiration);
            next()
        } else {
            //no token
            console.log('no token')
            next();
        }
    }catch(err){
        //jwt verify will throw error if token is invalid (exists and invalid)
        return res.status(401).json({error:"Bad Token", errors:err})
    }
}