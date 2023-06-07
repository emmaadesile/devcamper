"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bootcamps = require("../controllers/bootcamps");
var _token = require("../utils/token");
var _formValidation = require("../middleware/formValidation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

// routes
router.route("/").get(_bootcamps.getBootCamps).post(_token.verifyToken, _formValidation.createBootcampValidation, _bootcamps.createBootCamp);
router.route("/:id").get(_bootcamps.getBootCamp).put(_token.verifyToken, _formValidation.updateBootcampValidation, _bootcamps.updateBootcamp)["delete"](_token.verifyToken, _bootcamps.deleteBootCamp);
var _default = router;
exports["default"] = _default;