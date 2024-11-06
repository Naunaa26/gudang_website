import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/SupaClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faUser,
  faEnvelope,
  faPhone,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "@nextui-org/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const UbahSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formEdit, setFormEdit] = useState({
    nama_supplier: "",
    email: "",
    no_hp: "",
    alamat: "",
    logo_supplier: "", // Add this for logo URL handling
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const getSupplierById = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("supplier")
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

  const updateSupplier = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("supplier")
        .update({
          nama_supplier: formEdit.nama_supplier,
          email: formEdit.email,
          no_hp: formEdit.no_hp,
          alamat: formEdit.alamat,
          logo_supplier: formEdit.logo_supplier, // Include logo URL
        })
        .eq("id", id);
      if (error) throw error;

      MySwal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Supplier berhasil diperbarui!",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/supplier");
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
    getSupplierById();
    document.getElementById("title").innerHTML = "Halaman Edit Supplier";
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
            Edit Supplier
          </h2>
          <form
            className="bg-gray-900 rounded-lg shadow-lg p-6 space-y-4"
            onSubmit={updateSupplier}
          >
            <div className="form-group">
              <label
                htmlFor="nama_supplier"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Nama Supplier
              </label>
              <input
                type="text"
                id="nama_supplier"
                name="nama_supplier"
                placeholder="Masukkan nama supplier"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formEdit.nama_supplier}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Masukkan email supplier"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formEdit.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="no_hp"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                No HP
              </label>
              <input
                type="tel"
                id="no_hp"
                name="no_hp"
                placeholder="Masukkan nomor no hp"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formEdit.no_hp}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="alamat"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                Alamat
              </label>
              <textarea
                id="alamat"
                name="alamat"
                placeholder="Masukkan alamat supplier"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-40"
                value={formEdit.alamat}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label
                htmlFor="logo_supplier"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <FontAwesomeIcon icon={faLink} className="mr-2" />
                Logo Supplier (URL)
              </label>
              <input
                type="text"
                id="logo_supplier"
                name="logo_supplier"
                placeholder="Masukkan URL logo supplier"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formEdit.logo_supplier}
                onChange={handleChange}
              />
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

export default UbahSupplier;
