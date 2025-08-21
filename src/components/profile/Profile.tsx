import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

interface ProfileProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    // Optional: you can call API to delete account here
    // After that, redirect to support page
    navigate("/support");
  };

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

      <div className="flex items-center mb-6">
        <FaPhone className="mr-4 text-orange-500" />
        <span>{user.phone}</span>
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
