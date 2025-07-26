// src/pages/BookList.jsx
import React from "react";
import Cards from "../components/Cards";

const books = [
  {
    name: "Atomic Habits",
    title: "Build Good Habits & Break Bad Ones",
    price: 15.99,
    category: "Self-Help",
    image: "/Banner.png", // From public folder
  },
  {
    name: "Deep Work",
    title: "Focused Success in a Distracted World",
    price: 18.5,
    category: "Productivity",
    image: "/deep-work.jpg",
  },
  // Add more books...
];

function BookList() {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {books.map((book, index) => (
        <Cards key={index} book={book} />
      ))}
    </div>
  );
}

export default BookList;

