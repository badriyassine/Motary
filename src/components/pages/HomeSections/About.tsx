import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import CarIcon from "../../../assets/icons/icons8-car-64.png";
import TrustIcon from "../../../assets/icons/icons8-trust-64.png";
import EasyIcon from "../../../assets/icons/icons8-easy-50.png";

interface Feature {
  title: string;
  description: string;
  image: string;
}

const About = forwardRef<HTMLElement>((props, ref) => {
  const features: Feature[] = [
    {
      title: "Fast & Effortless",
      description:
        "Quickly find your dream car with an effortless, fast experience.",
      image: CarIcon,
    },
    {
      title: "Trusted Seller",
      description:
        "Buy with confidence knowing every car comes directly from a trusted source — me.",
      image: TrustIcon,
    },
    {
      title: "Easy-to-Use",
      description:
        "Easy-to-use interface for simple browsing, listing, and buying.",
      image: EasyIcon,
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, duration: 0.8 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      ref={ref}
      className="w-full bg-[#f6f7f9] py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-12 lg:px-20"
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-12 sm:mb-16"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171b25] mb-4"
          variants={item}
        >
          About Motary
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto"
          variants={item}
        >
          Motary is your modern car marketplace designed for speed, trust, and
          simplicity. Discover why so many choose us for their next car.
        </motion.p>
      </motion.div>

      {/* Features */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl p-6 sm:p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            variants={item}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="h-16 sm:h-20 w-16 sm:w-20 mb-4 sm:mb-6"
            />
            <h3 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-3 sm:mb-4">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});

export default About;
