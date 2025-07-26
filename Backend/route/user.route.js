import express from "express";
import { signup, login, getPurchasedBooks, getWishlist, addToWishlist,removeFromWishlist } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/purchased-books", protect, getPurchasedBooks);
router.get("/wishlist", protect, getWishlist);
router.post("/wishlist/add", protect, addToWishlist);
router.delete("/wishlist/remove", protect, removeFromWishlist);

export default router;