// backend/index.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectToMongo = require("./db");

// Load env variables
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 5000;

// Connect to Mongo
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Root route (optional)
app.get("/", (req, res) => {
  res.send("INotebook backend is running with MongoDB Atlas!");
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
