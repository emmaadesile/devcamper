const fs = require("fs");
const path = require("path");
const dbConnect = require("../config/dbConfig");

const initialize = () => {
  // Database Connection
  dbConnect.connect((err) => {
    if (err) {
      console.error(`Connection Error: ${err.stack}`);
      return;
    }
    console.log(`Connected as id: ${dbConnect.threadId}`);
  });
  const query = fs.readFileSync(path.join(__dirname, "./query.sql")).toString();

  dbConnect.query(query, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log("Database tables created");
    }
  });
};

module.exports = initialize;
