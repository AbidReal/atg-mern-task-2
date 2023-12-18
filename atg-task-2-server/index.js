require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const UserModel = require("./models/users");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const cookieParser = require("cookie-parser");

//middleware
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/atgMernTask2");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("no token found");
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return res.json("token is wrong");
      next();
    });
  }
};

app.get("/home", verifyUser, async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, secretKey);

    const user = await UserModel.findOne({ username: decoded.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Success", username: user.username });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

//login section
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: "10h",
      });
      res.cookie("token", token);
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// registration section
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

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // If username and email are unique, create a new user with hashed password
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//forgot password section
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
});

app.listen(3001, () => {
  console.log("atg task 2 server is running");
});
