import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaCheck,
  FaTimes,
  FaSignOutAlt,
  FaArrowLeft,
} from "react-icons/fa";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  Order as ApiOrder,
} from "../../api/api";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Order extends ApiOrder {
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  notes?: string;
}

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [notes, setNotes] = useState("");

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "confirmed",
      label: "Confirmed",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "processing",
      label: "Processing",
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "shipped",
      label: "Shipped",
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      value: "delivered",
      label: "Delivered",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-100 text-red-800",
    },
  ];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus as any,
                notes: notes || order.notes,
              }
            : order
        )
      );
      setShowModal(false);
      setSelectedOrder(null);
      setStatusUpdate("");
      setNotes("");
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status");
    }
  };

  const handleDelete = async (orderId: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(orderId);
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      } catch (err) {
        console.error("Failed to delete order:", err);
        alert("Failed to delete order");
      }
    }
  };

  const openStatusModal = (order: Order) => {
    setSelectedOrder(order);
    setStatusUpdate(order.status);
    setNotes(order.notes || "");
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find((opt) => opt.value === status);
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusOption?.color || "bg-gray-100 text-gray-800"
        }`}
      >
        {statusOption?.label || status}
      </span>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
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
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm sm:text-base"
            >
              <FaArrowLeft />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </button>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#171b25]">
              Orders Management
            </h2>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#e35b25]"></div>
            <p className="mt-2 text-gray-600">Loading orders...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-white rounded-xl shadow-lg text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#171b25] text-white">
                  <th className="px-2 sm:px-4 py-3 text-left hidden sm:table-cell">
                    Order ID
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left">Customer</th>
                  <th className="px-2 sm:px-4 py-3 text-left hidden lg:table-cell">
                    Car
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-left">Price</th>
                  <th className="px-2 sm:px-4 py-3 text-left">Status</th>
                  <th className="px-2 sm:px-4 py-3 text-left hidden md:table-cell">
                    Date
                  </th>
                  <th className="px-2 sm:px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-3 text-xs font-mono hidden sm:table-cell">
                      {order._id.slice(-8)}
                    </td>
                    <td className="px-2 sm:px-4 py-3">
                      <div>
                        <div className="font-medium text-xs sm:text-sm">
                          {order.user
                            ? `${order.user.firstName} ${order.user.lastName}`
                            : `${order.buyerInfo?.firstName} ${order.buyerInfo?.lastName}`}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {order.user
                            ? order.user.email
                            : order.buyerInfo?.email}
                        </div>
                        <div className="text-xs text-gray-600">
                          {order.user
                            ? order.user.phone
                            : order.buyerInfo?.phone}
                        </div>
                        {order.user ? (
                          <div className="text-xs text-blue-600">
                            Registered User
                          </div>
                        ) : (
                          <div className="text-xs text-orange-600">
                            Guest User
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-3 hidden lg:table-cell">
                      <div>
                        <div className="font-medium text-xs sm:text-sm">
                          {order.car.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.car.type} • {order.car.year}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 sm:px-4 py-3 font-medium text-xs sm:text-sm">
                      {formatPrice(order.totalPrice)}
                    </td>
                    <td className="px-2 sm:px-4 py-3">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-2 sm:px-4 py-3 text-xs text-gray-500 hidden md:table-cell">
                      {formatDistanceToNow(new Date(order.createdAt), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="px-2 sm:px-4 py-3">
                      <div className="flex justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => openStatusModal(order)}
                          className="text-blue-500 hover:text-blue-700 p-1"
                          title="Update Status"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete Order"
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
        )}

        {orders.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500">
              Orders will appear here when customers make purchases.
            </p>
          </div>
        )}
      </motion.div>

      {/* Status Update Modal */}
      {showModal && selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-2 sm:mx-4"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Update Order Status
            </h3>

            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Order: {selectedOrder.car.name}
              </label>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Customer:{" "}
                {selectedOrder.user
                  ? `${selectedOrder.user.firstName} ${selectedOrder.user.lastName}`
                  : `${selectedOrder.buyerInfo?.firstName} ${selectedOrder.buyerInfo?.lastName}`}
              </label>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Phone:{" "}
                {selectedOrder.user
                  ? selectedOrder.user.phone
                  : selectedOrder.buyerInfo?.phone}
              </label>
            </div>

            <div className="mb-3 sm:mb-4">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Status
              </label>
              <select
                value={statusUpdate}
                onChange={(e) => setStatusUpdate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e35b25]"
                placeholder="Add any notes about this order..."
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedOrder(null);
                  setStatusUpdate("");
                  setNotes("");
                }}
                className="px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleStatusUpdate(selectedOrder._id, statusUpdate)
                }
                className="px-3 sm:px-4 py-2 bg-[#e35b25] text-white rounded-md hover:bg-[#d14c1d] text-sm sm:text-base"
              >
                Update Status
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Orders;
