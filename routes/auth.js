import express from "express";
import { login, register } from "../controllers/auth";

const router = express.Router();

// routes
router.route("/register").post(register);
router.route("/login").post(login);
// router.route("/:id").get(getBootCamp).put(editBootCamp).delete(deleteBootCamp);

export default router;
