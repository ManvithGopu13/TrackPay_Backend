// src/controllers/lendingController.js
const Lend = require("../models/Lend");

// Get all lends (requires user authentication)
exports.getLends = async (req, res) => {
  const {user} = req.query;
  console.log(`User ID: ${user}`)
  try {
    const lends = await Lend.find({ user }); // Fetch lends specific to the logged-in user
    res.status(200).json(lends);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching your lends", error });
    console.error(`Error fetching lends: ${error}`);
  }
};


// Add a lend (requires user authentication)
exports.addLend = async (req, res) => {
  console.log("Entered add Lend");
  const {amount, interestRate, interestType, period, status, description, user } =
    req.body;
    console.log(`${amount},${user},${interestRate},${interestType},${period}`)
  // Server-side validation
  if (!amount || !interestRate || !interestType || !period) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    console.log("Primarily Entered saving lend");
    const lend = new Lend({
      amount,
      interestRate,
      interestType,
      period,
      status,
      description,
      user, // Associate lend with the logged-in user
      // : req.user.id
  });
    console.log("Entered saving lend");
    await lend.save();
    console.log("lend saved");
    res.status(201).json(lend);
  } catch (error) {
    res.status(500).json({ message: "Error adding lend", error });
    console.log("Error: ", error);
  }
};

// Update a lend (requires user authentication)
exports.updateLend = async (req, res) => {
  const { id } = req.params;
  const { amount, interestRate, interestType, period, status, description } =
    req.body;
  console.log(`${id}, ${description}`)
  try {
    const lend = await Lend.findOneAndUpdate(
      { _id: id, user: req.user.id }, // Ensure only lends owned by the user can be updated
      { amount, interestRate, interestType, period, status, description },
      { new: true }
    );
    
    if (!lend) {
      return res.status(404).json({ message: "Lend not found" });
    }

    res.status(200).json(lend);
  } catch (error) {
    res.status(500).json({ message: "Error updating lend", error });
  }
};

// Delete a lend (requires user authentication)
exports.deleteLend = async (req, res) => {
  const { id } = req.params;

  try {
    const lend = await Lend.findOneAndDelete({ _id: id, user: req.user.id }); // Ensure only lends owned by the user can be deleted

    if (!lend) {
      return res.status(404).json({ message: "Lend not found" });
    }

    res.status(200).json({ message: "Lend deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lend", error });
  }
};
