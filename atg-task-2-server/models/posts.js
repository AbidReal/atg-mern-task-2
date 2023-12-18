const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  username: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = mongoose.model("posts", PostSchema);
module.exports = PostModel;
