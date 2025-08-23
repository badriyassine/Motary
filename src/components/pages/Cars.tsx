import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaCogs,
  FaDoorOpen,
  FaStar,
  FaRoad,
  FaCarSide,
  FaGasPump,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaCar,
} from "react-icons/fa";
import { getCars, Car as ApiCar } from "../../api/api";

interface Car extends ApiCar {
  gearbox?: string;
  doors?: number;
  fullOptions?: boolean;
  condition?: "New" | "Old";
  type?: string;
  fuel?: "Diesel" | "Petrol" | "Electric";
  year?: number;
}

const BASE_IMAGE_URL = "http://localhost:5000"; // Backend URL

const conditionIcons = {
  New: <FaCheckCircle className="text-green-500 inline mr-2" />,
  Old: <FaExclamationCircle className="text-yellow-500 inline mr-2" />,
};

const typeIcons: Record<string, JSX.Element> = {
  SUV: <FaCarSide />,
  Sport: <FaRoad />,
  Sedan: <FaCar />,
  Economic: <FaCar />,
  Luxury: <FaStar />,
  Electric: <FaCar />,
};

const fuelIcons: Record<string, JSX.Element> = {
  Diesel: <FaGasPump />,
  Petrol: <FaGasPump />,
  Electric: <FaCar />,
};

const categories = [
  "All",
  "SUV",
  "Sport",
  "Sedan",
  "Economic",
  "Luxury",
  "Electric",
];

const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [activeImages, setActiveImages] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [bigImageIndex, setBigImageIndex] = useState<number>(0);
  const [showBigImage, setShowBigImage] = useState<boolean>(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await getCars();
        setCars(res.data);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      }
    };
    fetchCars();
  }, []);

  const filteredCars =
    activeCategory === "All"
      ? cars
      : cars.filter((car) => car.type === activeCategory);

  const handleNextImage = (idx: number, car: Car) => {
    setActiveImages((prev) => ({
      ...prev,
      [idx]:
        (prev[idx] || 0) + 1 >= (car.images?.length || 1)
          ? 0
          : (prev[idx] || 0) + 1,
    }));
  };

  const openBigImage = (index: number) => {
    setBigImageIndex(index);
    setShowBigImage(true);
  };

  const prevBigImage = () => {
    if (!selectedCar) return;
    setBigImageIndex((prev) =>
      prev === 0 ? (selectedCar.images?.length || 1) - 1 : prev - 1
    );
  };

  const nextBigImage = () => {
    if (!selectedCar) return;
    setBigImageIndex((prev) =>
      prev === (selectedCar.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full bg-[#f6f7f9] py-28 px-10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-5xl font-bold text-[#171b25] mb-2">
          Our Cars Collection
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          Explore our exclusive range of cars – find your dream ride today.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                activeCategory === cat
                  ? "bg-[#e35b25] text-white border-[#e35b25]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-[#e35b25] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCars.map((car, idx) => {
          const activeIndex = activeImages[idx] || 0;

          // --- Truncate description if long ---
          const maxLength = 100;
          const isLongDescription = car.description.length > maxLength;
          const shortDescription = isLongDescription
            ? car.description.slice(0, maxLength) + "..."
            : car.description;

          return (
            <motion.div
              key={car._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="relative">
                <img
                  src={
                    car.images?.[activeIndex]
                      ? `${BASE_IMAGE_URL}${car.images[activeIndex]}`
                      : ""
                  }
                  alt={car.name}
                  className="h-64 md:h-72 lg:h-80 w-full object-cover cursor-pointer"
                  onClick={() => handleNextImage(idx, car)}
                />
                <span className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                  {activeIndex + 1}/{car.images?.length || 1}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-semibold text-[#171b25] mb-2">
                  {car.name}
                </h3>

                <p className="text-gray-600 mb-4">
                  {shortDescription}
                  {isLongDescription && (
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="text-[#e35b25] ml-2 underline hover:text-[#d14c1d] transition"
                    >
                      See More
                    </button>
                  )}
                </p>

                <div className="flex flex-wrap gap-3 text-gray-700 text-sm mb-4">
                  {car.gearbox && (
                    <div className="flex items-center gap-1">
                      <FaCogs /> {car.gearbox}
                    </div>
                  )}
                  {car.fuel && (
                    <div className="flex items-center gap-1">
                      {fuelIcons[car.fuel]} {car.fuel}
                    </div>
                  )}
                  {car.doors !== undefined && (
                    <div className="flex items-center gap-1">
                      <FaDoorOpen /> {car.doors} Doors
                    </div>
                  )}
                  {car.type && (
                    <div className="flex items-center gap-1">
                      {typeIcons[car.type] || <FaCar />} {car.type}
                    </div>
                  )}
                  {car.year && (
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt /> {car.year}
                    </div>
                  )}
                  {car.fullOptions !== undefined && (
                    <div className="flex items-center gap-1">
                      <FaStar /> {car.fullOptions ? "Full Options" : "Standard"}
                    </div>
                  )}
                  {car.condition && (
                    <div className="flex items-center gap-1">
                      {conditionIcons[car.condition] || (
                        <FaCar className="inline mr-2" />
                      )}
                      {car.condition}
                    </div>
                  )}
                </div>

                <div className="mt-auto flex gap-3">
                  <button className="bg-[#e35b25] text-white px-4 py-2 rounded-md hover:bg-[#d14c1d] transition">
                    Buy Now
                  </button>
                  {isLongDescription && (
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="border border-[#e35b25] text-[#e35b25] px-4 py-2 rounded-md hover:bg-[#e35b25] hover:text-white transition"
                    >
                      See More
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl p-8 max-w-3xl w-full relative flex flex-col gap-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-3xl font-bold text-[#171b25] mb-2">
              {selectedCar.name}
            </h3>

            <div className="flex gap-2 overflow-x-auto mb-4">
              {selectedCar.images?.map((img, i) => (
                <img
                  key={i}
                  src={`${BASE_IMAGE_URL}${img}`}
                  alt={`${selectedCar.name}-${i}`}
                  className="h-24 w-auto object-cover rounded cursor-pointer border-2 border-transparent hover:border-[#e35b25]"
                  onClick={() => openBigImage(i)}
                />
              ))}
            </div>

            {showBigImage && (
              <div className="relative flex items-center justify-center">
                <button
                  onClick={() => setShowBigImage(false)}
                  className="absolute top-2 left-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                  <FaArrowLeft className="text-[#e35b25]" />
                </button>
                <img
                  src={
                    selectedCar.images?.[bigImageIndex]
                      ? `${BASE_IMAGE_URL}${selectedCar.images[bigImageIndex]}`
                      : ""
                  }
                  alt="big"
                  className="max-h-[500px] w-auto object-contain rounded"
                />
                <button
                  onClick={prevBigImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#e35b25] p-3 rounded-full hover:bg-orange-600 transition"
                >
                  <FaArrowLeft className="text-white" />
                </button>
                <button
                  onClick={nextBigImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#e35b25] p-3 rounded-full hover:bg-orange-600 transition"
                >
                  <FaArrowRight className="text-white" />
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-4 text-gray-700 text-sm">
              {selectedCar.gearbox && (
                <div className="flex items-center gap-1">
                  <FaCogs /> {selectedCar.gearbox}
                </div>
              )}
              {selectedCar.fuel && (
                <div className="flex items-center gap-1">
                  {fuelIcons[selectedCar.fuel]} {selectedCar.fuel}
                </div>
              )}
              {selectedCar.doors !== undefined && (
                <div className="flex items-center gap-1">
                  <FaDoorOpen /> {selectedCar.doors} Doors
                </div>
              )}
              {selectedCar.type && (
                <div className="flex items-center gap-1">
                  {typeIcons[selectedCar.type] || <FaCar />} {selectedCar.type}
                </div>
              )}
              {selectedCar.year && (
                <div className="flex items-center gap-1">
                  <FaCalendarAlt /> {selectedCar.year}
                </div>
              )}
              {selectedCar.fullOptions !== undefined && (
                <div className="flex items-center gap-1">
                  <FaStar /> {selectedCar.fullOptions ? "Full Options" : "Standard"}
                </div>
              )}
              {selectedCar.condition && (
                <div className="flex items-center gap-1">
                  {conditionIcons[selectedCar.condition] || (
                    <FaCar className="inline mr-2" />
                  )}
                  {selectedCar.condition}
                </div>
              )}
            </div>

            <p className="text-gray-700 mt-4">{selectedCar.description}</p>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Cars;

