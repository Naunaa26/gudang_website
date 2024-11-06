import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faMoneyBill,
  faBox,
  faInfoCircle,
  faCamera,
  faUtensils,
  faCoffee,
  faGamepad,
  faTshirt,
  faFlask,
  faCar,
  faBook,
  faPills,
  faList,
  faHammer,
  faCouch,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../utils/SupaClient";
import Swal from "sweetalert2";

const iconMapping = {
  makanan: faUtensils,
  minuman: faCoffee,
  mainan: faGamepad,
  pakaian: faTshirt,
  kosmetik: faFlask,
  otomotif: faCar,
  buku: faBook,
  obat: faPills,
  bahan_bangunan: faHammer,
  peralatan_rumah: faCouch,
  elektronik: faTv,
};

export default function ModalBarang({ isOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    nama_barang: "",
    harga_barang: "",
    stok: "",
    deskripsi: "",
    jenis_barang: "",
    foto_barang: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      jenis_barang: e.target.value,
    }));
  };

  const handleImage = (e) => {
    setFormData({
      ...formData,
      foto_barang: e.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data: uploadImage, error: uploadError } = await supabase.storage
        .from("gambar_barang")
        .upload(
          `foto_product/${formData.foto_barang.name}`,
          formData.foto_barang,
          {
            cacheControl: "3600",
            upsert: true,
          }
        );

      if (uploadError) throw uploadError;

      const imageUrl = supabase.storage
        .from("gambar_barang")
        .getPublicUrl(`foto_product/${formData.foto_barang.name}`)
        .data.publicUrl;

      const updatedFormData = {
        ...formData,
        foto_barang: imageUrl,
      };

      const { error: insertError } = await supabase
        .from("barang")
        .insert(updatedFormData);

      if (insertError) {
        throw insertError;
      }

      Swal.fire({
        title: "Berhasil!",
        text: "Berhasil Menambahkan Barang Ke Database!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          setFormData({
            nama_barang: "",
            harga_barang: "",
            stok: "",
            deskripsi: "",
            jenis_barang: "",
            foto_barang: "",
          });
          onOpenChange(false);
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

  const selectedIcon = iconMapping[formData.jenis_barang] || faList;

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out">
      <div className="bg-[#18181B] w-full max-w-3xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        <h2 className="text-white text-2xl mb-4">Tambah Barang</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={faTag} />
                <span>Nama Barang</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan Nama Barang"
                name="nama_barang"
                value={formData.nama_barang}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={selectedIcon} />
                <span>Jenis Barang</span>
              </label>
              <select
                name="jenis_barang"
                value={formData.jenis_barang}
                onChange={handleSelectChange}
                className="w-full p-2 rounded bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 focus:outline-none"
              >
                <option value="" disabled>
                  Pilih Jenis Barang
                </option>
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="mainan">Mainan</option>
                <option value="pakaian">Pakaian</option>
                <option value="kosmetik">Kosmetik dan Perawatan Diri</option>
                <option value="otomotif">Otomotif</option>
                <option value="buku">Buku dan Alat Tulis</option>
                <option value="obat">Obat-obatan dan Alat Kesehatan</option>
                <option value="bahan_bangunan">Bahan Bangunan</option>
                <option value="peralatan_rumah">Peralatan Rumah Tangga</option>
                <option value="elektronik">Elektronik</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={faMoneyBill} />
                <span>Harga</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan Harga"
                name="harga_barang"
                value={formData.harga_barang}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={faBox} />
                <span>Stok</span>
              </label>
              <input
                type="number"
                placeholder="Masukkan Stok"
                name="stok"
                value={formData.stok}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={faCamera} />
                <span>Gambar Barang</span>
              </label>
              <input
                type="file"
                accept="image/*"
                name="foto_barang"
                onChange={handleImage}
                className="w-full p-2 rounded bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="flex items-center text-white gap-2 mb-2">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>Deskripsi</span>
              </label>
              <textarea
                placeholder="Masukkan Deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
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
              Tambah Barang
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
