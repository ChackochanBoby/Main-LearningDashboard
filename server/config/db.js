const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log("connected to database");
  } catch (error) {
    console.error("Couldnt connect to database");
  }
};

module.exports = { connectDb };