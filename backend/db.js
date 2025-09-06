// backend/db.js
const mongoose = require("mongoose");
const path = require("path");

// Load .env file from backend folder
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000, // wait max 10s
    });
    console.log("✅ Connected to MongoDB Atlas Successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // exit process if DB fails
  }
};

module.exports = connectToMongo;
