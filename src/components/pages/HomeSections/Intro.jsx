import React, { useEffect, useState } from "react";
import Background from "../../../assets/intro/THE WIND IS.png"; // replace with your image path

export default function Intro() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Trigger animation on mount
  }, []);

  return (
    <section
      className="w-full h-[89.2vh] bg-cover bg-center flex items-start pt-36"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Left content */}
      <div className="max-w-lg ml-52 text-left text-white space-y-6">
        {/* Title */}
        <h1
          className={`text-6xl font-bold transition-all duration-1000 ease-out transform ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          Find Your Dream Car
        </h1>

        {/* Paragraph */}
        <p
          className={`text-xl transition-all duration-1000 ease-out delay-200 transform ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          Motary is a modern car marketplace built for speed, trust, and simplicity — where buying your car feels effortless and secure. Browse exclusive collections, get expert support, and find the perfect car that suits your style and needs.
        </p>

        {/* Button */}
        <button
          className={`bg-[#e35b25]/80 text-white px-6 py-3 text-lg font-medium transition-all duration-1000 ease-out delay-400 transform hover:bg-[#e35b25] ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          Discover More
        </button>
      </div>
    </section>
  );
}

