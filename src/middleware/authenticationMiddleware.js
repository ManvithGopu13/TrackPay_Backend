const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, '86485824e5de4935d285cbe3616ee00d56f07179832483f7d04a09694baba93e9538c31b66286eb0f50062c27bc164cdaa75a48bb6b6aacc23d243245fea721d');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticateUser;
