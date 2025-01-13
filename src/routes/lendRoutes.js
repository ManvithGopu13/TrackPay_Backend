const express = require("express");
const {
  getLends,
  addLend,
  updateLend,
  deleteLend,
} = require("../controllers/lendControllers");
const { authenticateUser } = require("../middleware/authenticationMiddleware");

const router = express.Router();
console.log("addLend function:", addLend);
// API Routes
// router.get("/getLends",authenticateUser, getLends); // Requires authentication
// router.post("/addLend", authenticateUser,  addLend); // Add authentication
router.get("/getLends", (req, res) => {
  getLends(req, res);
});
router.post("/addLend", (req, res) => {
  addLend(req, res);
});
router.put("/Lends/:id", (req, res) => {
  updateLend(req, res);
});
router.delete("/Lends/:id", (req, res) => {
  deleteLend(req, res);
});
// router.put("/Lends/:id", authenticateUser,  updateLend);
// router.delete("/Lends/:id", authenticateUser,  deleteLend);

module.exports = router;
