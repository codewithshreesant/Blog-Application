import React, { useState, useEffect } from 'react';

const BlogSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, [slides]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };       

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg my-20">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative h-[400px]" 
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-8">
              <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg">{slide.description}</p>
              <a
                href={slide.link}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default BlogSlider;