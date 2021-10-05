const {User} = require ('../models/user_model');
const jwt = require('jsonwebtoken')
require ('dotenv').config()

exports.checkToken = async(req,res,next) => {
    try{
        //check if we have a valid token
        const accessToken = req.headers['x-access-token'];
        if(accessToken){
            //verify token
            const {_id,email,exp} = jwt.verify(accessToken, process.env.DB_SECRET);
            //VERIFY WITLL THROW ERROR WITH TRY WILLCATCH IF THE TOKEN IS MALFORMED
            //IN THAT EVENT WE GO TO CATCH(ERR), IF WE MOVE FORWARD THEN THAT MEANS 
            //VERIFY IS OK

            //now that we have _id and email, find the user and store it
            //by convention middlewares store found data in res.locals
            res.locals.userData = await User.findById(_id)

            //If the user doesnt exist then res.locals.userData will be null
            //But we will go next, because purpose of this function is simply to 
            //check if token is well formed, not if user is logged In
            //this function gets called for every req - even those that dont require login
            //login will be checked in checkLoggedIn which will be call only on 
            //requests that need to be for logged in users
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

exports.checkLoggedIn = (req,res,next) => {
    const user = res.locals.userData;
    if(!user) return res.status(401).json({error:"No user found. Please log in"});

    req.user = user;
    next();
    
}