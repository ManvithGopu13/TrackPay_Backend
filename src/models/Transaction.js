// src/models/Transaction.js
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Automatically generates a unique ID
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Default to the current timestamp
  },
  refNo: {
    type: String,
    // unique: true,
    // required: true, // Ensures each transaction has a unique reference number
    default: null, // Allows `null` values
    sparse: true,  // Ensures the unique index (if recreated) ignores `null` values
  },
  type: {
    type: String,
    enum: ["Debit", "Credit"], // "debit" or "credit" only
    required: true,
  },
  description: {
    type: String,
    default: null, // Optional description
  },
  // Relationships
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links to the User model
    required: true,
  },
  category_id: {
    type: String,
    // ref: "Category", // Links to the Category model
    // required: true,
    default: null,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book", // Links to the Book model (one or more books)
  },
  // Optional fields
  associated_person: {
    type: String,
    default: null, // "To" or "from" person
  },
  // meta_data: {
  //   type: mongoose.Schema.Types.Mixed, // JSON for additional details
  //   default: null,
  // },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
