import express from "express";
import {
  getBootCamps,
  getBootCamp,
  editBootCamp,
  createBootCamp,
  deleteBootCamp,
} from "../controllers/bootcamps";

const router = express.Router();

// routes
router.route("/").get(getBootCamps).post(createBootCamp);
router.route("/:id").get(getBootCamp).put(editBootCamp).delete(deleteBootCamp);

export default router;
