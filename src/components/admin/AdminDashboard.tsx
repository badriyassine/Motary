import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getCars, addCar, updateCar, deleteCar, Car } from "../../api/api";

const AdminDashboard: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    images: [] as File[],
  });
  const [editingCarId, setEditingCarId] = useState<string | null>(null);

  const fetchCars = async () => {
    const res = await getCars();
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Handle text input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, images: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    form.images.forEach((file) => formData.append("images", file));

    try {
      if (editingCarId) {
        await updateCar(editingCarId, formData);
        alert("Car updated!");
      } else {
        await addCar(formData);
        alert("Car added!");
      }
      setForm({ name: "", description: "", price: "", images: [] });
      setEditingCarId(null);
      fetchCars();
    } catch (err) {
      console.error(err);
      alert("Error saving car.");
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCarId(car._id);
    setForm({
      name: car.name,
      description: car.description,
      price: car.price.toString(),
      images: [],
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await deleteCar(id);
      fetchCars();
    }
  };

  return (
    <section className="w-full bg-[#f6f7f9] py-16 px-10 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-[#171b25] mb-8 text-center">Admin Dashboard</h2>

        {/* Car Form */}
        <motion.div className="bg-white p-6 rounded-xl shadow-lg mb-10">
          <h3 className="text-2xl font-semibold text-[#171b25] mb-4 text-center">
            {editingCarId ? "Edit Car" : "Add New Car"}
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Car Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
              required
            />
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFiles}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
            />
            <button
              type="submit"
              className="bg-[#e35b25] text-white px-6 py-2 rounded-md hover:bg-[#d14c1d] transition"
            >
              {editingCarId ? "Update Car" : "Add Car"}
            </button>
          </form>
        </motion.div>

        {/* Cars Table */}
        <motion.div>
          <h3 className="text-2xl font-semibold text-[#171b25] mb-4 text-center">Cars List</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-white rounded-xl shadow-lg">
              <thead>
                <tr className="bg-[#171b25] text-white">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Images</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car._id} className="text-center border-b">
                    <td className="px-4 py-2">{car._id}</td>
                    <td className="px-4 py-2">{car.name}</td>
                    <td className="px-4 py-2">{car.description}</td>
                    <td className="px-4 py-2">${car.price}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      {car.images.map((img, idx) => (
                        <img key={idx} src={img} alt={car.name} className="w-20 h-12 object-cover rounded-md" />
                      ))}
                    </td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button onClick={() => handleEdit(car)} className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(car._id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
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

