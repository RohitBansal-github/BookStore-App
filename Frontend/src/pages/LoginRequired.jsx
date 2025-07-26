// import React from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Login from '../components/Login.jsx';

import Login from '../components/Login.jsx';

function LoginRequired() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-900 text-black dark:text-white p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Login Required</h1>
      <p className="text-lg text-center mb-8">
        Please log in to access this section. You can log in or sign up below.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="btn bg-primary text-white hover:bg-secondary transition-colors hover:scale-105 px-6 py-3 rounded-md text-lg"
        >
          Login
        </button>
        <Link
          to="/signup"
          className="btn bg-secondary text-white hover:bg-primary transition-colors hover:scale-105 px-6 py-3 rounded-md text-lg"
        >
          Sign Up
        </Link>
      </div>
      <Login isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
}

export default LoginRequired;
