import React from "react";
import { motion } from "framer-motion";
import Car1 from "../../../assets/Gallary/Bmw.jpg";
import Car2 from "../../../assets/Gallary/Fiat.jpg";
import Car3 from "../../../assets/Gallary/Hyundai.jpg";
import Car4 from "../../../assets/Gallary/Kia.jpg";
import Car5 from "../../../assets/Gallary/Benz.jpg";
import Car6 from "../../../assets/Gallary/Toyota.jpg";

export default function Gallery() {
  const cars = [
    { img: Car1, name: "BMW X5", desc: "Luxury SUV" },
    { img: Car2, name: "Fiat 500 Abarth", desc: "Compact Car" },
    { img: Car3, name: "Hyundai Tucson", desc: "Stylish Crossover" },
    { img: Car4, name: "Kia Sportage", desc: "Modern SUV" },
    { img: Car5, name: "Mercedes-Benz A-Class", desc: "Premium Hatchback" },
    { img: Car6, name: "Toyota Corolla", desc: "Reliable Sedan" },
  ];

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="w-full bg-[#f6f7f9] py-20">
      {/* Section title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl font-bold text-[#171b25]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Discover Our Collection
        </motion.h2>
        <motion.p
          className="text-gray-600 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Browse our modern and stylish car selection
        </motion.p>
      </motion.div>

      {/* Gallery grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {cars.map((car, idx) => (
          <motion.div
            key={idx}
            className="relative overflow-hidden rounded-[5px] cursor-pointer group shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            variants={itemVariants}
          >
            <img
              src={car.img}
              alt={car.name}
              loading="lazy"
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 rounded-[5px]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300">
              <h3 className="text-xl font-bold">{car.name}</h3>
              <p className="mt-2 text-sm">{car.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

