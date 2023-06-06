import express from "express";
import { login, register } from "../controllers/auth";
import { signupValidation } from "../middleware/formValidation";

const router = express.Router();

// routes
router.route("/register").post(signupValidation, register);
router.route("/login").post(login);

export default router;
