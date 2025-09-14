const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = ""

// ------------------------------------------------------
//  ROUTE 1: SIGNUP - Create a new user (POST /api/auth/createUser)
// ------------------------------------------------------
router.post(
  "/createUser",
  [
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Invalid email format").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    try {
      // Validate inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }

      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success, error: "User already exists with this email" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      // Create JWT token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      success = true;
      return res.status(201).json({ success, authToken });
    } catch (error) {
      console.error("🔥 Error in /createUser:", error.message);
      return res.status(500).json({
        success: false,
        message: "Server error occurred. Please try again later.",
      });
    }
  }
);

// ------------------------------------------------------
//  ROUTE 2: LOGIN - Authenticate user (POST /api/auth/login)
// ------------------------------------------------------
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    try {
      // Validate inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }

      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Invalid credentials (email not found)" });
      }

      // Match password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Invalid credentials (wrong password)" });
      }

      // Create JWT token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error("🔥 Error in /login:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error occurred. Please try again later.",
      });
    }
  }
);

// ------------------------------------------------------
//  ROUTE 3: GET USER - Get logged-in user details (POST /api/auth/getuser)
// ------------------------------------------------------
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error("🔥 Error in /getuser:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
