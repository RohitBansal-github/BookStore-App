import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function About() {
  return (
    <>
      <Helmet>
        <title>About bookStore - Our Mission & Values</title>
        <meta name="description" content="Learn more about bookStore, our mission to make knowledge accessible, and our core values." />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4 md:px-20 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'url(https://source.unsplash.com/random/1600x900/?books,library)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-extrabold mb-4 leading-tight">Empowering Minds Through Knowledge</h1>
              <p className="text-xl mb-8 opacity-90">At bookStore, we believe that access to education and literature should be universal. We are committed to building a platform where knowledge knows no bounds.</p>
              <a href="/allbooks" className="btn bg-white text-blue-600 hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105 px-8 py-3 rounded-full text-lg font-semibold shadow-lg">Explore Books</a>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16 px-4 md:px-20 bg-white dark:bg-slate-800">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-primary dark:text-secondary">Our Mission</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our mission is to democratize access to books and educational resources globally. We strive to create an inclusive digital library that caters to diverse interests and learning needs, fostering a community of lifelong learners.
                </p>
              </div>
              <div className="flex justify-center">
                <img src="https://source.unsplash.com/random/600x400/?reading,education" alt="Our Mission" className="rounded-lg shadow-xl w-full max-w-md" />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 px-4 md:px-20 bg-gray-100 dark:bg-slate-900">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-12 text-black dark:text-white">Our Core Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-primary dark:text-secondary">Accessibility</h3>
                  <p className="text-gray-700 dark:text-gray-300">Ensuring everyone, everywhere, has the opportunity to learn and grow.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-primary dark:text-secondary">Quality</h3>
                  <p className="text-gray-700 dark:text-gray-300">Providing high-quality, curated content that enriches and inspires.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-semibold mb-4 text-primary dark:text-secondary">Community</h3>
                  <p className="text-gray-700 dark:text-gray-300">Building a supportive network for readers and educators alike.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 px-4 md:px-20 bg-blue-600 text-white text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
              <p className="text-xl mb-8 opacity-90">Be a part of our mission to spread knowledge. Connect with us today!</p>
              <a href="/contact" className="btn bg-white text-blue-600 hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105 px-8 py-3 rounded-full text-lg font-semibold shadow-lg">Get in Touch</a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default About;