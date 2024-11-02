const express = require("express");
const app = express();
const port = 3000;
const { connectDb } = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to MindSpring!");
});

app.use("/api", routes);

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
