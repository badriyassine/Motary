import React, { useRef } from "react";
import Intro from "./HomeSections/Intro";
import About from "./HomeSections/About";
import Brands from "./HomeSections/Brands";
import Gallery from "./HomeSections/Gallary";
import OurStores from "./HomeSections/OurStores";

const Home: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Intro onDiscoverMore={scrollToAbout} />
      <About ref={aboutRef} />
      <Brands />
      <Gallery />
      <OurStores />
    </div>
  );
};

export default Home;


