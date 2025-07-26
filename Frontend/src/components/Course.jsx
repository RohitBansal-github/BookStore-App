import React, { useEffect, useState } from "react";
import Cards from "./Cards";
// import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("https://bookstore-app-h8tn.onrender.com/book");
        setBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    getBooks();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 mt-28">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-semibold">
          We're delighted to have you <span className="text-pink-500">Here! 🙂</span>
        </h1>
        <p className="text-gray-600">
          Discover a variety of helpful resources to boost your learning journey. Our curated
          collection of books is tailored for curious minds and dedicated learners.
        </p>
        <Link to="/">
          <button className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition duration-300">
            Back
          </button>
        </Link>
      </div>

      {/* Cards Section */}
      <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {books.length > 0 ? (
          books.map((item) => <Cards key={item._id} book={item} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">No books available right now.</p>
        )}
      </div>
    </div>
  );
}

export default Course;
