import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const trimmed = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      repeatPassword: form.repeatPassword.trim(),
    };

    if (!trimmed.firstName) newErrors.firstName = "First name is required";
    if (!trimmed.lastName) newErrors.lastName = "Last name is required";
    if (!trimmed.phone) newErrors.phone = "Phone number is required";
    if (!trimmed.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email address";

    if (trimmed.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!/[A-Z]/.test(trimmed.password))
      newErrors.password = "Password must contain an uppercase letter";
    if (!/[a-z]/.test(trimmed.password))
      newErrors.password = "Password must contain a lowercase letter";
    if (!/[0-9]/.test(trimmed.password))
      newErrors.password = "Password must contain a number";
    if (!/[!@#$%^&*]/.test(trimmed.password))
      newErrors.password =
        "Password must contain a special character (!@#$%^&*)";

    if (trimmed.password !== trimmed.repeatPassword)
      newErrors.repeatPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const trimmedData = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
      };

      await registerUser(trimmedData);
      setSuccess(true);
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        repeatPassword: "",
      });
      // Redirect to home after successful registration
      setTimeout(() => navigate("/"), 1000);
    } catch (err: any) {
      setErrors({ api: err.response?.data?.message || "Registration failed" });
      setTimeout(() => setErrors({}), 3000);
    }
  };

  return (
    <section className="w-full bg-[#f6f7f9] py-28 px-4 flex justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-4xl font-bold text-[#171b25] mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* First Name */}
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25] w-full"
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25] w-full"
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25] w-full"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25] w-full"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25] w-full"
              required
            />
            <span
              className="absolute right-3 top-2/4 -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Repeat Password */}
          <div className="relative">
            <input
              type={showRepeatPassword ? "text" : "password"}
              name="repeatPassword"
              placeholder="Repeat Password"
              value={form.repeatPassword}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25] w-full"
              required
            />
            <span
              className="absolute right-3 top-2/4 -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.repeatPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.repeatPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#e35b25] text-white px-6 py-2 rounded-md hover:bg-[#d14c1d] transition"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-[#171b25]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#e35b25] hover:underline transition"
          >
            Login
          </Link>
        </div>

        {errors.api && (
          <p className="text-red-500 text-sm mt-2 text-center">{errors.api}</p>
        )}
      </motion.div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            Registration Successful! Redirecting...
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Register;
