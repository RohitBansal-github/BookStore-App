import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Simulate API call
    fetch(`/api/courses/${id}`)
      .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch(() => toast.error('Failed to fetch course details'));
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-black dark:text-white py-12 px-4 md:px-20">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">{course.title}</h2>
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover rounded-md mb-6 dark:brightness-90"
          loading="lazy"
        />
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{course.description}</p>
        <button
          className="btn bg-primary text-white hover:bg-secondary transition-colors"
          onClick={() => toast.success('Enrolled in course!')}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}

export default CourseDetails;