import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
  const images = [
    'one.jpg',
    'two.jpg',
    'three.jpg',
    'four.jpg',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto my-10 overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-80">
        <img
          src={process.env.PUBLIC_URL + '/' + images[currentIndex]}
          alt={`Gallery ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
        />
      </div>
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow-md transition-colors duration-300"
      >
        &#9664;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow-md transition-colors duration-300"
      >
        &#9654;
      </button>
    </div>
  );
};

export default ImageGallery;
