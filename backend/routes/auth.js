const express = require('express');
const router = express.Router();
const {body , validationResult} = require('express-validator');
const User = require('../models/Users');
const fetchuser = require('../middleware/fetchuser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/createuser' , [
    body('username' , "Enter a valid name").isLength({min: 3}),
    body('password' , "Enter a valid password").isLength({min: 8})
] , async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success: false , error: errors.array() , err: "Error due to validation in create user"})
    }

    try{
        let user = await User.findOne({username: req.body.username});
        if(user){
            return res.status(500).json({success: false , error: "User with this email already exists"})
        }
        else{
            const salt = await bcrypt.genSalt(10);
            securepassword = await bcrypt.hash(req.body.password , salt);

            user = await User.create({
                username: req.body.username,
                password: securepassword,
            })

            const data = {
                id: user.id,
            }

            const authtoken = jwt.sign(data , process.env.JWT_SECRET);

            res.json({success: true,authtoken: authtoken})
        }
    }
    catch(err){
        console.log("Createuser: " , err.message);
        res.status(500).json({success , error: "Some error occured in create user"})
    }
})


router.post('/login' , [
    body('username' , "Enter a valid name").isLength({min: 3}),
    body('password' , "Enter a valid password").isLength({min: 8}),
    body('username').exists()
] , async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false , errors: errors.array() , err: "Error occured due to validation of login"})
    }

    const {username , password} = req.body;
    try{
        let user = await User.findOne({username: username});
        if(!user){
            return res.status(400).json({success:false , error: "Wrong username credentials"});
        }
        const passwordComapre = await bcrypt.compare(password , user.password);
        if(!passwordComapre){
            return res.status(400).json({success:false , error: "Wrong password credentials"});
        }
        else{
            const data = {
                user: {
                    id: user.id,
                }
            }
            const authtoken = jwt.sign(data , process.env.JWT_SECRET);
            res.json({success: true , authtoken: authtoken});
        } 
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({success:false , error: "Some error occured in login user"});
    }
})


router.post('/fetchuser' , fetchuser , async(req,res)=>{
    try{
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({success:false , error: "Error occured in fetchuser"})
    }
})

module.exports = router