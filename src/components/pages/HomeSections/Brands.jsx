import React from "react";
import { motion } from "framer-motion";
import Brand1 from "../../../assets/brands/vecteezy_bmw-brand-logo-symbol-black-design-germany-car-automobile_20502711.jpg";
import Brand2 from "../../../assets/brands/vecteezy_fiat-logo-brand-car-symbol-black-design-italian-automobile_20500229.jpg";
import Brand3 from "../../../assets/brands/vecteezy_hyundai-logo-brand-symbol-with-name-black-design-south_20500661.jpg";
import Brand4 from "../../../assets/brands/vecteezy_kia-brand-logo-car-symbol-black-design-south-korean_20500441.jpg";
import Brand5 from "../../../assets/brands/vecteezy_land-rover-brand-logo-car-symbol-black-design-british_20499554.jpg";
import Brand6 from "../../../assets/brands/vecteezy_mercedes-benz-brand-logo-symbol-black-with-name-design_20500798.jpg";
import Brand7 from "../../../assets/brands/vecteezy_opel-brand-logo-car-symbol-with-name-black-design-german_20499029.jpg";
import Brand8 from "../../../assets/brands/vecteezy_peugeot-brand-logo-car-symbol-black-design-french-automobile_20499892.jpg";
import Brand9 from "../../../assets/brands/vecteezy_renault-brand-logo-car-symbol-with-name-black-design-french_20500408.jpg";
import Brand10 from "../../../assets/brands/vecteezy_toyota-brand-logo-car-symbol-with-name-black-design-japan_20927378.jpg";
import Brand11 from "../../../assets/brands/vecteezy_volkswagen-brand-logo-car-symbol-with-name-black-design_20927569.jpg";

export default function Brands() {
  const brands = [
    Brand1, Brand2, Brand3, Brand4, Brand5, 
    Brand6, Brand7, Brand8, Brand9, Brand10, Brand11
  ];

  const allBrands = [...brands, ...brands];

  const container = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.8 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="w-full bg-white py-20 overflow-hidden">
      {/* Section title */}
      <motion.div
        className="text-center mb-12"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl font-bold text-[#171b25]"
          variants={item}
        >
          Our Trusted Brands
        </motion.h2>
        <motion.p className="text-gray-600 mt-2" variants={item}>
          We work with the most renowned car brands in the industry
        </motion.p>
      </motion.div>

      {/* Continuous scrolling logos */}
      <motion.div
        className="relative w-full overflow-hidden"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {allBrands.map((brand, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 px-10"
              variants={item}
            >
              <img
                src={brand}
                alt={`Brand ${idx + 1}`}
                className="h-20 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
