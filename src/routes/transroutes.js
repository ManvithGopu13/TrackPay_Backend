const express = require("express");
const { addTransaction, getTransactions, updateTransaction , deleteTransaction} = require("../controllers/transactionController");
const { addBook , getBooks} = require("../controllers/bookController");
// const { authenticateUser } = require("../middleware/authenticationMiddleware");

const router = express.Router();

// Transaction Routes
router.post("/addTransaction", addTransaction);
router.get("/getTransactions", getTransactions);
router.put("/updateTransaction/:id", updateTransaction);
router.delete("/deleteTransaction/:id", deleteTransaction);

// Book Routes
router.post("/addBook", addBook);
router.get("/getBooks", getBooks);

module.exports = router;
