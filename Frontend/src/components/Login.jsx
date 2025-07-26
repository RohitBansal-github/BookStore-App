import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthProvider.jsx';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login({ isOpen, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setAuthUser(result);
        toast.success('Login successful!');
        document.getElementById('my_modal_3').close();
        if (result.user.role === 'admin') {
          navigate('/dashboard'); // Assuming dashboard handles admin view
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error('Login error:', error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal" open={isOpen}>
      <div className="modal-box bg-white dark:bg-slate-800 text-black dark:text-white">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Login</h3>
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
            Login
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default Login;