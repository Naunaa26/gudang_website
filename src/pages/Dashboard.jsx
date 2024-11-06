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
  FaTshirt,
  FaPuzzlePiece,
  FaTools,
  FaHammer,
  FaFirstAid,
  FaBook,
  FaCar,
  FaBlender,
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
          "mainan",
          "pakaian",
          "elektronik",
          "peralatan rumah tangga",
          "bahan bangunan",
          "obat-obatan dan alat kesehatan",
          "buku dan alat tulis",
          "otomotif",
          "kosmetik dan perawatan diri",
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
    <div className="dark:bg-[#140620] bg-[#124670] min-h-screen text-white">
      <Layout />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12 px-4 mb-10">
        {loading ? (
          Array(16).fill(<LoadingSkeleton />)
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

            <div className="bg-pink-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-pink-100 p-4 rounded-full mb-4">
                <FaPuzzlePiece className="text-4xl text-pink-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["mainan"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Mainan
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage toy items in the inventory.
              </p>
            </div>

            <div className="bg-purple-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <FaTshirt className="text-4xl text-purple-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["pakaian"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Pakaian
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage clothing items in the inventory.
              </p>
            </div>

            <div className="bg-gray-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <FaIndustry className="text-4xl text-gray-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["elektronik"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Elektronik
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage electronic items in the inventory.
              </p>
            </div>

            <div className="bg-teal-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-teal-100 p-4 rounded-full mb-4">
                <FaTools className="text-4xl text-teal-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["peralatan rumah tangga"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Peralatan Rumah Tangga
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage household items in the inventory.
              </p>
            </div>

            <div className="bg-orange-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <FaHammer className="text-4xl text-orange-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["bahan bangunan"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Bahan Bangunan
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage building materials in the inventory.
              </p>
            </div>

            <div className="bg-indigo-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <FaFirstAid className="text-4xl text-indigo-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["obat-obatan dan alat kesehatan"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Obat-obatan
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage health items in the inventory.
              </p>
            </div>

            <div className="bg-yellow-500 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <FaBook className="text-4xl text-yellow-500" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["buku dan alat tulis"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Buku
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage book items in the inventory.
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-gray-700 p-4 rounded-full mb-4">
                <FaCar className="text-4xl text-gray-300" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["otomotif"] || 0}
              </p>
              <h2 className="text-xl sm:text-lg font-semibold mb-2 text-white">
                Otomotif
              </h2>
              <p className="text-sm sm:text-xs text-white">
                Manage automotive items in the inventory.
              </p>
            </div>

            <div className="bg-pink-600 bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="bg-pink-500 p-4 rounded-full mb-4">
                <FaBlender className="text-4xl text-pink-200" />
              </div>
              <p className="text-base sm:text-sm font-bold text-white">
                {jenisBarangCount["kosmetik dan perawatan diri"] || 0}
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
    </div>
  );
};

export default Dashboard;
