import { motion } from "framer-motion";

const brands = [
  { name: "Toyota", logo: "/brands/toyota.svg" },
  { name: "BMW", logo: "/brands/bmw.svg" },
  { name: "Mercedes", logo: "/brands/mercedes.svg" },
  { name: "Audi", logo: "/brands/audi.svg" },
  { name: "Nissan", logo: "/brands/nissan.svg" },
  { name: "Kia", logo: "/brands/kia.svg" },
];

// Duplicate the array to make infinite loop smooth
const logos = [...brands, ...brands, ...brands];

export default function Brands() {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
        Trusted by Leading Car Brands
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-12"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20, // speed (lower = faster)
          }}
        >
          {logos.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-white rounded-2xl shadow-md p-6 min-w-[150px]"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
