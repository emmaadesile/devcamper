"use strict";

var dbConnect = require("../config/dbConfig");
dbConnect.connect(function (err) {
  if (err) {
    console.error("Connection Error: ".concat(err.stack));
    return;
  }
  var query = fs.readFileSync(path.join(__dirname, "./index.sql")).toString();
  db.query(query, function (err, result) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.send("Database migration successfully");
    }
  });
});