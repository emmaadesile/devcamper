import fs from "fs";
import path from "path";
import connect from "../config/dbConfig";

export const initialize = () => {
  // Database Connection
  connect.connect((err) => {
    if (err) {
      console.error(`Connection Error: ${err.stack}`);
      return;
    }
    console.log(`Connected as id: ${connect.threadId}`);
  });
  const query = fs.readFileSync(path.join(__dirname, "./query.sql")).toString();

  connect.query(query, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log("Database tables created");
    }
  });
};
