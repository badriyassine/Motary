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
    img: "https://via.placeholder.com/400x250?text=Tanger+Store",
  },
  {
    name: "Motary Rabat",
    address: "456 High Street, Rabat",
    phone: "+212 601 111 111",
    email: "rabat@motary.com",
    img: "https://via.placeholder.com/400x250?text=Rabat+Store",
  },
  {
    name: "Motary Casablanca",
    address: "789 Suburb Road, Suburbia",
    phone: "+212 602 222 222",
    email: "casablanca@motary.com",
    img: "https://via.placeholder.com/400x250?text=Casablanca+Store",
  },
  {
    name: "Motary Marrakesh",
    address: "789 Suburb Road, Marrakesh",
    phone: "+212 602 222 222",
    email: "marrakesh@motary.com",
    img: "https://via.placeholder.com/400x250?text=Marrakesh+Store",
  },
      {
    name: "Motary Agadir",
    address: "789 Suburb Road, Agadir",
    phone: "+212 602 222 222",
    email: "agadir@motary.com",
    img: "https://via.placeholder.com/400x250?text=Agadir+Store",
  },
      {
    name: "Motary Laayoune",
    address: "789 Suburb Road, Laayoune",
    phone: "+212 602 222 222",
    email: "laayoune@motary.com",
    img: "https://via.placeholder.com/400x250?text=Laayoune+Store",
  },
  
];

const OurStores: React.FC = () => {
  return (
    <section className="py-16 bg-white pb-24">
      <div className="container mx-auto px-4 ">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Stores
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit our locations across the city to experience our wide range of cars and exclusive services.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 justify-center"
        >
          {stores.map((store, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-[400px] mx-auto md:mx-0"
            >
              <img
                src={store.img}
                alt={store.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {store.name}
                </h3>
                <p className="text-gray-600 flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-2 text-[#e35b25]" /> {store.address}
                </p>
                <p className="text-gray-600 flex items-center mb-2">
                  <FaPhoneAlt className="mr-2 text-[#e35b25]" /> {store.phone}
                </p>
                <p className="text-gray-600 flex items-center">
                  <FaEnvelope className="mr-2 text-[#e35b25]" /> {store.email}
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


