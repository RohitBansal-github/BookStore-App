import axios from 'axios';
import { books } from '../Frontend/src/data/booksData.js'; // Adjust path as needed

const BASE_URL = "http://localhost:3000";

async function insertBooks() {
    console.log("Deleting all existing books...");
    try {
        await axios.delete(`${BASE_URL}/book/delete-all`);
        console.log("All existing books deleted successfully.");
    } catch (error) {
        console.error("Failed to delete existing books:", error.response ? error.response.data : error.message);
        // Continue even if deletion fails, to attempt insertion
    }

    console.log(`Attempting to insert ${books.length} books from booksData.js...`);
    for (const book of books) {
        try {
            // Ensure the book object matches the backend schema
            const bookData = {
                name: book.title, // Assuming 'name' and 'title' are the same for simplicity
                price: book.price,
                category: book.category,
                image: book.image,
                title: book.title,
                free: book.free,
                description: book.description,
                // _id: book._id, // Do not send _id for new insertions, let MongoDB generate it
            };
            const response = await axios.post(`${BASE_URL}/book/add`, bookData);
            console.log(`Successfully added book: ${book.title}`);
        } catch (error) {
            console.error(`Failed to add book (${book.title}):`, error.response ? error.response.data : error.message);
        }
    }
    console.log("Book insertion process completed.");
}

// Call the function to insert books.
insertBooks();