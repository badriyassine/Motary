import React, { useState } from "react";
import { motion } from "framer-motion";
import { loginUser, User } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" }); // <- error state
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "", password: "" }); // reset errors

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user as User));
      navigate("/"); 
    } catch (err: any) {
      const msg = err.response?.data?.message || "Login failed";
      if (msg.toLowerCase().includes("email")) {
        setErrors({ ...errors, email: msg });
      } else if (msg.toLowerCase().includes("password")) {
        setErrors({ ...errors, password: msg });
      } else {
        setErrors({ email: msg, password: msg });
      }
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
        <h2 className="text-4xl font-bold text-[#171b25] mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#e35b25]"
              }`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="flex flex-col">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#e35b25]"
              }`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="bg-[#e35b25] text-white px-6 py-2 rounded-md hover:bg-[#d14c1d] transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm text-[#171b25]">
          <Link to="/forgot-password" className="hover:text-[#e35b25] transition">
            Forgot password?
          </Link>
          <Link to="/register" className="hover:text-[#e35b25] transition">
            Don’t have an account? Register
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;



