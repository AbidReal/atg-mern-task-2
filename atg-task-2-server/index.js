const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/users");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/atgMernTask2");

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  UserModel.create({ username, email, password }) // Pass the extracted fields to create a new user
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.listen(3001, () => {
  console.log("atg task 2 server is running");
});
