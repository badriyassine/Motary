import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

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
      setError(err.response?.data?.message || "Password incorrect or deletion failed");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading profile...</p>;
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#171b25] text-white rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="flex items-center mb-4">
        <FaUser className="mr-4 text-orange-500" />
        <span>{user.firstName} {user.lastName}</span>
      </div>

      <div className="flex items-center mb-4">
        <FaEnvelope className="mr-4 text-orange-500" />
        <span>{user.email}</span>
      </div>

      {user.phone && (
        <div className="flex items-center mb-6">
          <FaPhone className="mr-4 text-orange-500" />
          <span>{user.phone}</span>
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-gray-600 hover:bg-gray-700 transition-colors w-full py-2 rounded-lg font-semibold mb-4 flex items-center justify-center gap-2"
      >
        <FaSignOutAlt /> Logout
      </button>

      <div className="mb-4">
        <input
          type="password"
          placeholder="Enter password to delete account"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded-md text-black"
        />
        {error && <p className="text-red-500 mt-1">{error}</p>}
      </div>

      <button
        onClick={handleDeleteAccount}
        className="bg-red-600 hover:bg-red-700 transition-colors w-full py-2 rounded-lg font-semibold"
      >
        Delete Account
      </button>
    </div>
  );
};

export default Profile;


