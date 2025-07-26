import React, { useState, useEffect } from 'react';
import Card from './Cards';
import axios from 'axios';
import toast from 'react-hot-toast';

function Freebook() {
  const [freeBooks, setFreeBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreeBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        // Assuming your backend has an endpoint for free books, e.g., /book/free or /book?free=true
        const res = await axios.get('http://localhost:3000/book/free'); 
        setFreeBooks(res.data);
        setLoading(false);
      } catch (err) {

        console.error("Failed to fetch free books:", err);
        setError("Failed to load free books. Please try again later.");
        toast.error("Failed to load free books.");
        setLoading(false);
      }
    };

    fetchFreeBooks();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-4 md:px-20 bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
        <div className="max-w-screen-2xl mx-auto text-center">
          <p className="text-lg">Loading free books...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-4 md:px-20 bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
        <div className="max-w-screen-2xl mx-auto text-center">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:px-20 bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">Free Books</h2>
        {freeBooks.length === 0 ? (
          <p className="text-center text-lg text-gray-600 dark:text-gray-300">No free books available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {freeBooks.map((book) => (
              <Card
                key={book._id}
                book={book}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Freebook;