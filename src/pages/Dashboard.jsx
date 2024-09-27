import React, { useEffect, useState } from "react";
import {
  FaWarehouse,
  FaUtensils,
  FaGlassCheers,
  FaUsers,
  FaIndustry,
  FaMoneyBillWave,
  FaBoxOpen,
  FaStar,
  FaTshirt, // Add icon for Pakaian
  FaPuzzlePiece, // Add icon for Mainan
  FaTools, // Add icon for Peralatan Rumah Tangga
  FaHammer, // Add icon for Bahan Bangunan
  FaFirstAid, // Add icon for Obat-obatan
  FaBook, // Add icon for Buku
  FaCar, // Add icon for Otomotif
  FaBlender, // Add icon for Kosmetik
} from "react-icons/fa";
import { supabase } from "../../utils/SupaClient";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Layout from "../components/Layout";
import RecentOrders from "../components/RecentOrders.jsx";

const Dashboard = () => {
  const [totalBarangCount, setTotalBarangCount] = useState(0);
  const [jenisBarangCount, setJenisBarangCount] = useState({});
  const [supplierCount, setSupplierCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalBarang = async () => {
      try {
        setLoading(true);
        const { count, error } = await supabase
          .from("barang")
          .select("*", { count: "exact", head: true });

        if (error) throw error;
        setTotalBarangCount(count);
      } catch (error) {
        console.error("Error fetching total items:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchJenisBarangCount = async () => {
      try {
        const jenisBarang = [
          "makanan",
          "minuman",
          "Mainan",
          "Pakaian",
          "Elektronik",
          "Peralatan Rumah Tangga",
          "Bahan Bangunan",
          "Obat-obatan dan Alat Kesehatan",
          "Buku dan Alat Tulis",
          "Otomotif",
          "Kosmetik dan Perawatan Diri",
        ];
        const jenisCountMap = {};

        for (const jenis of jenisBarang) {
          const { count, error } = await supabase
            .from("barang")
            .select("*", { count: "exact", head: true })
            .eq("jenis_barang", jenis);

          if (error) throw error;

          jenisCountMap[jenis] = count;
        }

        setJenisBarangCount(jenisCountMap);
      } catch (error) {
        console.error("Error fetching count for each jenis:", error);
      }
    };

    const fetchSupplierCount = async () => {
      try {
        const { count, error } = await supabase
          .from("supplier")
          .select("*", { count: "exact", head: true });

        if (error) throw error;

        setSupplierCount(count);
      } catch (error) {
        console.error("Error fetching supplier count:", error);
      }
    };

    const fetchTotalRevenue = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("total")
          .sum("total", { as: "revenue" });

        if (error) throw error;
        setTotalRevenue(data[0]?.revenue || 0);
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };

    const fetchOrderCount = async () => {
      try {
        const { count, error } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true });

        if (error) throw error;
        setOrderCount(count);
      } catch (error) {
        console.error("Error fetching total orders:", error);
      }
    };

    fetchTotalBarang();
    fetchJenisBarangCount();
    fetchSupplierCount();
    fetchTotalRevenue();
    fetchOrderCount();
  }, []);

  return (
    <>
      <Layout />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12 px-4 mb-10">
        {loading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : (
          <>
            <div className="bg-blue-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-blue-100 p-4 rounded-full mb-10">
                <FaWarehouse className="text-4xl text-blue-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {totalBarangCount}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Semua Barang
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage all items in the inventory.
              </p>
            </div>

            {/* Makanan */}
            <div className="bg-green-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaUtensils className="text-4xl text-green-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["makanan"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Makanan
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage food items in the inventory.
              </p>
            </div>

            {/* Minuman */}
            <div className="bg-red-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <FaGlassCheers className="text-4xl text-red-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["minuman"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Minuman
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage drink items in the inventory.
              </p>
            </div>

            {/* Mainan */}
            <div className="bg-pink-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-pink-100 p-4 rounded-full mb-4">
                <FaPuzzlePiece className="text-4xl text-pink-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["Mainan"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Mainan
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage toy items in the inventory.
              </p>
            </div>

            {/* Pakaian */}
            <div className="bg-purple-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <FaTshirt className="text-4xl text-purple-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["Pakaian"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Pakaian
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage clothing items in the inventory.
              </p>
            </div>

            {/* Elektronik */}
            <div className="bg-gray-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <FaIndustry className="text-4xl text-gray-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["Elektronik"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Elektronik
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage electronic items in the inventory.
              </p>
            </div>

            {/* Peralatan Rumah Tangga */}
            <div className="bg-teal-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-teal-100 p-4 rounded-full mb-4">
                <FaTools className="text-4xl text-teal-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["Peralatan Rumah Tangga"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Peralatan Rumah Tangga
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage household items in the inventory.
              </p>
            </div>

            {/* Bahan Bangunan */}
            <div className="bg-orange-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <FaHammer className="text-4xl text-orange-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["Bahan Bangunan"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Bahan Bangunan
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage building materials in the inventory.
              </p>
            </div>

            {/* Obat-obatan dan Alat Kesehatan */}
            <div className="bg-indigo-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <FaFirstAid className="text-4xl text-indigo-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["Obat-obatan dan Alat Kesehatan"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Obat-obatan
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage health items in the inventory.
              </p>
            </div>

            {/* Buku dan Alat Tulis */}
            <div className="bg-yellow-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <FaBook className="text-4xl text-yellow-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["Buku dan Alat Tulis"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Buku
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage book items in the inventory.
              </p>
            </div>

            {/* Otomotif */}
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-gray-700 p-4 rounded-full mb-4">
                <FaCar className="text-4xl text-gray-300" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["Otomotif"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Otomotif
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage automotive items in the inventory.
              </p>
            </div>

            {/* Kosmetik dan Produk Perawatan Diri */}
            <div className="bg-pink-600 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-pink-500 p-4 rounded-full mb-4">
                <FaBlender className="text-4xl text-pink-200" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["Kosmetik dan Perawatan Diri"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Kosmetik
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage cosmetic items in the inventory.
              </p>
            </div>

            <div className="bg-orange-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <FaMoneyBillWave className="text-4xl text-orange-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {totalRevenue}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Total Revenue
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage your total revenue.
              </p>
            </div>

            <div className="bg-blue-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <FaUsers className="text-4xl text-blue-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {supplierCount}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Total Supplier
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Total suppliers available.
              </p>
            </div>

            <div className="bg-purple-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <FaBoxOpen className="text-4xl text-purple-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {orderCount}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Total Orders
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage total orders received.
              </p>
            </div>
          </>
        )}
      </section>
      <RecentOrders />
    </>
  );
};

export default Dashboard;
