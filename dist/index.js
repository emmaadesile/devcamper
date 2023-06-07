"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _colors = _interopRequireDefault(require("colors"));
var _bootcamps = _interopRequireDefault(require("./routes/bootcamps"));
var _auth = _interopRequireDefault(require("./routes/auth"));
var _dbConfig = _interopRequireDefault(require("./config/dbConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
var PORT = process.env.PORT || 5002;

// middleware
if (process.env.NODE_ENV === "development") {
  app.use((0, _morgan["default"])("dev"));
}

// Database Connection
_dbConfig["default"].connect(function (err) {
  if (err) {
    console.error("Connection Error: ".concat(err.stack));
    return;
  }
  console.log("Connected as id: ".concat(_dbConfig["default"].threadId));
});

// body parser
app.use(_express["default"].json());

// routes
app.use("/api/v1/bootcamps", _bootcamps["default"]);
app.use("/api/v1/auth", _auth["default"]);
var server = app.listen(PORT, function () {
  return console.log("Server is running on PORT - ".concat(PORT).yellow.bold);
});
process.on("unhandledRejection", function (err, promise) {
  console.log("Error: ".concat(err.message).red);
  server.close(function () {
    return process.exit(1);
  });
});