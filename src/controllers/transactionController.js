
const Transaction = require("../models/Transaction");

exports.addTransaction = async (req, res) => {
    const { amount, date, ref_no, type, description, user_id, category_id, books, associated_person, meta_data } = req.body;
  
    // Server-side validation
    if (!amount || !type || !user_id || !category_id) {
      return res.status(400).json({ message: "Amount, type, user_id, and category_id are required" });
    }
  
    try {
      const transaction = new Transaction({
        amount,
        date: date || Date.now(),
        ref_no,
        type,
        description,
        user_id,
        category_id,
        books, // Array of book IDs
        associated_person,
        meta_data,
      });
  
      await transaction.save();
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ message: "Error adding transaction", error });
    }
  };
  

  exports.getTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.find({ user_id: req.user.id })
        .populate("category_id", "name description") // Populate category details
        .populate("books", "name description"); // Populate book details
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching transactions", error });
    }
  };
  