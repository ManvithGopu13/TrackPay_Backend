const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');
const lendingRoutes = require("./routes/lendRoutes");
app.use('/api/auth', authRoutes);
app.use("/api/lending", lendingRoutes);

module.exports = app;
