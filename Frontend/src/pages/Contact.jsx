import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    toast.success('Message sent successfully!');
    // In a real application, you would send this data to your backend API
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>Contact bookStore - Get in Touch</title>
        <meta name="description" content="Contact bookStore for support, inquiries, or feedback." />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-green-500 to-teal-600 text-white py-20 px-4 md:px-20 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'url(https://source.unsplash.com/random/1600x900/?contact,support)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-extrabold mb-4 leading-tight">We'd Love to Hear From You</h1>
              <p className="text-xl mb-8 opacity-90">Whether you have a question, feedback, or just want to say hello, our team is ready to assist you.</p>
            </div>
          </section>

          <section className="py-16 px-4 md:px-20 bg-white dark:bg-slate-800">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-gray-50 dark:bg-slate-700 p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-primary dark:text-secondary">Send Us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-slate-600 dark:border-gray-600 dark:text-white"
                      {...register('name', { required: 'Name is required' })}
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && (
                      <span className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name.message}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-slate-600 dark:border-gray-600 dark:text-white"
                      {...register('email', { required: 'Email is required', pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i })}
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                      <span className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email.message || 'Invalid email address'}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <textarea
                      id="message"
                      rows="5"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-slate-600 dark:border-gray-600 dark:text-white"
                      {...register('message', { required: 'Message is required' })}
                      aria-invalid={errors.message ? 'true' : 'false'}
                    ></textarea>
                    {errors.message && (
                      <span className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.message.message}</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 dark:bg-slate-700 p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-primary dark:text-secondary">Our Contact Information</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg">
                  <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> info@bookstore.com</p>
                  <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> +1 (123) 456-7890</p>
                  <p className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> 123 Bookworm Lane, Reading City, RW 98765</p>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-4 text-primary dark:text-secondary">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.812c-3.233 0-4.188 2.256-4.188 4.5v2.5z"/></svg></a>
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.234 7.414l-5.435 5.436-3.202-3.202c-.292-.292-.766-.292-1.058 0s-.292.766 0 1.058l3.732 3.732c.146.146.338.219.53.219s.384-.073.53-.219l5.965-5.966c.292-.292.292-.766 0-1.058s-.766-.292-1.058 0z"/></svg></a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Contact;