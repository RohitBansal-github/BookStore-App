import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookList from '../../components/BookList';

function Books() {
  const location = useLocation();
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const queryParam = params.get('query');

    if (categoryParam) {
      setCategory(categoryParam);
      setSearchQuery(''); // Clear search query if category is selected
    } else if (queryParam) {
      setSearchQuery(queryParam);
      setCategory(''); // Clear category if search query is present
    } else {
      setCategory('');
      setSearchQuery('');
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
      <Navbar />
      <main className="flex-1 pt-20">
        <h1 className="text-3xl font-bold text-center mb-8">Browse Books</h1>
        <CategoryFilter />
        <BookList category={category} searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  );
}

export default Books;