import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSignOutAlt,
  FaShoppingCart,
  FaCar,
  FaCalendarAlt,
} from "react-icons/fa";
import { getMyOrders, Order as ApiOrder } from "../../api/api";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
        setLoading(false);
      } catch (err) {
        console.error("Failed to parse user data:", err);
        navigate("/login");
      }
    }
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const res = await getMyOrders();
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "orders" && user) {
      fetchOrders();
    }
  }, [activeTab, user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (!password) {
      setError("Please enter your password to confirm");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Verify password first
      await axios.post(
        "http://localhost:5000/api/auth/verify-password",
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // If password correct, delete account
      await axios.delete("http://localhost:5000/api/auth/deleteAccount", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Password incorrect or deletion failed"
      );
    }
  };

  if (loading)
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#e35b25]"></div>
        <p className="mt-2 text-gray-600">Loading profile...</p>
      </div>
    );
  if (!user) return null;

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status as keyof typeof statusColors] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <section className="w-full bg-[#f6f7f9] py-12 sm:py-16 px-4 sm:px-6 lg:px-10 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#171b25] mb-6 sm:mb-8 text-center">
          My Profile
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg w-full max-w-md">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md transition text-xs sm:text-sm ${
                  activeTab === "profile"
                    ? "bg-[#e35b25] text-white"
                    : "text-gray-600 hover:text-[#e35b25]"
                }`}
              >
                <span className="hidden sm:inline">Profile Information</span>
                <span className="sm:hidden">Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-md transition text-xs sm:text-sm ${
                  activeTab === "orders"
                    ? "bg-[#e35b25] text-white"
                    : "text-gray-600 hover:text-[#e35b25]"
                }`}
              >
                <span className="hidden sm:inline">My Orders</span>
                <span className="sm:hidden">Orders</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4 sm:mb-6">
              Profile Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <FaUser className="text-xl sm:text-2xl text-[#e35b25] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-[#171b25] text-sm sm:text-base truncate">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <FaEnvelope className="text-xl sm:text-2xl text-[#e35b25] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-[#171b25] text-sm sm:text-base truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <FaPhone className="text-xl sm:text-2xl text-[#e35b25] flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-[#171b25] text-sm sm:text-base truncate">
                      {user.phone}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <FaUser className="text-xl sm:text-2xl text-[#e35b25] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600">Role</p>
                  <p className="font-semibold text-[#171b25] capitalize text-sm sm:text-base">
                    {user.role || "User"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-[#171b25] mb-4 sm:mb-6">
              My Orders
            </h3>

            {ordersLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#e35b25]"></div>
                <p className="mt-2 text-gray-600">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
                <h4 className="text-xl font-medium text-gray-600 mb-2">
                  No orders yet
                </h4>
                <p className="text-gray-500">
                  Start shopping to see your orders here!
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3">
                      <div className="flex items-center gap-3">
                        <FaCar className="text-xl sm:text-2xl text-[#e35b25] flex-shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-base sm:text-lg text-[#171b25] truncate">
                            {order.car.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {order.car.type} • {order.car.year}
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#e35b25]">
                          ${order.totalPrice.toLocaleString()}
                        </p>
                        <div className="mt-1">
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-600 gap-2">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt />
                        <span>
                          {formatDistanceToNow(new Date(order.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Order ID: {order._id.slice(-8)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Profile;
