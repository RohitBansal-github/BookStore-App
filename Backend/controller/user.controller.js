import User from "../model/user.model.js";
import Book from "../model/book.model.js";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async(req, res) => {
    try {
        const { fullname, email, password, role } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            role: role,
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                },
                token,
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPurchasedBooks = async (req, res) => {
  try {
    // In a real application, you would fetch this from the database
    const purchasedBooks = [
      { _id: "1", name: "Purchased Book 1", title: "A great read", image: "https://via.placeholder.com/150" },
      { _id: "2", name: "Purchased Book 2", title: "Another great read", image: "https://via.placeholder.com/150" },
    ];
    res.status(200).json(purchasedBooks);
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available from authentication middleware
    const user = await User.findById(userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User wishlist before populate:", user.wishlist);
    res.status(200).json(user.wishlist);
    console.log("User wishlist after populate:", user.wishlist);
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available from authentication middleware
    const { bookId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is already in the wishlist
    if (user.wishlist.some(item => item && item.toString() === bookId)) {
      return res.status(400).json({ message: "Book already in wishlist" });
    }

    console.log("Adding bookId to wishlist:", bookId);

    // Verify if the book exists
    const book = await Book.findById(new mongoose.Types.ObjectId(bookId));
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    user.wishlist.push(bookId);
    await user.save();
    res.status(200).json({ message: "Book added to wishlist successfully" });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist.pull(bookId);
    await user.save();
    res.status(200).json({ message: "Book removed from wishlist successfully" });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
