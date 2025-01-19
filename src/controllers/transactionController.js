const Transaction = require("../models/Transaction");

// Add a new transaction
exports.addTransaction = async (req, res) => {
  const { amount, date, refNo, type, description, user_id, category_id, books, associated_person } = req.body;
  // console.log("Entered add transaction")
  if (!amount || !type || !user_id || !category_id) {
    return res.status(400).json({ message: "Amount, type, user_id, and category_id are required" });
  }
  console.log(`${amount}, ${date}, ${refNo}, ${type}, ${description}, ${user_id}, ${category_id}, ${books}, ${associated_person}`)
  try {

    // Check for duplicate transactions
    if (refNo!= 'N/A') {
      const existingTransaction = await Transaction.findOne({ refNo });
      if (existingTransaction) {
        return res.status(400).json({ message: "Duplicate transaction detected" });
      }
    }

    const transaction = new Transaction({
      amount,
      date: date || Date.now(),
      refNo,
      type,
      description,
      user_id,
      category_id,
      books, // Array of book IDs
      associated_person,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction", error });
    console.log(`Error in adding : ${error}`)
  }
};

// Get all transactions for a user
exports.getTransactions = async (req, res) => {
  const { user_id } = req.query;
  console.log("Entered getTransactions")
  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  try {
    const transactions = await Transaction.find({ user_id })
      .populate("category_id", "name description") // Populate category details
      .populate("books", "name description"); // Populate book details
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { user_id, ...updatedData } = req.body;

  if (!id || !user_id) {
    return res.status(400).json({ message: "Transaction ID and user_id are required" });
  }

  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, user_id }, // Match transaction by ID and user_id
      updatedData,
      { new: true } // Return the updated document
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  if (!id || !user_id) {
    return res.status(400).json({ message: "Transaction ID and user_id are required" });
  }

  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id, user_id });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
};
