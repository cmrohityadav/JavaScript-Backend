const express=require('express');
const {createPost,getAllPosts}=require('../controllers/postController');
const { authenticateRequest } = require('../middlewares/authMiddleware');
const router=express.Router();


// from middleware -> this will tell if the user is an auth user or not
router.use(authenticateRequest)

router.post('/createpost',createPost);
router.get('/getpost',getAllPosts);

module.exports=router;