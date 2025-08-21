import React, { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      alert(res.data.message);
      setForm({ firstName: "", lastName: "", phone: "", email: "", password: "" });
      // Redirect to login after successful registration
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="w-full bg-[#f6f7f9] py-28 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-4xl font-bold text-[#171b25] mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
            required
          />
          <button
            type="submit"
            className="bg-[#e35b25] text-white px-6 py-2 rounded-md hover:bg-[#d14c1d] transition"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-[#171b25]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#e35b25] hover:underline transition">
            Login
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Register;

