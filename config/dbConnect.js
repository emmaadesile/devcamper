import mongoose from "mongoose";

const connectToDb = async () => {
  const conn = await mongoose.connect("mongodb://localhost:27017", {
    autoIndex: true,
    dbName: "devcamper",
  });
  console.log(`Database Connected: ${conn.connection.host}`.cyan.underline);
};

export default connectToDb;