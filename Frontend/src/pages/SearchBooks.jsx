import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Cards';
import toast from 'react-hot-toast';

function SearchBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchQuery) {
        setBooks([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`https://bookstore-app-h8tn.onrender.com/book/search?query=${searchQuery}`);
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch books. Please try again later.");
        toast.error("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery]);

  if (loading) {
    return <div className="text-center py-10 text-black dark:text-white">Loading search results...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
        Search Results for "{searchQuery}"
      </h1>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">No books found matching your search.</p>
      )}
    </div>
  );
}

export default SearchBooks;
