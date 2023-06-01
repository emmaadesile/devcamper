import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";

import bootcampRoutes from "./routes/bootcamps";
import connectToDb from "./config/dbConnect";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// db Connection
connectToDb();

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1/bootcamps", bootcampRoutes);

const server = app.listen(PORT, () =>
  console.log(`Server is running on PORT - ${PORT}`.yellow.bold)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
