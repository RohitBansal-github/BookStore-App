import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AllBooks() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('https://bookstore-app-h8tn.onrender.com/book/all'); // Assuming this is your backend endpoint
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch books:", err);
        setError("Failed to load books. Please try again later.");
        toast.error("Failed to load books.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerCaseQuery) ||
          book.category.toLowerCase().includes(lowerCaseQuery) ||
          book.description.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchQuery, books]);

  const categories = [...new Set(filteredBooks.map(book => book.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 sm:px-6 md:px-8 py-8 mt-20 flex justify-center items-center">
          <p className="text-lg">Loading books...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 sm:px-6 md:px-8 py-8 mt-20 flex justify-center items-center">
          <p className="text-lg text-red-500">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 md:px-8 py-8 mt-20">
        <h1 className="text-4xl font-bold text-center mb-10">All Books</h1>
        {filteredBooks.length === 0 ? (
          <p className="text-center text-lg">No books found matching your search.</p>
        ) : (
          categories.map(category => (
            <section key={category} className="mb-12">
              <h2 className="text-3xl font-semibold mb-6 border-b-2 border-primary pb-2">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredBooks.filter(book => book.category === category).map(book => (
                  <Cards key={book._id} book={book} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
}

export default AllBooks;