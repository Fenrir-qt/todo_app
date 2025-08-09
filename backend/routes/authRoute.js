const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;

router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  const user = await Users.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  req.session.userId = user._id;
  res.status(200).json({ message: "Login successful", user });
});

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be at least 8 characters long." });
    }
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          message: "Password must contain at least one special character.",
        });
    }
    const existingEmail = await Users.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingUsername = await Users.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const createUser = new Users({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    await createUser.save();

    res.status(201).json({ message: "User successfully created." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
