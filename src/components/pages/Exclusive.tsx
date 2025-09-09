import { motion } from "framer-motion";
import { FaGift, FaStar, FaClock } from "react-icons/fa";

interface ExclusiveItem {
  name: string;
  description: string;
  icon: JSX.Element;
  available: string; // e.g., Limited, 24h, Exclusive
}

const exclusiveData: ExclusiveItem[] = [
  {
    name: "Premium Membership",
    description: "Get access to VIP deals, priority support, and exclusive content.",
    icon: <FaStar className="text-[#e35b25]" />,
    available: "Limited",
  },
  {
    name: "Early Access Cars",
    description: "Be the first to test drive and buy our latest car models.",
    icon: <FaClock className="text-[#e35b25]" />,
    available: "24h Access",
  },
  {
    name: "Gift Packages",
    description: "Exclusive gift packages for loyal customers with premium offers.",
    icon: <FaGift className="text-[#e35b25]" />,
    available: "Exclusive",
  },
];

const Exclusive: React.FC = () => {
  return (
    <section className="w-full bg-[#f6f7f9] py-28 px-10">
      {/* Title with animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold text-[#171b25] mb-4">
          Exclusive Offers
        </h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          Discover our limited edition and VIP offers designed just for you.
        </motion.p>
      </motion.div>

      {/* Exclusive cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {exclusiveData.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <div className="flex items-center mb-4 text-4xl">{item.icon}</div>
            <h3 className="text-2xl font-semibold text-[#171b25] mb-2">
              {item.name}
            </h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-[#e35b25] font-semibold">{item.available}</span>
              <button className="bg-[#e35b25] text-white px-4 py-2 rounded-md hover:bg-[#d14c1d] transition">
                See More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Exclusive;
