const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(404).json({
      auth: false,
      message: "no token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
}

module.exports = verifyToken;
