import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../../utils/SupaClient";
import { Spinner, Modal } from "@nextui-org/react";

const DetailSupplier = () => {
  const [supplierData, setSupplierData] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getSupplierData = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const { data, error } = await supabase
        .from("supplier")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      setSupplierData(data);
    } catch (error) {
      console.error("Failed to fetch supplier data", error);
      setErrorMessage("Failed to fetch supplier data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSupplierData();
  }, [id]);

  useEffect(() => {
    if (supplierData.nama_perusahaan) {
      document.title = `Detail Supplier - ${supplierData.nama_perusahaan}`;
    }
  }, [supplierData.nama_perusahaan]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner
            size="lg"
            color="secondary"
            label={
              <span className="text-white">Loading supplier details...</span>
            }
          />
        </div>
      ) : errorMessage ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center py-20 px-10 bg-gray-900 min-h-screen">
          <div className="w-full md:w-1/2 p-4 flex justify-center">
            <img
              src={supplierData.logo_supplier}
              alt={`Logo of ${supplierData.nama_supplier}`}
              onClick={() => setModalVisible(true)}
              className="object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer max-h-[600px] h-auto"
            />
            <Modal
              closeButton
              aria-labelledby="modal-title"
              open={modalVisible}
              onClose={() => setModalVisible(false)}
            >
              <Modal.Header>
                <h2 id="modal-title">Company Logo</h2>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={supplierData.logo_supplier}
                  alt={`Zoomed logo of ${supplierData.nama_supplier}`}
                  className="w-full"
                />
              </Modal.Body>
            </Modal>
          </div>

          <div className="w-full md:w-1/2 p-4 text-white">
            <h2 className="text-3xl font-bold mb-4">
              {supplierData.nama_supplier}
            </h2>
            <p className="text-xl font-semibold mb-2">
              <span className="font-bold">Email: </span>
              {supplierData.email}
            </p>
            <p className="text-lg font-semibold mb-2">
              <span className="font-bold">Contact: </span>
              {supplierData.no_hp}
            </p>
            <p className="text-lg font-semibold mb-2">
              <span className="font-bold">Address: </span>
              {supplierData.alamat}
            </p>

            <div className="flex gap-4 mb-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                Contact Supplier
              </button>
            </div>
            <Link
              to={"/semua-supplier"}
              className="flex items-center gap-2 bg-cyan-600 p-2 rounded-md mt-2 hover:bg-cyan-700"
            >
              <div className="mx-auto flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                  />
                </svg>
                <p className="font-semibold">Back to Suppliers</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailSupplier;
