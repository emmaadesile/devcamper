import dbConnect from "../config/dbConfig";

import {
  createBootcampSchema,
  loginSchema,
  signupSchema,
  updateBootcampSchema,
} from "./validationSchema";

const genericValidator = async (schema, req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};

export const signupValidation = async (req, res, next) => {
  return genericValidator(signupSchema, req, res, next);
};

export const loginValidation = async (req, res, next) => {
  return genericValidator(loginSchema, req, res, next);
};

export const createBootcampValidation = async (req, res, next) => {
  return genericValidator(createBootcampSchema, req, res, next);
};

export const updateBootcampValidation = async (req, res, next) => {
  return genericValidator(updateBootcampSchema, req, res, next);
};
