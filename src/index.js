import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import colors from "colors";

import bootcampRoutes from "./routes/bootcamps";
import authRoutes from "./routes/auth";
import dbConnect from "./config/dbConfig";
import { initialize } from "./models/initialize";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// initialize database
initialize();

// body parser
app.use(express.json());

// routes
app.use("/api/v1/bootcamps", bootcampRoutes);
app.use("/api/v1/auth", authRoutes);

const server = app.listen(PORT, () =>
  console.log(`Server is running on PORT - ${PORT}`.yellow.bold)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
