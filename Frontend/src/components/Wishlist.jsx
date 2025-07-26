import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

function Wishlist() {
  const [authUser] = useAuth();
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authUser) {
      fetchWishlist();
    } else {
      setLoading(false);
      setError("Please log in to view your wishlist.");
    }
  }, [authUser]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = JSON.parse(localStorage.getItem("Users")).token;
      const res = await axios.get('https://bookstore-app-h8tn.onrender.com/user/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlistBooks(res.data);
      console.log("Wishlist books fetched:", res.data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError(err.response?.data?.message || "Failed to fetch wishlist.");
      toast.error(err.response?.data?.message || "Failed to fetch wishlist.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      const token = JSON.parse(localStorage.getItem("Users")).token;
      const res = await axios.delete('https://bookstore-app-h8tn.onrender.com/user/wishlist/remove', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { bookId }, // For DELETE requests with body
      });
      toast.success(res.data.message);
      setWishlistBooks(wishlistBooks.filter(book => book._id !== bookId)); // Optimistic update
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error(err.response?.data?.message || "Failed to remove from wishlist.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl dark:text-white">Loading wishlist...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white p-6 sm:p-8 lg:p-12">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-800 dark:text-white drop-shadow-xl">Your Wishlist</h1>
      
      {wishlistBooks.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">Your wishlist is empty. Start adding some books!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {wishlistBooks.map((book) => (
            <div key={book._id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-colors relative p-4">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4 dark:brightness-90"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{book.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{book.category}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-primary dark:text-secondary">
                  {book.free ? "Free" : (typeof book.price === 'number' ? `₹${book.price.toFixed(2)}` : '₹N/A')}
                </span>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">{book.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <Link
                  to={book.free ? `/book/${book._id}` : book.wikipediaLink}
                  target={book.free ? "_self" : "_blank"}
                  rel={book.free ? "" : "noopener noreferrer"}
                  className="text-primary dark:text-secondary hover:text-secondary dark:hover:text-primary transition-colors"
                >
                  {book.free ? "Read Summary" : "Learn More"}
                </Link>
                <button
                  onClick={() => handleRemoveFromWishlist(book._id)}
                  className="btn btn-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
