import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar.jsx';
import Banner from '../components/Banner.jsx';
import BookList from '../components/BookList.jsx';
import Freebook from '../components/Freebook.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Helmet>
        <title>BookStore - Learn Something New Everyday</title>
        <meta name="description" content="Explore free courses and books to boost your skills." />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
        <Navbar />
        <main className="flex-1">
          <Banner />
          <Freebook />
          <section className="py-12 px-4 md:px-20 text-center">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">Explore More Books</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Discover a wide variety of books across different categories.</p>
            <Link to="/allbooks" className="btn bg-primary text-white hover:bg-secondary transition-colors hover:scale-105 px-8 py-3 rounded-md text-lg">
              View All Books
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;