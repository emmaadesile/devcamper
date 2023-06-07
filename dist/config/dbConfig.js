"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mysql = _interopRequireDefault(require("mysql"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var connectionOptions = {
  dev: _mysql["default"].createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
  }),
  prod: {
    url: _mysql["default"].createConnection(process.env.DB_URL)
  }
};
var connect;
if (process.env.NODE_ENV === "development") {
  connect = connectionOptions.dev;
}
if (process.env.NODE_ENV === "production") {
  connect = connectionOptions.prod;
}
var _default = connect;
exports["default"] = _default;