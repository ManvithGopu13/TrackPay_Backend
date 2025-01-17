// src/models/Book.js
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Book name is mandatory
  },
  description: {
    type: String,
    default: null, // Optional description
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the timestamp
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links to the User model (book owner)
    required: true,
  },
});

module.exports = mongoose.model("Book", BookSchema);
