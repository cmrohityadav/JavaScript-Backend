const Post = require('../models/post');
const logger=require('../utils/logger');
const { validateCreatePost } = require('../utils/validate');

const createPost=async(req,res)=>{
    try {
        const {error}=validateCreatePost(req.body);
        if(error){
            logger.warn('Validation error',error.details[0].message);
            return res.status(400).json({
                success:false,
                message:error.details[0].message,
            })
        }

        const {content,mediaIds}=req.body;
        
        const newlyCreatedPost=new Post({
            user:req.user.userId,
            content,
            mediaIds:mediaIds || [],
        });

        await newlyCreatedPost.save();

        logger.info("Post created successfully",newlyCreatedPost);
        res.status(201).json({
            success:true,
            message:'Post created successfully',
        })
    } catch (error) {
        logger.error("Error while creating post",error);
        res.status(500).json({
            success:false,
            message:'Error creating Post'
        })
    }
}


const getAllPosts=async(req,res)=>{
    try {
        
    } catch (error) {
        logger.error("Error while get All Posts",error);
        res.status(500).json({
            success:false,
            message:'Error while get All Postst'
        })
    }
}

const getPost=async(req,res)=>{
    try {
        
    } catch (error) {
        logger.error("Error while get  Post",error);
        res.status(500).json({
            success:false,
            message:"Error while get Post by id"
        })
    }
}


const deletePost=async(req,res)=>{
    try {
        
    } catch (error) {
        logger.error("Error while delete  Post",error);
        res.status(500).json({
            success:false,
            message:"Error while get delete post"
        })
    }
}

module.exports={createPost};
