import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../../utils/SupaClient";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { Spinner, Modal } from "@nextui-org/react";
import useFormatRupiah from "../../hooks/useFormatRupiah";
import { getRandomReviews } from "../../../utils/randomReview";

const DetailBarang = () => {
  const [getBarang, setGetBarang] = useState({});
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const { formatRupiah } = useFormatRupiah();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const getIdBarang = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("barang")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      setGetBarang(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIdBarang();
    const randomReviews = getRandomReviews(20);
    setReviews(randomReviews);
  }, [id]);

  useEffect(() => {
    document.getElementById("title").innerHTML = "Halaman Detail Barang";
  }, []);

  useEffect(() => {
    if (getBarang.nama_barang) {
      document.title = `Detail Barang - ${getBarang.nama_barang}`;
    }
  }, [getBarang.nama_barang]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-500" : "text-gray-400"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner
            size="lg"
            color="secondary"
            label={<span className="text-white">Loading Barang Detail...</span>}
          />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center py-20 px-10 bg-gray-900 min-h-screen">
          {/* Image Section */}
          <div className="w-full md:w-1/2 p-4 flex justify-center">
            <img
              src={getBarang.foto_barang}
              alt="product"
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
                <h2 id="modal-title">Image Zoom</h2>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={getBarang.foto_barang}
                  alt="product zoom"
                  className="w-full"
                />
              </Modal.Body>
            </Modal>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-4 text-white">
            <h2 className="text-3xl font-bold mb-4">{getBarang.nama_barang}</h2>
            <p className="text-3xl font-semibold mb-2">
              {formatRupiah(getBarang.harga_barang)}
            </p>
            <div className="bg-amber-500 text-white py-2 px-4 rounded-lg inline-block mb-4">
              <h3 className="text-medium text-amber-100 font-semibold">
                {getBarang.jenis_barang}
              </h3>
            </div>
            <p className="text-lg font-semibold mb-2">
              <span className="font-bold">Stok:</span> {getBarang.stok}
            </p>
            <p className="text-medium font-normal mb-4">
              <span className="font-bold">Deskripsi:</span>{" "}
              {getBarang.deskripsi}
            </p>
            <div className="flex gap-4 mb-4">
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center gap-2">
                <FaCartPlus /> Add to Cart
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center gap-2">
                <FaHeart /> Wishlist
              </button>
            </div>
            <Link
              to={"/semua-barang"}
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
                <p className="font-semibold">Kembali</p>
              </div>
            </Link>

            {/* Ratings and Reviews Section */}
            <h3 className="text-2xl font-bold mt-10 mb-4">Ulasan Pelanggan</h3>
            <div className="bg-gray-800 p-4 rounded-lg">
              {reviews.length === 0 ? (
                <p className="text-gray-400">Belum ada ulasan.</p>
              ) : (
                reviews.slice(0, 3).map((review, index) => (
                  <div key={index} className="border-b border-gray-700 py-2">
                    <p className="font-bold">{review.name}</p>
                    <div className="flex mb-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-400">{review.review}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailBarang;
