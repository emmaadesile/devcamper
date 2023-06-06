import express from "express";
import {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  deleteBootCamp,
} from "../controllers/bootcamps";
import { verifyToken } from "../utils/token";

const router = express.Router();

// routes
router.route("/").get(getBootCamps).post(verifyToken, createBootCamp);
router.route("/:id").get(getBootCamp).delete(verifyToken, deleteBootCamp);

export default router;
