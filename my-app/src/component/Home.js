import React from 'react';
import Products from './Products';

const Home = () => {
  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <img
          src='desktop-banner-1.webp'
          alt='Banner'
          className="w-full h-auto object-cover rounded-lg" // Ensures the image covers the area responsively
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[white] shadow-lg m-2 font-ovo">JT</h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-[white] shadow-lg m-2 font-ovo">Jiyaji Tailor</h2>
          <button className='text-xl md:text-2xl lg:text-3xl text-[white] m-2 p-3 rounded-lg border border-[white] bg-transparent hover:bg-white hover:text-black transition duration-300'>
            Shop Now
          </button>
        </div>
      </div>
      <Products />
    </div>
  );
}

export default Home;
