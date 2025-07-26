import React from 'react';
import { Link } from 'react-router-dom';

function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-lg text-center mb-8">Thank you for your purchase. Your book is now available.</p>
      <Link to="/dashboard" className="btn bg-primary text-white hover:bg-secondary transition-colors">Go to Dashboard</Link>
    </div>
  );
}

export default Success;