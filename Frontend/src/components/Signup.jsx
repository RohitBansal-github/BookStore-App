import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider.jsx';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setAuthUser(result.user);
        toast.success('Signup successful!');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        toast.error(result.message || 'Signup failed');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Signup error:', error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 text-black dark:text-white animate-fade-in">
      <div className="max-w-md w-full p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              {...register('fullname', { required: 'Full name is required' })}
              className="input input-bordered w-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white input-focus-glow"
            />
            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
              className="input input-bordered w-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white input-focus-glow"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              className="input input-bordered w-full bg-gray-100 dark:bg-slate-700 text-black dark:text-white input-focus-glow"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          
          <button
            type="submit"
            className="btn bg-primary text-white hover:bg-secondary w-full hover:scale-105 transition-transform animate-pulse-btn hover-glow"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-primary dark:text-secondary hover:underline hover:scale-105 transition-transform">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;