const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const fetchuser = (req,res,next)=>{
    // get user from jwt token and add id to req
    const token = req.header('authtoken');
    if(!token){
        res.status(401).send({success: false , error: "Please authenticate using valid jwt token"});
    }

    try{
        const data = jwt.verify(token , JWT_SECRET)
        req.user = data;
        next();
    }
    catch(err){
        res.status(401).send({success: false,error: "Json web token recived does not match any user"})
    }
}

module.exports = fetchuser