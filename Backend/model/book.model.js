import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    title: String,
    description: String, // Added for "learn more feature"
    likes: {             // Added for "like" functionality
        type: Number,
        default: 0,
    },
    dislikes: {          // Added for "dislike" functionality
        type: Number,
        default: 0,
    },
    free: {
        type: Boolean,
        default: false,
    },
});
const Book = mongoose.model("Book", bookSchema);

export default Book;