import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/SupaClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faBox,
  faTag,
  faUtensils,
  faDollarSign,
  faWarehouse,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "@nextui-org/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UbahBarang = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formEdit, setFormEdit] = useState({
    nama_barang: "",
    harga_barang: 0,
    stok: 0,
    deskripsi: "",
    jenis_barang: "",
    foto_barang: "",
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const getBarangById = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("barang")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      setFormEdit(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBarang = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("barang")
        .update({
          nama_barang: formEdit.nama_barang,
          harga_barang: formEdit.harga_barang,
          stok: formEdit.stok,
          jenis_barang: formEdit.jenis_barang,
          deskripsi: formEdit.deskripsi,
          foto_barang: formEdit.foto_barang,
        })
        .eq("id", id);
      if (error) throw error;

      MySwal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Barang berhasil diperbarui!",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/tabel");
        window.location.reload();
      });
    } catch (error) {
      console.log("Error updating data:", error);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat memperbarui data!",
      });
    }
  };

  useEffect(() => {
    getBarangById();
    document.getElementById("title").innerHTML = "Halaman Edit Barang";
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner
            size="lg"
            color="secondary"
            label={<span className="text-white">Loading...</span>}
          />
        </div>
      ) : (
        <section className="max-w-3xl mx-auto p-6 my-4 rounded-md bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
            <FontAwesomeIcon icon={faEdit} className="mr-2 text-indigo-400" />
            Edit Barang
          </h2>
          <form
            className="bg-gray-900 rounded-lg shadow-lg p-6 space-y-4"
            onSubmit={updateBarang}
          >
            <div className="form-group">
              <label
                htmlFor="nama_barang"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <FontAwesomeIcon icon={faBox} className="mr-2" />
                Nama Barang
              </label>
              <input
                type="text"
                id="nama_barang"
                name="nama_barang"
                placeholder="Masukkan nama barang"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formEdit.nama_barang}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="foto_barang"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <FontAwesomeIcon icon={faTag} className="mr-2" />
                URL Gambar Barang
              </label>
              <input
                type="url"
                id="foto_barang"
                name="foto_barang"
                placeholder="Masukkan URL gambar barang"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formEdit.foto_barang}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="jenis_barang"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                Jenis Barang
              </label>
              <select
                id="jenis_barang"
                name="jenis_barang"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formEdit.jenis_barang}
                onChange={handleChange}
              >
                <option value="">Pilih kategori</option>
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="mainan">Mainan</option>
              </select>
            </div>
            <div className="form-group">
              <label
                htmlFor="harga_barang"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                Harga
              </label>
              <input
                type="number"
                id="harga_barang"
                name="harga_barang"
                placeholder="Masukkan harga barang"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formEdit.harga_barang}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="stok"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <FontAwesomeIcon icon={faWarehouse} className="mr-2" />
                Stok
              </label>
              <input
                type="number"
                id="stok"
                name="stok"
                placeholder="Masukkan jumlah stok"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formEdit.stok}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="deskripsi"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                placeholder="Masukkan deskripsi barang"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-40"
                value={formEdit.deskripsi}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Simpan
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default UbahBarang;