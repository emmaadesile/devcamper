"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBootcampSchema = exports.signupSchema = exports.loginSchema = exports.createBootcampSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var signupSchema = _joi["default"].object({
  name: _joi["default"].string().required("Name is required"),
  email: _joi["default"].string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ["com", "net"]
    }
  }).required("Email is required"),
  password: _joi["default"].string().min(5).required("Password is required")
});
exports.signupSchema = signupSchema;
var loginSchema = _joi["default"].object({
  email: _joi["default"].string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ["com", "net"]
    }
  }).required("Email is required"),
  password: _joi["default"].string().min(5).required("Password is required")
});
exports.loginSchema = loginSchema;
var createBootcampSchema = _joi["default"].object({
  name: _joi["default"].string().required(),
  description: _joi["default"].string().required(),
  website: _joi["default"].string().required(),
  email: _joi["default"].string().email().required(),
  address: _joi["default"].string().required(),
  housing: _joi["default"].number().required(),
  jobGuarantee: _joi["default"].number().required()
});
exports.createBootcampSchema = createBootcampSchema;
var updateBootcampSchema = _joi["default"].object({
  name: _joi["default"].string(),
  description: _joi["default"].string(),
  website: _joi["default"].string(),
  email: _joi["default"].string().email(),
  address: _joi["default"].string(),
  housing: _joi["default"].number(),
  jobGuarantee: _joi["default"].number()
});
exports.updateBootcampSchema = updateBootcampSchema;