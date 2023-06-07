import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const connectionOptions = {
  dev: mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
  }),
  prod: {
    url: mysql.createConnection(process.env.DB_URL),
  },
};

let connect;

if (process.env.NODE_ENV === "development") {
  connect = connectionOptions.dev;
}
if (process.env.NODE_ENV === "production") {
  connect = connectionOptions.prod;
}

export default connect;
