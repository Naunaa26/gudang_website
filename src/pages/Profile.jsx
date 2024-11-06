import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { FaPhone, FaUser, FaEnvelope } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, username, role, avatar, phoneNumber, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaAdmin: username,
    role: role,
    email: user?.email || "",
    phoneNumber: phoneNumber || "",
    avatar: avatar || "",
  });

  useEffect(() => {
    if (!user && !loading) {
      navigate("/profile");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    setFormData({
      namaAdmin: username,
      role: role,
      email: user?.email || "",
      phoneNumber: phoneNumber || "",
      avatar: avatar || "",
    });
  }, [username, role, avatar, phoneNumber, user]);

  if (loading)
    return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/profile-picture-spirit-knight-k2ar09ggd5uvxwi1.jpg')",
      }}
    >
      <div className="max-w-md mx-auto px-6 sm:px-10 md:px-16 p-6 mt-10 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-800 dark:to-gray-900 text-white rounded-lg shadow-xl mb-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Profile
        </h1>
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <img
              src={formData.avatar || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="rounded-full w-full h-full object-cover shadow-md"
            />
          </div>
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2">
            <strong className="text-gray-900 dark:text-white">
              Nama Admin:
            </strong>{" "}
            {username}
          </p>
          <p className="text-gray-700 dark:text-gray-400 mb-2">
            <strong className="text-gray-900 dark:text-white">Role:</strong>{" "}
            {role}
          </p>
          <p className="text-gray-700 dark:text-gray-400 mb-2">
            <strong className="text-gray-900 dark:text-white">
              No Telepon:
            </strong>{" "}
            {phoneNumber}
          </p>
          <p className="text-gray-700 dark:text-gray-400 mb-6">
            <strong className="text-gray-900 dark:text-white">Email:</strong>{" "}
            {user?.email}
          </p>
          {user && (
            <Link
              to="/edit-profile"
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
            >
              <MdEdit className="inline mr-2" />
              Edit Profil
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
