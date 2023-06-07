"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _dbConfig = _interopRequireDefault(require("../config/dbConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var initialize = function initialize() {
  // Database Connection
  _dbConfig["default"].connect(function (err) {
    if (err) {
      console.error("Connection Error: ".concat(err.stack));
      return;
    }
    console.log("Connected as id: ".concat(_dbConfig["default"].threadId));
  });
  var query = _fs["default"].readFileSync(_path["default"].join(__dirname, "./query.sql")).toString();
  _dbConfig["default"].query(query, function (err, result) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log("Database tables created");
    }
  });
};
exports.initialize = initialize;