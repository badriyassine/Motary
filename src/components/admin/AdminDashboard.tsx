import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  getCars,
  addCar,
  updateCar,
  deleteCar,
  Car as ApiCar,
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
  const [cars, setCars] = useState<Car[]>([]);
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

  useEffect(() => {
    fetchCars();
  }, []);

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
      } catch (err) {
        console.error(err);
        alert("Failed to delete car");
      }
    }
  };

  return (
    <section className="w-full bg-[#f6f7f9] py-16 px-10 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-[#171b25] mb-8 text-center">
          Admin Dashboard
        </h2>

        {/* Car Form */}
        <motion.div className="bg-white p-6 rounded-xl shadow-lg mb-10">
          <h3 className="text-2xl font-semibold text-[#171b25] mb-4 text-center">
            {editingCarId ? "Edit Car" : "Add New Car"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Car Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-md"
              id="car-name"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
              className="border px-4 py-2 rounded-md"
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

            <label className="flex items-center gap-2" htmlFor="car-fullOptions">
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
              className="col-span-full bg-[#e35b25] text-white px-6 py-2 rounded-md hover:bg-[#d14c1d] transition"
            >
              {editingCarId ? "Update Car" : "Add Car"}
            </button>
          </form>
        </motion.div>

        {/* Cars Table */}
        <motion.div>
          <h3 className="text-2xl font-semibold text-[#171b25] mb-4 text-center">
            Cars List
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-white rounded-xl shadow-lg text-center">
              <thead>
                <tr className="bg-[#171b25] text-white">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Gearbox</th>
                  <th>Doors</th>
                  <th>Year</th>
                  <th>Fuel</th>
                  <th>Condition</th>
                  <th>Type</th>
                  <th>Full Options</th>
                  <th>In Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car._id} className="border-b">
                    <td>{car._id}</td>
                    <td>{car.name}</td>
                    <td>{car.description}</td>
                    <td>${car.price}</td>
                    <td>{car.gearbox}</td>
                    <td>{car.doors}</td>
                    <td>{car.year}</td>
                    <td>{car.fuel}</td>
                    <td>{car.condition}</td>
                    <td>{car.type}</td>
                    <td>{car.fullOptions ? "Yes" : "No"}</td>
                    <td>{car.inStock ? "✅ Yes" : "❌ No"}</td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(car)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(car._id)}
                          className="text-red-500 hover:text-red-700"
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
