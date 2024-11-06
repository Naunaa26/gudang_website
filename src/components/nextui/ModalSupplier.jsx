import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBuilding,
  faEnvelope,
  faPhone,
  faImage,
  faWarehouse,
  faShoppingCart,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../utils/SupaClient";
import Swal from "sweetalert2";

const ModalSupplier = ({ isOpen, onOpenChange }) => {
  const [formData, setFormData] = useState({
    nama_supplier: "",
    alamat: "",
    email: "",
    no_hp: "",
    logo_supplier: "",
    kategori: "wholesale", // Default category
  });

  // Define icons for each category
  const categoryIcons = {
    wholesale: faWarehouse,
    retail: faShoppingCart,
    service: faCogs,
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from("supplier")
        .insert([formData]);

      if (error) {
        Swal.fire({
          title: "Gagal!",
          text: "Gagal Menambahkan Supplier Ke Database.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil Menambahkan Supplier Ke Database!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            setFormData({
              nama_supplier: "",
              alamat: "",
              email: "",
              no_hp: "",
              logo_supplier: "",
              kategori: "wholesale",
            });
            onOpenChange(false);
            window.location.reload();
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out">
      <div className="bg-[#18181B] w-full max-w-3xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        <h2 className="text-white text-2xl mb-4">Tambah Supplier</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={faUser} />
                <span>Nama Supplier</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan Nama Supplier"
                name="nama_supplier"
                value={formData.nama_supplier}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 focus:outline-none"
              />
            </div>

            {/* Kategori Dropdown with Icon */}
            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={categoryIcons[formData.kategori]} />
                <span>Kategori</span>
              </label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 focus:outline-none"
              >
                <option value="wholesale">Wholesale</option>
                <option value="retail">Retail</option>
                <option value="service">Service</option>
              </select>
            </div>

            {/* Other form fields */}
            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={faBuilding} />
                <span>Alamat</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan Alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Email</span>
              </label>
              <input
                type="email"
                placeholder="Masukkan Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={faPhone} />
                <span>No HP</span>
              </label>
              <input
                type="tel"
                placeholder="Masukkan Nomor HP"
                name="no_hp"
                value={formData.no_hp}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={faImage} />
                <span>Link Gambar</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan Link Gambar"
                name="logo_supplier"
                value={formData.logo_supplier}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition-all duration-300 ease-in-out"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-all duration-300 ease-in-out"
            >
              Tambah Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ModalSupplier;
