const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const UserModel = require("./models/users");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/atgMernTask2");

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "server error" });
    }
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
      if (bcryptErr) {
        return res.status(500).json({ message: "server error" });
      }
      if (isMatch) {
        return res.status(200).json({ message: "success" });
      } else {
        return res.status(401).json({ message: "incorrect password" });
      }
    });
  });
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists in the database
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    }).exec();

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // If username and email are unique, create a new user
    const newUser = await UserModel.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("atg task 2 server is running");
});
