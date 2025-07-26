import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Dashboard() {
  const [authUser] = useAuth();
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('purchased');

  const fetchPurchasedBooks = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("Users")).token;
      const res = await fetch('https://bookstore-app-h8tn.onrender.com/user/purchased-books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPurchasedBooks(data);
    } catch (error) {
      console.error('Error fetching purchased books:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("Users")).token;
      const res = await axios.get('https://bookstore-app-h8tn.onrender.com/user/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(res.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error("Failed to load wishlist");
    }
  };

  const removeFromWishlist = async (bookId) => {
    try {
      const token = JSON.parse(localStorage.getItem("Users")).token;
      const res = await axios.delete('https://bookstore-app-h8tn.onrender.com/user/wishlist/remove', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { bookId },
      });
      toast.success(res.data.message || "Removed from wishlist");
      setWishlist(wishlist.filter(book => book._id !== bookId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove from wishlist");
    }
  };

  useEffect(() => {
    fetchPurchasedBooks();
    fetchWishlist();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">My Dashboard</h1>

      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-3 rounded-l-lg font-semibold ${activeTab === 'purchased' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-slate-700 text-black dark:text-white'}`}
          onClick={() => setActiveTab('purchased')}
        >
          Purchased Books
        </button>
        <button
          className={`px-6 py-3 rounded-r-lg font-semibold ${activeTab === 'wishlist' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-slate-700 text-black dark:text-white'}`}
          onClick={() => setActiveTab('wishlist')}
        >
          My Wishlist
        </button>
      </div>

      {/* Purchased Books */}
      {activeTab === 'purchased' && (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Your Purchased Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {purchasedBooks.length > 0 ? (
              purchasedBooks.map((book) => (
                <div key={book._id} className="bg-white dark:bg-slate-700 p-4 rounded shadow">
                  <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                  {/* Add more book details as needed */}
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No purchased books yet.</p>
            )}
          </div>
        </div>
      )}

      {/* Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Your Wishlist</h2>

          {wishlist.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300 text-lg">Your wishlist is empty. Start adding some books!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((book) => (
                <div key={book._id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-colors relative p-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-md mb-4 dark:brightness-90"
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
                      onClick={() => removeFromWishlist(book._id)}
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
      )}
    </div>
  );
}

export default Dashboard;
