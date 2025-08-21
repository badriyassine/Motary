import React, { useState } from "react";
import { motion } from "framer-motion";
import { forgotPassword } from "../../api/api"; // Make sure you create this API function
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPassword({ email });
      alert(res.data.message || "Check your email for reset instructions.");
      setEmail("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to send reset email.");
    }
    setLoading(false);
  };

  return (
    <section className="w-full bg-[#f6f7f9] py-28 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-4xl font-bold text-[#171b25] mb-6 text-center">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email to receive password reset instructions.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#e35b25] text-white px-6 py-2 rounded-md hover:bg-[#d14c1d] transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="mt-4 text-sm text-center text-[#171b25]">
          Remembered your password?{" "}
          <Link to="/login" className="text-[#e35b25] hover:underline transition">
            Login
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ForgotPassword;
