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
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;
        const startIndex=(page-1) * limit;

        const cacheKey=`posts:${page}:${limit}`;
        const cachedPosts= await req.redisClient.get(cacheKey);

        if(cachedPosts){
            return res.json(JSON.parse(cachedPosts));
        }

        const posts=await Post.find({}).sort({createdAt:-1})
        .skip(startIndex)
        .limit(limit);

        const totalNoOfPosts= await Post.countDocuments();

        const result={
            posts,
            currentPage:page,
            totalPages:Math.ceil(totalNoOfPosts/limit),
            totalPosts:totalNoOfPosts,

        }

        //save your post in redis cache
        await req.redisClient.setex(cacheKey,300,JSON.stringify(result));

        res.json(result);
        
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

module.exports={createPost,getAllPosts};
