require("dotenv").config();
const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const SchemaUser = require("../models/user.model");
const verifyToken = require("../middleware/token.validator");
const secret = process.env.SECRET;


// Registration path (signup)
routes.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new SchemaUser({ username, email, password });
    user.password = await user.encryptPassword(password);
    await user.save();
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 60 });
    res.json({ auth: true, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// profile path (profile)
routes.get("/profile", verifyToken, async (req, res) => {
  try {
    const id = req.userId;
    const user = await SchemaUser.findById(id, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login path (signin)
routes.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SchemaUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "The email doesn't exist" });
    }
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      return res.status(401).json({ auth: false, token: null });
    }
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 60 });
    res.json({ auth: true, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routes;
