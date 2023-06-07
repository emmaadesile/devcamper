"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var secret = process.env.TOKEN_SECRET;

/**
 * @desc generate token for authorization
 * @param userId
 * @returns token
 */
var generateToken = function generateToken(_ref) {
  var userId = _ref.userId;
  var token = _jsonwebtoken["default"].sign({
    userId: userId
  }, secret, {
    expiresIn: "24h"
  });
  return token;
};

/**
 * @desc decode token
 * @param token
 * @returns userId
 */
exports.generateToken = generateToken;
var verifyToken = function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Authorization missing"
      });
    }
  }
  var token = req.headers["authorization"].split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "User unauthorized"
    });
  }
  _jsonwebtoken["default"].verify(token, secret, function (err, decoded) {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: err.toString()
      });
    }
    req.userId = decoded.userId;
    next();
  });
};
exports.verifyToken = verifyToken;