import React, { useState } from "react";
import { motion } from "framer-motion";
import { loginUser, User } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    try {
      const normalized = {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };
      const res = await loginUser(normalized);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user as User));

      // Dispatch custom event to update header
      window.dispatchEvent(new CustomEvent("userLogin"));

      setSuccess(true); // show success overlay

      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Login failed";
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
    <section className="w-full bg-[#f6f7f9] min-h-screen flex items-center justify-center py-8 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white p-6 sm:p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-4xl font-bold text-[#171b25] mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-[#e35b25]"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative flex flex-col">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-[#e35b25]"
              } pr-10`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#e35b25] text-white px-6 py-2 rounded-md hover:bg-[#d14c1d] transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm text-[#171b25]">
          <Link
            to="/forgot-password"
            className="hover:text-[#e35b25] transition"
          >
            Forgot password?
          </Link>
          <Link to="/register" className="hover:text-[#e35b25] transition">
            Don’t have an account? Register
          </Link>
        </div>
      </motion.div>

      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <div className="bg-green-500 text-white px-8 py-6 rounded-xl shadow-lg text-center text-xl font-semibold">
            Login Successful! Redirecting...
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Login;
