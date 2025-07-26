import mongoose from "mongoose";
import Book from "../model/book.model.js";
import User from "../model/user.model.js";

export const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.error("Error in getBook controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFreeBooks = async (req, res) => {
  try {
    const freeBooks = await Book.find({ free: true });
    res.status(200).json(freeBooks);
  } catch (error) {
    console.error("Error in getFreeBooks controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBooksByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const books = await Book.find({ category: categoryName });
    res.status(200).json(books);
  } catch (error) {
    console.error(`Error in getBooksByCategory controller for category ${categoryName}:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const searchRegex = new RegExp(query, 'i'); // Case-insensitive search
    const books = await Book.find({
      title: { $regex: searchRegex },
    });
    res.status(200).json(books);
  } catch (error) {
    console.error("Error in searchBooks controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Book.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error in getAllCategories controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addBook = async (req, res) => {
  try {
    const { name, price, category, image, title, free } = req.body;
    const newBook = new Book({
      name,
      price,
      category,
      image,
      title,
      free: free || false, // Default to false if not provided
    });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error in addBook controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error in deleteBook controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCheckoutSession = async (req, res, stripe) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: book.title,
              images: [book.image],
            },
            unit_amount: Math.round(book.price * 100), // Price in paisa
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;

    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    if (!book || !user) {
      return res.status(404).json({ message: "Book or User not found" });
    }

    const bookIdObj = new mongoose.Types.ObjectId(bookId);

    if (user.likedBooks.includes(bookIdObj)) {
      // User has already liked, so unlike it
      user.likedBooks.pull(bookIdObj);
      book.likes = Math.max(0, book.likes - 1);
      await book.save();
      await user.save();
      return res.status(200).json({ message: "Book unliked successfully", likes: book.likes, dislikes: book.dislikes, isLiked: false });
    } else {
      // User has not liked, so like it
      user.likedBooks.push(bookIdObj);
      book.likes += 1;

      // If user previously disliked, remove dislike
      if (user.dislikedBooks.includes(bookIdObj)) {
        user.dislikedBooks.pull(bookIdObj);
        book.dislikes = Math.max(0, book.dislikes - 1);
      }

      await book.save();
      await user.save();
      return res.status(200).json({ message: "Book liked successfully", likes: book.likes, dislikes: book.dislikes, isLiked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAllBooks = async (req, res) => {
  try {
    await Book.deleteMany({});
    res.status(200).json({ message: "All books deleted successfully" });
  } catch (error) {
    console.error("Error deleting all books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};