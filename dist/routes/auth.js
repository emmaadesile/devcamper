"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../controllers/auth");
var _formValidation = require("../middleware/formValidation.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

// routes
router.route("/register").post(_formValidation.signupValidation, _auth.register);
router.route("/login").post(_formValidation.loginValidation, _auth.login);
var _default = router;
exports["default"] = _default;