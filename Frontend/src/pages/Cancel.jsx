import React from 'react';
import { Link } from 'react-router-dom';

function Cancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Cancelled!</h1>
      <p className="text-lg text-center mb-8">Your payment was not completed. Please try again.</p>
      <Link to="/allbooks" className="btn bg-primary text-white hover:bg-secondary transition-colors">Browse Books</Link>
    </div>
  );
}

export default Cancel;