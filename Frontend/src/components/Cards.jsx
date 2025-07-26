import React, { useState, useEffect } from 'react';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

function Card({ book }) {
  const [authUser] = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // ✅ Added state

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const truncateDescription = (desc, wordLimit) => {
    const words = desc?.split(' ');
    if (words?.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return desc;
  };

  const handlePurchase = async () => {
    if (!authUser) {
      toast.error("Please login to purchase books.");
      return;
    }
    try {
      const res = await axios.post('http://localhost:3000/book/create-checkout-session', { bookId: book._id });
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      toast.error("An error occurred during purchase.");
    }
  };

  const handleToggleLike = async () => {
    if (!authUser) {
      toast.error("Please login to like books.");
      return;
    }
    try {
      const userInfo = JSON.parse(localStorage.getItem("Users"));
      const token = userInfo?.token;
      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return;
      }

      const res = await axios.post('http://localhost:3000/book/toggle-like', { bookId: book._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.message) {
        toast.success(res.data.message);
        setIsLiked(res.data.isLiked);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error(error.response?.data?.message || "An error occurred while toggling like.");
    }
  };

  const handleAddToWishlist = async () => {
    if (!authUser) {
      toast.error("Please login to add books to your wishlist.");
      return;
    }
    try {
      const userInfo = JSON.parse(localStorage.getItem("Users"));
      const token = userInfo?.token;
      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return;
      }

      const res = await axios.post('http://localhost:3000/user/wishlist/add', { bookId: book._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.message) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error(error.response?.data?.message || "An error occurred while adding to wishlist.");
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-colors relative">
      {book.free && (
        <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">Free</span>
      )}
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
        {authUser && (
          <div className="flex space-x-2">
            <button
              onClick={handleToggleLike}
              className={`btn btn-sm ${isLiked ? 'bg-red-600' : 'bg-red-300'} text-white hover:bg-red-600 transition-colors flex items-center justify-center`}
              aria-label="Like book"
            >
              <FaHeart />
            </button>
            <button
              onClick={handleAddToWishlist}
              className="btn btn-sm bg-blue-500 text-white hover:bg-blue-700 transition-colors flex items-center justify-center"
              aria-label="Add to wishlist"
            >
              <FaBookmark />
            </button>
          </div>
        )}
      </div>

      <p className="mb-4 text-gray-600 dark:text-gray-300">{truncateDescription(book.description, 20)}</p>

      <div className="flex justify-between items-center">
        <button
          onClick={handleToggleDetails}
          className="text-primary dark:text-secondary hover:text-secondary dark:hover:text-primary transition-colors"
        >
          {showDetails ? "Show Less" : "Learn More"}
        </button>

        {!book.free && authUser && (
          <button
            onClick={handlePurchase}
            className="btn btn-sm bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            Purchase
          </button>
        )}
      </div>

      {showDetails && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
          {book.description}
        </p>
      )}
    </div>
  );
}

export default Card;
