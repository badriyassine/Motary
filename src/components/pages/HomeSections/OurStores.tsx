import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

interface Store {
  name: string;
  address: string;
  phone: string;
  email: string;
  img: string;
}

const stores: Store[] = [
  {
    name: "Motary Tanger",
    address: "123 Main Street, City Center",
    phone: "+212 600 000 000",
    email: "tanger@motary.com",
    img: "/src/assets/stores/tanger.png",
  },
  {
    name: "Motary Rabat",
    address: "456 High Street, Rabat",
    phone: "+212 601 111 111",
    email: "rabat@motary.com",
    img: "/src/assets/stores/rabat.png",
  },
  {
    name: "Motary Casablanca",
    address: "789 Suburb Road, Suburbia",
    phone: "+212 602 222 222",
    email: "casablanca@motary.com",
    img: "/src/assets/stores/casa.png",
  },
  {
    name: "Motary Marrakesh",
    address: "789 Suburb Road, Marrakesh",
    phone: "+212 602 222 222",
    email: "marrakesh@motary.com",
    img: "/src/assets/stores/merrakch.png",
  },
  {
    name: "Motary Agadir",
    address: "789 Suburb Road, Agadir",
    phone: "+212 602 222 222",
    email: "agadir@motary.com",
    img: "/src/assets/stores/agadir.png",
  },
  {
    name: "Motary Laayoune",
    address: "789 Suburb Road, Laayoune",
    phone: "+212 602 222 222",
    email: "laayoune@motary.com",
    img: "/src/assets/stores/laayoun.png",
  },
];

const OurStores: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Our Stores
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Visit our locations across the city to experience our wide range of
            cars and exclusive services.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center"
        >
          {stores.map((store, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm mx-auto"
            >
              <img
                src={store.img}
                alt={store.name}
                className="w-full h-48 sm:h-56 lg:h-64 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
                  {store.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-2 text-[#e35b25] flex-shrink-0" />
                  <span className="truncate">{store.address}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center mb-2">
                  <FaPhoneAlt className="mr-2 text-[#e35b25] flex-shrink-0" />
                  <span className="truncate">{store.phone}</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                  <FaEnvelope className="mr-2 text-[#e35b25] flex-shrink-0" />
                  <span className="truncate">{store.email}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurStores;
