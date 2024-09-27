import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/SupaClient";
import { FaSearch } from "react-icons/fa"; // Removed FaStar and FaChevronDown
import { Button, Spinner } from "@nextui-org/react";

const AllSupplier = () => {
  const [allSupplier, setAllSupplier] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(20);
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order: ascending or descending
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category for filtering
  const navigate = useNavigate();

  const getAllSupplier = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("supplier")
        .select("*")
        .order("id", { ascending: false });
      if (error) throw error;

      setAllSupplier(data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSupplier();
  }, []);

  // Filtering suppliers based on search term and selected category
  const filteredSupplier = allSupplier
    .filter((supplier) =>
      supplier.nama_supplier
        ? supplier.nama_supplier
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : false
    )
    .filter((supplier) =>
      selectedCategory ? supplier.kategori === selectedCategory : true
    );

  // Sorting suppliers based on selected sort order
  const sortedSupplier = filteredSupplier.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.nama_supplier.localeCompare(b.nama_supplier);
    } else {
      return b.nama_supplier.localeCompare(a.nama_supplier);
    }
  });

  const loadMore = () => {
    setItemsToShow((prev) => prev + 20);
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
        <section id="all-supplier" className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Semua Supplier
            </h2>
          </div>

          <div className="flex flex-col md:flex-row mb-6 gap-4">
            <div className="relative w-full md:w-1/2 max-w-md">
              <FaSearch className="absolute left-2 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search suppliers..."
                className="p-2 pl-8 w-full rounded-md border border-gray-300 bg-gray-800 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort By Dropdown */}
            <div className="relative w-full md:w-auto">
              <select
                className="bg-gray-800 text-white border border-gray-300 rounded-md p-2 pr-10 w-full"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Sort by Name (A-Z)</option>
                <option value="desc">Sort by Name (Z-A)</option>
              </select>
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative w-full md:w-auto">
              <select
                className="bg-gray-800 text-white border border-gray-300 rounded-md p-2 pr-10 ml-4 w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="retail">Retail</option>
                <option value="services">Services</option>
                <option value="wholesale">Wholesale</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedSupplier.slice(0, itemsToShow).length > 0 ? (
              sortedSupplier.slice(0, itemsToShow).map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-gray-800 text-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => navigate(`/detail-supplier/${supplier.id}`)}
                >
                  <img
                    src={supplier.logo_supplier || "/placeholder.png"}
                    alt={supplier.nama_supplier}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2">
                    {supplier.nama_supplier || "No Name"}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 bg-yellow-400 inline-block px-2 py-1 rounded-md">
                    Kategori: {supplier.kategori || "No Category"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    No HP: {supplier.no_hp || "No Phone Number"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Alamat: {supplier.alamat || "No Address"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Email: {supplier.email || "No Email"}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-white text-xl">
                Maaf, supplier tidak tersedia
              </div>
            )}
          </div>

          {filteredSupplier.length > itemsToShow && (
            <div className="flex justify-center mt-6">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
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

export default AllSupplier;
