import React, { useEffect, useState } from "react";
import Background from "../../../assets/intro/THE WIND IS.png";

interface IntroProps {
  onDiscoverMore: () => void;
}

export default function Intro({ onDiscoverMore }: IntroProps): JSX.Element {
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section
      className="w-full h-[89.2vh] bg-cover bg-center flex items-start pt-36"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="max-w-lg ml-52 text-left text-white space-y-6">
        <h1
          className={`text-6xl font-bold transition-all duration-1000 ease-out transform ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          Find Your Dream Car
        </h1>

        <p
          className={`text-xl transition-all duration-1000 ease-out delay-200 transform ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          Motary is a modern car marketplace built for speed, trust, and
          simplicity — where buying your car feels effortless and secure. Browse
          exclusive collections, get expert support, and find the perfect car
          that suits your style and needs.
        </p>

        <button
          onClick={onDiscoverMore}
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
