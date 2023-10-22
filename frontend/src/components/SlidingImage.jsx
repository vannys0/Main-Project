import React, { useState } from "react";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider">
      <button onClick={prevSlide} className="prev-button">
        Previous
      </button>
      <img src={images[currentIndex]} alt="Slider" className="slider-image" />
      <button onClick={nextSlide} className="next-button">
        Next
      </button>
    </div>
  );
};

const App = () => {
  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    // Add more image URLs here
  ];

  return (
    <div className="app">
      <h1>Image Slider</h1>
      <Slider images={images} />
    </div>
  );
};

export default App;
