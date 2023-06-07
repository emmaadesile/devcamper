import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().required("Name is required"),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required("Email is required"),
  password: Joi.string().min(5).required("Password is required"),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required("Email is required"),
  password: Joi.string().min(5).required("Password is required"),
});

export const createBootcampSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  website: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  housing: Joi.number().required(),
  jobGuarantee: Joi.number().required(),
});

export const updateBootcampSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  website: Joi.string(),
  email: Joi.string().email(),
  address: Joi.string(),
  housing: Joi.number(),
  jobGuarantee: Joi.number(),
});
