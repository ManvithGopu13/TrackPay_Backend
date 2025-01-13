const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const lendingRoutes = require("./routes/lendRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport config
require("./config/passport-config")(passport);

// Session middleware
app.use(
  session({
    secret: '86485824e5de4935d285cbe3616ee00d56f07179832483f7d04a09694baba93e9538c31b66286eb0f50062c27bc164cdaa75a48bb6b6aacc23d243245fea721d',
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/lending", lendingRoutes);
app.use("/api/authentication", authRoutes);

// console.log("lendingController:", require("../controllers/lendingController"));


// Connect to MongoDB and start the server
const PORT = process.env.PORT || 10000;
mongoose
  .connect("mongodb+srv://21je0362:Manvith1394@cluster0.pue4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 
Connected to MongoDb`));
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));
