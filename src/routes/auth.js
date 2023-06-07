import express from "express";
import { login, register } from "../controllers/auth";
import { loginValidation, signupValidation } from "../middleware/formValidation.js";

const router = express.Router();

// routes
router.route("/register").post(signupValidation, register);
router.route("/login").post(loginValidation, login);

export default router;
