import { Router } from "express";
import { forgotPassword, getUser, logout, resetPassword, signin, signup } from "../controller/auth.controller.js";
import { jwtAuthMiddleware } from "../middleware/jwtAuth.middleware.js";

const router=Router();

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:token").post(resetPassword)

// secure route
router.route("/user").get(jwtAuthMiddleware,getUser)
router.route("/logout").get(jwtAuthMiddleware,logout)

export default router;