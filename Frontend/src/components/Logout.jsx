import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider.jsx';

function Logout() {
  const [, , , logout] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="btn bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}

export default Logout;