const jwt = require("jsonwebtoken");
const JWT_SECRET = ""

const fetchuser = (req, res, next) => {
  // Get token from header
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ error: "❌ No token found, please authenticate using a valid token" });
  }

  try {
    // Verify token
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // { id: user.id }
    next();
  } catch (error) {
    console.error("🔥 JWT Verification Failed:", error.message);
    res
      .status(401)
      .json({ error: "❌ Invalid token, please authenticate again" });
  }
};

module.exports = fetchuser;
