import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import { useAuth } from '../context/AuthProvider.jsx';
import { useTheme } from '../context/ThemeProvider.jsx';

function Navbar() {
  const [authUser] = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sticky, setSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery.trim()}`);
      setIsMenuOpen(false); // Close mobile menu after search
    }
  };

  const navItems = (
    <>
      <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors py-3 hover:scale-105" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
      <li><Link to="/allbooks" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors py-3 hover:scale-105" onClick={() => setIsMenuOpen(false)}>All Books</Link></li>
      <li><Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors py-3 hover:scale-105" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
      <li><Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors py-3 hover:scale-105" onClick={() => setIsMenuOpen(false)}>About</Link></li>
      {authUser && <li><Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors py-3 hover:scale-105" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>}
      {authUser && <li><Link to="/wishlist" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors py-3 hover:scale-105" onClick={() => setIsMenuOpen(false)}>Wishlist</Link></li>}
    </>
  );

  return (
    <div
      className={`max-w-screen-2xl container mx-auto px-4 sm:px-6 fixed top-0 left-0 right-0 z-50 ${
        sticky ? 'shadow-lg bg-gray-100 dark:bg-slate-800' : 'bg-gray-100 dark:bg-slate-900'
      }`}
    >
      <div className="navbar py-3">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button
              onClick={toggleMenu}
              className="btn btn-ghost"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <ul
                className="menu dropdown-content mt-3 z-[5] p-4 shadow bg-gray-100 dark:bg-slate-800 rounded-box w-full max-w-full"
              >
                {navItems}
                <li className="sm:hidden mt-2">
                  <label className="px-3 py-2 border rounded-md flex items-center gap-2 bg-gray-200 dark:bg-slate-700">
                    <input
                      type="text"
                      placeholder="Search"
                      className="grow outline-none rounded-md px-1 bg-gray-200 dark:bg-slate-700 text-black dark:text-white w-full"
                      aria-label="Search books"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleSearch}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 text-gray-600 dark:text-gray-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </li>
              </ul>
            )}
          </div>
          <Link to="/" className="text-2xl font-bold text-black dark:text-white">
            bookStore
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end space-x-3">
          <div className="hidden sm:block">
            <label className="px-3 py-2 border rounded-md flex items-center gap-2 bg-gray-200 dark:bg-slate-700">
              <input
                type="text"
                placeholder="Search for book"
                className="grow outline-none rounded-md px-1 bg-gray-200 dark:bg-slate-700 text-black dark:text-white w-24 sm:w-auto"
                aria-label="Search books"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 text-gray-600 dark:text-gray-300"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors hover:scale-105"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
            )}
          </button>
          {authUser ? (
            <Logout />
          ) : (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                className="btn bg-primary text-white hover:bg-secondary transition-colors hover:scale-105"
                onClick={() => document.getElementById('my_modal_3').showModal()}
                aria-label="Open login modal"
              >
                Login
              </button>
              <Link
                to="/signup"
                className="btn bg-secondary text-white hover:bg-primary transition-colors hover:scale-105"
                aria-label="Sign up"
              >
                Sign Up
              </Link>
              <Login />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;