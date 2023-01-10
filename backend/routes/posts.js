const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Post = require('../models/Posts');
const User = require('../models/Users');
const {body,validationResult} = require('express-validator');

router.get('/fetchuserposts' , fetchuser , async (req,res)=>{
    try{
        const posts = await Post.find({user: req.user.id})
        res.json({success: true , posts})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Error occured in fetchuserposts");
    }
})

router.get('/fetchallposts' , async(req,res)=>{
    const query = req.query;
    // console.log(query)
    try{
        allPosts = await Post.find()
        if(query==={}){
            for(let i=0;i<query.tags.length;i++){
                const posts = await allPosts.find({tags: {$elemMatch: {$eq: `${query.tags[i]}`}}}).sort({date: -1})
                allPosts = posts
            }
        }
        // console.log(allPosts);
        allPosts = allPosts.slice(0,20)
        res.status(200).json({posts: allPosts})
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Error occured in fetch all notes")
    }
})

router.post('/createpost' ,fetchuser ,[
    body('content').isLength({min: 5})
], async(req,res)=>{
    try{
        console.log(req.body);
        const {title,content,tags,img} = req.body;
        console.log(img);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error: errors.array()});
        }
        const post = new Post({
            title,tags,content,user: req.user.id
        });
        post.img.Data = img;
        const savedpost = await post.save();
        res.json({success:true,savedpost});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some error occured");
    }

})

router.get("/fetchcommunityposts/" , async(req,res)=>{
    const query = req.query;
    console.log(query)
    try{
        const user = await User.findOne({username: query.community})
        const posts = await Post.find({user: user._id})
        res.json({success: true, posts: posts})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})

router.get("/fetchpost", async(req,res)=>{
    try{
        const currpost = await Post.findById(req.header("postId"));
        if(currpost){
            const user = await User.findById(currpost.user);
            console.log(user);
            const post = {
                title: currpost.title,
                tags: currpost.tags,
                content: currpost.content,
                date: currpost.date,
                username: user.username,
                comments: currpost.comments,
            }
            res.json({success:true,post:post});
        }
        else{
            res.status(500).json({success:false,error: "Error in currpost"});
        }
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({success:false,err: "Catched in error"})
    }
})

module.exports = router