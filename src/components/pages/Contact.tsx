import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission (API or email)
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="w-full bg-[#f6f7f9] py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171b25] mb-4">
          Contact Us
        </h2>
        <p className="text-sm sm:text-base text-gray-700 max-w-xl mx-auto">
          Have questions or feedback? Reach out to us and we'll get back to you
          shortly.
        </p>
      </motion.div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
        >
          <FaMapMarkerAlt className="text-[#e35b25] text-2xl sm:text-3xl mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#171b25] mb-2">
            Address
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            123 Main Street, Your City, Country
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
        >
          <FaPhone className="text-[#e35b25] text-2xl sm:text-3xl mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#171b25] mb-2">
            Phone
          </h3>
          <p className="text-sm sm:text-base text-gray-600">+212 600 000 000</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
        >
          <FaEnvelope className="text-[#e35b25] text-2xl sm:text-3xl mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#171b25] mb-2">
            Email
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            support@motary.com
          </p>
        </motion.div>
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-[#171b25] mb-4 sm:mb-6 text-center">
          Send a Message
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25] text-sm sm:text-base"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25] text-sm sm:text-base"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25] resize-none h-24 sm:h-32 text-sm sm:text-base"
            required
          />
          <button
            type="submit"
            className="bg-[#e35b25] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-[#d14c1d] transition text-sm sm:text-base font-medium"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
