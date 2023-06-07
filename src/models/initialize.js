import fs from "fs";
import path from "path";
import dbConnect from "../config/dbConfig";

export const initialize = () => {
  // Database Connection
  dbConnect.connect((err) => {
    if (err) {
      console.error(`Connection Error: ${err.stack}`);
      return;
    }
    console.log(`Connected as id: ${dbConnect.threadId}`);
  });
  // dbConnect.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`);
  const query = fs.readFileSync(path.join(__dirname, "./index.sql")).toString();

  dbConnect.query(query, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log("Database tables created");
    }
  });
};
