import React from "react";
import video from "../video/volt_bike.mp4";

const Banner = () => {
  return (
    <section className="relative min-h-[calc(100vh-99.33px)] w-full overflow-hidden flex items-center justify-center">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video}
        autoPlay
        l
        loop
        muted
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-white text-center text-4xl md:text-6xl font-bold tracking-wider
          drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]
          bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent
          px-8 py-4 border-b-2 border-[#56aa9e] animate-fadeIn">
          Volt Bike Rental
        </h1>
        <p className="text-white text-xl md:text-2xl mt-4 font-light tracking-wide max-w-lg text-center px-6">
          Experience Valencia on two wheels
        </p>
      </div>
    </section>
  );
};

export default Banner;