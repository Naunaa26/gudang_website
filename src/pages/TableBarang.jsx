import React, { useEffect, useState } from "react";
import TablePaginate from "../components/TablePaginate";
import { Button, useDisclosure } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { supabase } from "../../utils/SupaClient";
import ModalBarang from "../components/nextui/ModalBarang";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";

const TableBarang = () => {
  const [allBarang, setAllBarang] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllBarang = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("barang")
        .select("*")
        .order("id", { ascending: false });
      if (error) throw error;
      setAllBarang(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const { user, role } = useAuth();

  useEffect(() => {
    getAllBarang();
  }, []);

  const handleSort = (option) => {
    setSortOption(option);
    const sortedBarang = [...allBarang].sort((a, b) => {
      if (option === "name") return a.nama_barang.localeCompare(b.nama_barang);
      if (option === "price") return a.harga_barang - b.harga_barang;
      return 0;
    });
    setAllBarang(sortedBarang);
  };

  const handleFilter = (option) => {
    setFilterOption(option);
  };

  const filteredBarang = allBarang
    .filter((item) =>
      item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      if (filterOption === "") return true;
      return item.jenis_barang === filterOption;
    });

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
        <section id="table-barang" className="p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between mb-5 items-center gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Table Barang
            </h2>
            {user && role === "admin" ? (
              <>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
                  onPress={onOpen}
                >
                  + Tambah Barang
                </Button>
                <ModalBarang
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  onOpen={onOpen}
                />
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-400 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-md">
                    Login Sebagai Admin
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row mb-5 gap-4">
            {/* Search Input */}
            <div className="relative sm:w-1/2 max-w-full">
              <FaSearch className="absolute left-2 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari barang..."
                className="p-2 pl-8 w-full rounded-md border border-gray-300 text-white bg-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort Select */}
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="p-2 text-sm sm:text-base rounded-md text-white bg-gray-800 border border-gray-700 w-full sm:w-1/4"
            >
              <option value="">Sort By</option>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>

            {/* Filter Select */}
            <select
              onChange={(e) => handleFilter(e.target.value)}
              className="p-2 text-sm sm:text-base rounded-md text-white bg-gray-800 border border-gray-700 w-full sm:w-1/4"
            >
              <option value="">Filter by Category</option>
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
              <option value="mainan">Mainan</option>
              <option value="pakaian">Pakaian</option>
              <option value="elektronik">Elektronik</option>
              <option value="peralatan rumah tangga">
                Peralatan Rumah Tangga
              </option>
              <option value="bahan bangunan">Bahan Bangunan</option>
              <option value="kosmetik perawatan diri">
                Kosmetik dan Produk Perawatan Diri
              </option>
              <option value="obat-obatan dan alat kesehatan">
                Obat-obatan dan Alat Kesehatan
              </option>
              <option value="buku dan alat tulis">Buku dan Alat Tulis</option>
              <option value="otomotif">Otomotif</option>
            </select>

            <select
              onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
              className="p-2 text-sm sm:text-base rounded-md text-white bg-gray-800 border border-gray-700 w-full sm:w-1/4"
            >
              <option value={5}>5 Rows</option>
              <option value={10}>10 Rows</option>
              <option value={15}>15 Rows</option>
            </select>
          </div>

          {filteredBarang.length > 0 ? (
            <TablePaginate
              allBarang={filteredBarang}
              loading={loading}
              rowsPerPage={rowsPerPage}
            />
          ) : (
            <div className="text-center text-white text-xl">
              Maaf, barang tidak tersedia
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default TableBarang;
