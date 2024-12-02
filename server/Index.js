require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;
const { connectDb } = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const {
  generalErrorHandler,
  notFoundErrorHandler,
} = require("./middleware/errorHandler");

// Middleware
app.use(cors({ origin: process.env.FRONTEND_BASE_URL,credentials:true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to MindSpring!");
});

app.use("/api", routes);

//404 error handler middleware
app.use("*", notFoundErrorHandler);

//general error handler middleware
app.use(generalErrorHandler);

// Function to start server when database connected successfully
const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(
      "Failed to start server due to database connection error:",
      error
    );
  }
};

// start server
startServer();
