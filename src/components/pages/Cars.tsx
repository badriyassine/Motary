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
  FaSearch,
  FaFilter,
  FaShoppingCart,
} from "react-icons/fa";
import { getCars, searchCars, createOrder, Car as ApiCar } from "../../api/api";
import toast from "react-hot-toast";

interface Car extends ApiCar {
  gearbox?: string;
  doors?: number;
  fullOptions?: boolean;
  condition?: "New" | "Old";
  type?: ApiCar["type"];
  fuel?: "Diesel" | "Petrol" | "Electric";
  year?: number;
}

const BASE_IMAGE_URL = "http://localhost:5000"; // Backend URL

const conditionIcons = {
  New: <FaCheckCircle className="text-green-500 inline mr-2" />,
  Old: <FaExclamationCircle className="text-yellow-500 inline mr-2" />,
};

const typeIcons: Record<string, React.ReactNode> = {
  SUV: <FaCarSide />,
  Sport: <FaRoad />,
  Sedan: <FaCar />,
  Economic: <FaCar />,
  Luxury: <FaStar />,
  Electric: <FaCar />,
};

const fuelIcons: Record<string, React.ReactNode> = {
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
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [orderCar, setOrderCar] = useState<Car | null>(null);
  const [activeImages, setActiveImages] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [bigImageIndex, setBigImageIndex] = useState<number>(0);
  const [showBigImage, setShowBigImage] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    year: "",
    fuel: "",
    condition: "",
    inStock: true,
  });
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [orderForm, setOrderForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [discussPrice, setDiscussPrice] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const res = await getCars();
        setCars(res.data);
        setFilteredCars(res.data);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
        toast.error("Failed to fetch cars");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cars, activeCategory, searchTerm, filters]);

  const applyFilters = async () => {
    try {
      let filtered = cars;

      // Apply category filter
      if (activeCategory !== "All") {
        filtered = filtered.filter((car) => car.type === activeCategory);
      }

      // Apply search term
      if (searchTerm) {
        filtered = filtered.filter(
          (car) =>
            car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply other filters
      if (filters.minPrice) {
        filtered = filtered.filter(
          (car) => car.price >= Number(filters.minPrice)
        );
      }
      if (filters.maxPrice) {
        filtered = filtered.filter(
          (car) => car.price <= Number(filters.maxPrice)
        );
      }
      if (filters.year) {
        filtered = filtered.filter((car) => car.year === Number(filters.year));
      }
      if (filters.fuel) {
        filtered = filtered.filter((car) => car.fuel === filters.fuel);
      }
      if (filters.condition) {
        filtered = filtered.filter(
          (car) => car.condition === filters.condition
        );
      }
      if (filters.inStock !== undefined) {
        filtered = filtered.filter((car) => car.inStock === filters.inStock);
      }

      setFilteredCars(filtered);
    } catch (err) {
      console.error("Failed to apply filters:", err);
    }
  };

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

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderCar) return;

    // Validate terms acceptance
    if (!acceptTerms) {
      toast.error("Please accept the Terms and Conditions to continue");
      return;
    }

    try {
      setLoading(true);
      await createOrder({
        carId: orderCar._id,
        buyerInfo: orderForm,
      });
      toast.success("Order placed successfully! We'll contact you soon.");
      setShowOrderModal(false);
      setOrderCar(null);
      setOrderForm({ firstName: "", lastName: "", phone: "", email: "" });
      setDiscussPrice(false);
      setAcceptTerms(false);
    } catch (err: any) {
      console.error("Failed to create order:", err);
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (car: Car, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Prevent event bubbling
    setOrderCar(car); // Use separate state for order modal
    setShowOrderModal(true);
    // Reset form and checkboxes when opening modal
    setOrderForm({ firstName: "", lastName: "", phone: "", email: "" });
    setDiscussPrice(false);
    setAcceptTerms(false);
  };

  const clearFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      year: "",
      fuel: "",
      condition: "",
      inStock: true,
    });
    setSearchTerm("");
    setActiveCategory("All");
  };

  return (
    <section className="w-full bg-[#f6f7f9] py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171b25] mb-2">
          Our Cars Collection
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4">
          Explore our exclusive range of cars – find your dream ride today.
        </p>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
              <input
                type="text"
                placeholder="Search cars by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e35b25] focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm sm:text-base"
            >
              <FaFilter />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button
              onClick={clearFilters}
              className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition text-sm sm:text-base"
            >
              Clear All
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-4 sm:mb-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
                    placeholder="100000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    value={filters.year}
                    onChange={(e) =>
                      setFilters({ ...filters, year: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
                    placeholder="2023"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <select
                    value={filters.fuel}
                    onChange={(e) =>
                      setFilters({ ...filters, fuel: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
                  >
                    <option value="">All Fuel Types</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    value={filters.condition}
                    onChange={(e) =>
                      setFilters({ ...filters, condition: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
                  >
                    <option value="">All Conditions</option>
                    <option value="New">New</option>
                    <option value="Old">Old</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) =>
                        setFilters({ ...filters, inStock: e.target.checked })
                      }
                      className="rounded border-gray-300 text-[#e35b25] focus:ring-[#e35b25]"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      In Stock Only
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-4 py-2 rounded-full border transition text-xs sm:text-sm ${
                  activeCategory === cat
                    ? "bg-[#e35b25] text-white border-[#e35b25]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-[#e35b25] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#e35b25]"></div>
          <p className="mt-4 text-gray-600">Loading cars...</p>
        </div>
      ) : filteredCars.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🚗</div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            No cars found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
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

                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#171b25] mb-2">
                    {car.name}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {shortDescription}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedCar(car);
                      }}
                      className="text-[#e35b25] ml-2 hover:text-[#d14c1d] transition text-xs sm:text-sm"
                    >
                      See More
                    </button>
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm mb-4">
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
                        <FaStar />{" "}
                        {car.fullOptions ? "Full Options" : "Standard"}
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

                  <div className="mt-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={(e) => handleBuyNow(car, e)}
                      className="bg-[#e35b25] text-white px-3 sm:px-4 py-2 rounded-md hover:bg-[#d14c1d] transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                    >
                      <FaShoppingCart />
                      Buy Now
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedCar(car);
                      }}
                      className="border border-[#e35b25] text-[#e35b25] px-3 sm:px-4 py-2 rounded-md hover:bg-[#e35b25] hover:text-white transition text-xs sm:text-sm"
                    >
                      See More
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <motion.div
            className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 max-w-3xl w-full relative flex flex-col gap-4 sm:gap-6 max-h-[90vh] overflow-y-auto"
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
                  <FaStar />{" "}
                  {selectedCar.fullOptions ? "Full Options" : "Standard"}
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

      {/* Order Modal */}
      {showOrderModal && orderCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <motion.div
            className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#171b25]">
                Place Order
              </h3>
              <button
                onClick={() => {
                  setShowOrderModal(false);
                  setOrderCar(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">{orderCar.name}</h4>
              <p className="text-2xl font-bold text-[#e35b25]">
                ${orderCar.price.toLocaleString()}
              </p>
            </div>

            {/* Warning Message */}
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="text-yellow-600 text-sm">⚠️</div>
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Please verify your information
                  carefully. You won't be able to modify your order details
                  after submission.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleOrderSubmit}
              className="space-y-3 sm:space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderForm.firstName}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, firstName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderForm.lastName}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, lastName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={orderForm.phone}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={orderForm.email}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-3 sm:pt-4">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="discussPrice"
                    checked={discussPrice}
                    onChange={(e) => setDiscussPrice(e.target.checked)}
                    className="mt-1 h-4 w-4 text-[#e35b25] focus:ring-[#e35b25] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="discussPrice"
                    className="text-sm text-gray-700"
                  >
                    I would like to discuss the price with a sales
                    representative
                  </label>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-[#e35b25] focus:ring-[#e35b25] border-gray-300 rounded"
                    required
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm text-gray-700"
                  >
                    I have read and agree to the{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#e35b25] hover:underline font-medium"
                    >
                      Terms and Conditions
                    </a>{" "}
                    *
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowOrderModal(false);
                    setOrderCar(null);
                    setOrderForm({
                      firstName: "",
                      lastName: "",
                      phone: "",
                      email: "",
                    });
                    setDiscussPrice(false);
                    setAcceptTerms(false);
                  }}
                  className="flex-1 px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-3 sm:px-4 py-2 bg-[#e35b25] text-white rounded-md hover:bg-[#d14c1d] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Cars;
