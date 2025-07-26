import React, { useState, useEffect } from 'react';
import Card from './Cards';

function BookList({ category, searchQuery }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      let url = 'https://bookstore-app-h8tn.onrender.com/book';

      if (category) {
        url = `https://bookstore-app-h8tn.onrender.com/book/category/${category}`;
      } else if (searchQuery) {
        url = `https://bookstore-app-h8tn.onrender.com/book/search?query=${searchQuery}`;
      }

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category, searchQuery]);

  if (loading) {
    return <div className="text-center py-8 text-black dark:text-white">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (books.length === 0) {
    return <div className="text-center py-8 text-gray-600 dark:text-gray-300">No books found.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">{category ? `Books in ${category}` : (searchQuery ? `Search Results for "${searchQuery}"` : "Featured Books")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <Card
            key={book._id}
            book={book}
          />
        ))}
      </div>
    </div>
  );
}

export default BookList;