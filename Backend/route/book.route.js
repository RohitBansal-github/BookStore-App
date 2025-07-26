import express from "express";
import { getBook, getFreeBooks, getBooksByCategory, searchBooks, getAllCategories, addBook, deleteBook, createCheckoutSession, getBookById,toggleLike,deleteAllBooks} from "../controller/book.controller.js";
import { protect, authorizeAdmin } from "../middleware/auth.middleware.js";

const bookRoutes = (stripe) => {
  const router = express.Router();

  router.get("/", getBook);
  router.get("/all", getBook);
  router.get("/free", getFreeBooks);
  router.get("/category/:categoryName", getBooksByCategory);
  router.get("/search", searchBooks);
  router.get("/categories", getAllCategories);
  router.get("/:id", getBookById);
  router.post("/add", addBook);
  router.delete("/delete/:id", protect, authorizeAdmin, deleteBook);
  router.post("/create-checkout-session", (req, res) => createCheckoutSession(req, res, stripe));
  router.post("/toggle-like", protect, toggleLike);
  router.delete("/delete-all", protect, authorizeAdmin, deleteAllBooks);

  return router;
};

export default bookRoutes;