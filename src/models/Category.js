// src/models/Category.js
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null, // Optional field
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation timestamp
  },
});

module.exports = mongoose.model("Category", CategorySchema);
