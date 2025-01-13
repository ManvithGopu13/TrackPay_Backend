// src/models/Lend.js
const mongoose = require("mongoose");

const LendSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  interestType: {
    type: String,
    required: true,
  },
  period: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Link to the User model
    required: true,
  },
});

module.exports = mongoose.model("Lend", LendSchema);
