import React from "react";
import { motion } from "framer-motion";
import CarIcon from "../../../assets/icons/icons8-car-64.png";
import TrustIcon from "../../../assets/icons/icons8-trust-64.png";
import EasyIcon from "../../../assets/icons/icons8-easy-50.png";

export default function About() {
  const features = [
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
    <section className="w-full bg-[#f6f7f9] py-28 px-20">
      {/* Section title */}
      <motion.div
        className="text-center mb-16"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-5xl font-bold text-[#171b25] mb-4"
          variants={item}
        >
          About Motary
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 max-w-2xl mx-auto"
          variants={item}
        >
          Motary is your modern car marketplace designed for speed, trust, and
          simplicity. Discover why so many choose us for their next car.
        </motion.p>
      </motion.div>

      {/* Features */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            variants={item}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="h-20 w-20 mb-6"
            />
            <h3 className="text-2xl font-semibold text-[#171b25] mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
