import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulate API call
    fetch('/api/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch(() => toast.error('Failed to fetch courses'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-black dark:text-white py-12 px-4 md:px-20">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-colors"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-md mb-4 dark:brightness-90"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{course.title}</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">{course.description}</p>
              <Link
                to={`/course/${course.id}`}
                className="text-primary dark:text-secondary hover:text-secondary dark:hover:text-primary transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;