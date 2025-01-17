
const Book = require('../models/Book');

exports.addBook = async (req, res) => {
    const { name, description, user_id } = req.body;
  
    if (!name || !user_id) {
      return res.status(400).json({ message: "Book name and user_id are required" });
    }
  
    try {
      const book = new Book({
        name,
        description,
        user_id,
      });
  
      await book.save();
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: "Error adding book", error });
    }
  };
  