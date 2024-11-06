import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { supabase } from "../../../utils/SupaClient";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaImage,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UbahProfiles = () => {
  const { user, username, role, avatar, phoneNumber } = useAuth();
  const [formData, setFormData] = useState({
    namaAdmin: username,
    role: role,
    email: user?.email || "",
    phoneNumber: phoneNumber || "",
    avatar: avatar || "",
    newAvatar: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      namaAdmin: username,
      role: role,
      email: user?.email || "",
      phoneNumber: phoneNumber || "",
      avatar: avatar || "",
      newAvatar: null,
    });
  }, [username, role, avatar, phoneNumber, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          newAvatar: file,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);

      const filePath = `avatars/${Date.now()}_${file.name}`;
      supabase.storage
        .from("avatars")
        .upload(filePath, file)
        .then(({ data, error }) => {
          if (error) {
            throw error;
          }
          const avatarUrl = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/avatars/${data.path}`;
          setFormData((prevData) => ({
            ...prevData,
            avatar: avatarUrl,
          }));
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let avatarUrl = formData.avatar;

      if (formData.newAvatar) {
        avatarUrl = formData.avatar;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          username: formData.namaAdmin,
          role: formData.role,
          phone_number: formData.phoneNumber,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profile: ", error);
      } else {
        MySwal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Profil berhasil diperbarui!",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/profile");
            window.location.reload();
          }
        });
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      MySwal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Gagal mengupdate profil!",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-800 dark:to-gray-900 text-white rounded-lg shadow-xl mb-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Edit Profil</h1>
        <button
          onClick={() => navigate("/profile")}
          className="text-white text-xl"
        >
          <FaTimes />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 "
      >
        <div className="mb-4">
          <label className="flex items-center text-sm sm:text-base font-medium mb-1 dark:text-white text-gray-800">
            <FaUser className="mr-2" />
            Nama Admin
          </label>
          <input
            type="text"
            name="namaAdmin"
            value={formData.namaAdmin}
            onChange={handleChange}
            className="block w-full border border-gray-600 rounded-md p-2 dark:bg-gray-700 dark:text-white bg-gray-100 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center text-sm sm:text-base font-medium mb-1 dark:text-white text-gray-800">
            <FaIdBadge className="mr-2" />
            Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="block w-full border border-gray-600 rounded-md dark:bg-gray-700 dark:text-white p-2 bg-gray-100 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center text-sm sm:text-base font-medium mb-1 dark:text-white text-gray-800">
            <FaEnvelope className="mr-2" />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="block w-full border border-gray-600 rounded-md p-2 dark:bg-gray-700 dark:text-white bg-gray-100 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center text-sm sm:text-base font-medium mb-1 dark:text-white text-gray-800">
            <FaPhone className="mr-2" />
            No Telepon
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="block w-full border border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-800 focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="flex items-center text-sm sm:text-base font-medium mb-1 dark:text-white  text-gray-800">
            <FaImage className="mr-2" />
            Gambar Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full border border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 focus:outline-none focus:ring focus:ring-indigo-500"
          />
          {formData.avatar && (
            <div className="mt-4">
              <img
                src={formData.avatar}
                alt="Avatar Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default UbahProfiles;
