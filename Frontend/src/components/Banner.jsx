import React from 'react';
import banner from '/Banner.png'; // Place image in src/assets/
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    toast.success(`Subscribed with ${data.email}`);
    // Add API call to handle email subscription
    navigate("/allbooks");
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 flex flex-col md:flex-row items-center gap-8 my-16 bg-gray-100 dark:bg-slate-800 text-black dark:text-white">
      <div className="w-full md:w-1/2 space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Welcome to a world where you{' '}
          <span className="text-primary dark:text-primary">learn something new everyday!</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          Boost your skills with top-notch resources, free eBooks, and tutorials built for passionate learners like you.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-2/3">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-200 dark:bg-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-colors"
              {...register('email', { required: 'Email is required' })}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="text-red-500 dark:text-red-400 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <button
            className="btn bg-primary text-white hover:bg-secondary dark:bg-primary dark:hover:bg-secondary w-full sm:w-1/3 transition-colors duration-300 ease-in-out transform hover:scale-105"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={banner}
          alt="Learning platform banner"
          className="w-[90%] md:w-[550px] md:h-[460px] object-contain dark:brightness-90"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Banner;