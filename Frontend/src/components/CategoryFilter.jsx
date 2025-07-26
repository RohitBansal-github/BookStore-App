import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CategoryFilter() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://bookstore-app-h8tn.onrender.com/book/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">Browse by Category</h3>
      <div className="flex flex-wrap gap-2">
        <Link
          to="/books"
          className="px-4 py-2 rounded-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white hover:bg-primary hover:text-white transition-colors"
        >
          All Books
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            to={`/books?category=${category}`}
            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white hover:bg-primary hover:text-white transition-colors"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;