import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function BookSummary() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        // Assuming you have an API endpoint to fetch a single book by ID
        const res = await axios.get(`https://bookstore-app-h8tn.onrender.com/book/${id}`); // Assuming id from useParams is the _id
        setBook(res.data);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details. Please try again later.");
        toast.error("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-black dark:text-white">Loading book details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!book) {
    return <div className="text-center py-10 text-gray-600 dark:text-gray-300">Book not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">{book.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">Category: {book.category}</p>
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-cover rounded-md mb-6 dark:brightness-90"
        />
        <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">Summary</h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
          {book.description}
        </p>
        {book.wikipediaLink && (
          <a
            href={book.wikipediaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary dark:text-secondary hover:underline font-medium"
          >
            Read more on Wikipedia
          </a>
        )}
      </div>
    </div>
  );
}

export default BookSummary;
