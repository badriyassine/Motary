import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaShoppingCart,
  FaCar,
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  getCars,
  addCar,
  updateCar,
  deleteCar,
  Car as ApiCar,
  getOrders,
  Order as ApiOrder,
} from "../../api/api";

interface Car extends ApiCar {
  gearbox?: string;
  doors?: number;
  fullOptions?: boolean;
  inStock?: boolean;
  condition?: "New" | "Old";
  type?: string;
  fuel?: "Diesel" | "Petrol" | "Electric";
  year?: number;
}

const fuelOptions = ["Diesel", "Petrol", "Electric"];
const conditionOptions = ["New", "Old"];
const typeOptions = ["SUV", "Sport", "Sedan", "Economic", "Luxury", "Electric"];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [stats, setStats] = useState({
    totalCars: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    gearbox: "",
    doors: "",
    fullOptions: false,
    condition: "New",
    type: "SUV",
    fuel: "Petrol",
    year: "",
    images: [] as File[],
    inStock: true,
  });
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchCars = async () => {
    try {
      const res = await getCars();
      setCars(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch cars");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders");
    }
  };

  const calculateStats = () => {
    const totalCars = cars.length;
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(
      (order) => order.status === "pending"
    ).length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    setStats({
      totalCars,
      totalOrders,
      pendingOrders,
      totalRevenue,
    });
  };

  useEffect(() => {
    fetchCars();
    fetchOrders();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [cars, orders]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, fullOptions: e.target.checked });
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 6); // max 6 images
      setForm({ ...form, images: files });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price ? String(Number(form.price)) : "");
    formData.append("gearbox", form.gearbox);
    formData.append("doors", form.doors ? String(Number(form.doors)) : "");
    formData.append("fullOptions", form.fullOptions ? "true" : "false");
    formData.append("condition", form.condition);
    formData.append("type", form.type);
    formData.append("fuel", form.fuel);
    formData.append("year", form.year ? String(Number(form.year)) : "");
    formData.append("inStock", form.inStock ? "true" : "false");
    form.images.forEach((file) => formData.append("images", file));

    try {
      if (editingCarId) {
        await updateCar(editingCarId, formData);
        alert("Car updated!");
      } else {
        await addCar(formData);
        alert("Car added!");
      }
      setForm({
        name: "",
        description: "",
        price: "",
        gearbox: "",
        doors: "",
        fullOptions: false,
        inStock: true,
        condition: "New",
        type: "SUV",
        fuel: "Petrol",
        year: "",
        images: [],
      });
      setEditingCarId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchCars();
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to save car");
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCarId(car._id);
    setForm({
      name: car.name,
      description: car.description,
      price: car.price?.toString() || "",
      gearbox: car.gearbox || "",
      doors: car.doors?.toString() || "",
      fullOptions: car.fullOptions || false,
      inStock: car.inStock ?? true,
      condition: car.condition || "New",
      type: car.type || "SUV",
      fuel: car.fuel || "Petrol",
      year: car.year?.toString() || "",
      images: [],
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar(id);
        fetchCars();
        fetchOrders();
      } catch (err) {
        console.error(err);
        alert("Failed to delete car");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <section className="w-full bg-[#f6f7f9] py-12 sm:py-16 px-4 sm:px-6 lg:px-10 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#171b25]">
            Admin Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Total Cars
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#171b25]">
                  {stats.totalCars}
                </p>
              </div>
              <FaCar className="text-2xl sm:text-3xl text-[#e35b25]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#171b25]">
                  {stats.totalOrders}
                </p>
              </div>
              <FaShoppingCart className="text-2xl sm:text-3xl text-[#e35b25]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Pending Orders
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#171b25]">
                  {stats.pendingOrders}
                </p>
              </div>
              <FaChartBar className="text-2xl sm:text-3xl text-yellow-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#171b25]">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <FaUsers className="text-2xl sm:text-3xl text-green-500" />
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8 sm:mb-10"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-[#171b25] mb-3 sm:mb-4">
            Quick Actions
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/dashboard/orders"
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#e35b25] text-white rounded-lg hover:bg-[#d14c1d] transition text-sm sm:text-base"
            >
              <FaShoppingCart />
              Manage Orders
            </Link>
            <button
              onClick={() => {
                const formElement = document.getElementById("car-form");
                if (formElement) {
                  formElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
            >
              <FaCar />
              Add New Car
            </button>
          </div>
        </motion.div>

        {/* Car Form */}
        <motion.div
          id="car-form"
          className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-8 sm:mb-10"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4 text-center">
            {editingCarId ? "Edit Car" : "Add New Car"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Car Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base"
              id="car-name"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
              className="border px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base"
              id="car-description"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-md"
              id="car-price"
            />
            <input
              type="text"
              name="gearbox"
              placeholder="Gearbox"
              value={form.gearbox}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md"
              id="car-gearbox"
            />
            <input
              type="number"
              name="doors"
              placeholder="Doors"
              value={form.doors}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md"
              id="car-doors"
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md"
              id="car-year"
            />

            <select
              name="fuel"
              value={form.fuel}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md"
              id="car-fuel"
            >
              {fuelOptions.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md"
              id="car-condition"
            >
              {conditionOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md"
              id="car-type"
            >
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <label
              className="flex items-center gap-2"
              htmlFor="car-fullOptions"
            >
              <input
                type="checkbox"
                checked={form.fullOptions}
                onChange={handleCheckbox}
                id="car-fullOptions"
              />{" "}
              Full Options
            </label>
            <input
              type="file"
              multiple
              onChange={handleFiles}
              className="border px-4 py-2 rounded-md"
              ref={fileInputRef}
              id="car-images"
            />
            <label className="flex items-center gap-2" htmlFor="car-inStock">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) =>
                  setForm({ ...form, inStock: e.target.checked })
                }
                id="car-inStock"
              />
              In Stock
            </label>

            <button
              type="submit"
              className="col-span-full bg-[#e35b25] text-white px-4 sm:px-6 py-2 rounded-md hover:bg-[#d14c1d] transition text-sm sm:text-base"
            >
              {editingCarId ? "Update Car" : "Add Car"}
            </button>
          </form>
        </motion.div>

        {/* Cars Table */}
        <motion.div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4 text-center">
            Cars List
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-white rounded-xl shadow-lg text-center text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#171b25] text-white">
                  <th className="hidden sm:table-cell">ID</th>
                  <th>Name</th>
                  <th className="hidden lg:table-cell">Description</th>
                  <th>Price</th>
                  <th>Gearbox</th>
                  <th>Doors</th>
                  <th className="hidden md:table-cell">Year</th>
                  <th className="hidden lg:table-cell">Fuel</th>
                  <th className="hidden lg:table-cell">Condition</th>
                  <th className="hidden sm:table-cell">Type</th>
                  <th className="hidden lg:table-cell">Full Options</th>
                  <th className="hidden md:table-cell">In Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car._id} className="border-b">
                    <td className="hidden sm:table-cell">{car._id}</td>
                    <td className="font-medium">{car.name}</td>
                    <td className="hidden lg:table-cell max-w-xs">
                      <div className="truncate" title={car.description}>
                        {car.description}
                      </div>
                    </td>
                    <td className="font-bold text-[#e35b25]">${car.price}</td>
                    <td>{car.gearbox || "-"}</td>
                    <td>{car.doors || "-"}</td>
                    <td className="hidden md:table-cell">{car.year}</td>
                    <td className="hidden lg:table-cell">{car.fuel}</td>
                    <td className="hidden lg:table-cell">{car.condition}</td>
                    <td className="hidden sm:table-cell">{car.type}</td>
                    <td className="hidden lg:table-cell">
                      {car.fullOptions ? "Yes" : "No"}
                    </td>
                    <td className="hidden md:table-cell">
                      {car.inStock ? "Yes" : "No"}
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(car)}
                          className="text-blue-500 hover:text-blue-700 p-1"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(car._id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AdminDashboard;
