import express from "express";
import {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  deleteBootCamp,
  updateBootcamp,
} from "../controllers/bootcamps";
import { verifyToken } from "../utils/token";
import {
  createBootcampValidation,
  updateBootcampValidation,
} from "../middleware/formValidation";

const router = express.Router();

// routes
router
  .route("/")
  .get(getBootCamps)
  .post(verifyToken, createBootcampValidation, createBootCamp);

router
  .route("/:id")
  .get(getBootCamp)
  .put(verifyToken, updateBootcampValidation, updateBootcamp)
  .delete(verifyToken, deleteBootCamp);

export default router;
