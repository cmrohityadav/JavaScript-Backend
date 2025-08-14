const express=require('express');
const { registerUser, loginUser, logoutUser, refreshTokenController } = require('../controllers/identityController');

const router= express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.post('/refreshToken',refreshTokenController);


module.exports=router;