const express = require("express");
const { addTransaction, getTransactions } = require("../controllers/transactionController");
const { addBook } = require("../controllers/bookController");
// const { authenticateUser } = require("../middleware/authenticationMiddleware");

const router = express.Router();

// Transaction Routes
router.post("/addTransaction", addTransaction);
router.get("/getTransactions", getTransactions);

// Book Routes
router.post("/books", addBook);

module.exports = router;
