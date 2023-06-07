"use strict";

var fs = require("fs");
var path = require("path");
var dbConnect = require("../config/dbConfig");
var initialize = function initialize() {
  // Database Connection
  dbConnect.connect(function (err) {
    if (err) {
      console.error("Connection Error: ".concat(err.stack));
      return;
    }
    console.log("Connected as id: ".concat(dbConnect.threadId));
  });
  var query = fs.readFileSync(path.join(__dirname, "./query.sql")).toString();
  dbConnect.query(query, function (err, result) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log("Database tables created");
    }
  });
};
module.exports = initialize;