import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/SupaClient";
import { FaSearch, FaStar, FaCartPlus } from "react-icons/fa";
import { Button, Spinner } from "@nextui-org/react";

const AllBarang = () => {
  const [allBarang, setAllBarang] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(20);
  const navigate = useNavigate();

  const provinces = [
    "Jakarta",
    "Bali",
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "Sumatera Utara",
    "Sumatera Selatan",
    "Kalimantan Barat",
    "Kalimantan Timur",
    "Sulawesi Selatan",
    "Sulawesi Utara",
    "Banten",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Maluku",
    "Papua",
  ];

  const getAllBarang = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("barang")
        .select("*")
        .order("id", { ascending: false });
      if (error) throw error;

      const updatedData = data.map((item) => ({
        ...item,
        sold: Math.floor(Math.random() * 100000) + 1,
        source: `Sumber: ${
          provinces[Math.floor(Math.random() * provinces.length)]
        }`,
      }));

      setAllBarang(updatedData);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

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
      item.nama_barang
        ? item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
    .filter((item) => {
      if (filterOption === "") return true;
      return item.jenis_barang === filterOption;
    });

  const loadMore = () => {
    setItemsToShow((prev) => prev + 20);
  };

  const getRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

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
        <section id="all-barang" className="p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Semua Barang
            </h2>
          </div>

          <div className="flex flex-col md:flex-row mb-6 gap-4">
            <div className="relative w-full md:w-1/2 max-w-md">
              <FaSearch className="absolute left-2 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="p-2 pl-8 w-full rounded-md border border-gray-300 bg-gray-800 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              onChange={(e) => handleSort(e.target.value)}
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
            >
              <option value="">Sort By</option>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>

            <select
              onChange={(e) => handleFilter(e.target.value)}
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-700"
            >
              <option value="">Filter by Category</option>
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
              <option value="Mainan">Mainan</option>
              <option value="Pakaian">Pakaian</option>
              <option value="Elektronik">Elektronik</option>
              <option value="Peralatan Rumah Tangga">
                Peralatan Rumah Tangga
              </option>
              <option value="Bahan Bangunan">Bahan Bangunan</option>
              <option value="Kosmetik Perawatan Diri">
                Kosmetik dan Produk Perawatan Diri
              </option>
              <option value="Obat-obatan dan Alat Kesehatan">
                Obat-obatan dan Alat Kesehatan
              </option>
              <option value="Buku dan Alat Tulis">Buku dan Alat Tulis</option>
              <option value="Otomotif">Otomotif</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredBarang.slice(0, itemsToShow).length > 0 ? (
              filteredBarang.slice(0, itemsToShow).map((item) => {
                const rating = getRandomRating();
                return (
                  <div
                    key={item.id}
                    className="bg-gray-800 text-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
                    onClick={() => navigate(`/detail/${item.id}`)}
                  >
                    <img
                      src={item.foto_barang || "/placeholder.png"}
                      alt={item.nama_barang}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div className="mt-2 md:mt-4">
                      <h3 className="text-base md:text-lg font-semibold">
                        {item.nama_barang
                          ? item.nama_barang.length > 20
                            ? `${item.nama_barang.slice(0, 20)}...`
                            : item.nama_barang
                          : "No Name"}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.deskripsi
                          ? item.deskripsi.length > 100
                            ? `${item.deskripsi.slice(0, 100)}...`
                            : item.deskripsi
                          : "No Description"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 mt-1">
                        {item.source} | Sold: {item.sold} units
                      </p>
                      <div className="flex justify-between items-center mt-2 md:mt-4">
                        <span className="text-lg font-bold">
                          Rp {item.harga_barang.toLocaleString("id-ID")}
                        </span>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md flex items-center gap-2">
                          <FaCartPlus />
                          Add to Cart
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center">
                        {Array.from({ length: rating }, (_, index) => (
                          <FaStar key={index} className="text-yellow-500" />
                        ))}
                        {Array.from({ length: 5 - rating }, (_, index) => (
                          <FaStar
                            key={index + rating}
                            className="text-gray-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-white text-xl">
                Maaf, barang tidak tersedia
              </div>
            )}
          </div>

          {filteredBarang.length > itemsToShow && (
            <div className="flex justify-center mt-6">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
                onClick={loadMore}
              >
                Load More
              </Button>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default AllBarang;
