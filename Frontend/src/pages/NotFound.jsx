import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">404 - Page Not Found</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Sorry, the page you are looking for does not exist.
            </p>
            <Link
              to="/"
              className="btn bg-primary text-white hover:bg-secondary transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default NotFound;