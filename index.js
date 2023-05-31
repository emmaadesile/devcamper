import express from "express";
import dotenv from "dotenv";
const bootcampRoutes = require('./routes/bootcamps');

dotenv.config({
  path: "./config/config.env",
});

const app = express();
const PORT = process.env.PORT || 5001;

// routes
app.use('/api/v1/bootcamps', bootcampRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT - ${PORT}`));
