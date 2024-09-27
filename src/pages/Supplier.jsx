import React, { useEffect, useState } from "react";
import TablePaginate from "../components/TableSupplier";
import { Button, useDisclosure } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { supabase } from "../../utils/SupaClient";
import { FaSearch } from "react-icons/fa";
import ModalSupplier from "../components/nextui/ModalSupplier";
import Swal from "sweetalert2"; // Import SweetAlert2

const Supplier = () => {
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllSuppliers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("supplier")
        .select("*")
        .order("id", { ascending: false });
      if (error) throw error;
      setAllSuppliers(data);
    } catch (error) {
      console.error("Failed to fetch supplier data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSuppliers();
  }, []);

  const handleSort = (option) => {
    setSortOption(option);
    const sortedSuppliers = [...allSuppliers].sort((a, b) => {
      if (option === "name")
        return a.nama_supplier.localeCompare(b.nama_supplier);
      return 0;
    });
    setAllSuppliers(sortedSuppliers);
  };

  const handleFilter = (option) => {
    setFilterOption(option);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const { error } = await supabase
          .from("supplier")
          .delete()
          .match({ id });
        if (error) throw error;

        // Reload the suppliers after deletion
        await getAllSuppliers();

        Swal.fire("Deleted!", "Supplier has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete supplier", error);
        Swal.fire("Error!", "Failed to delete supplier.", "error");
      }
    }
  };

  const filteredSuppliers = allSuppliers
    .filter((item) =>
      item.nama_supplier.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      if (filterOption === "") return true;
      return item.kategori === filterOption;
    });

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <Spinner
            size="lg"
            color="secondary"
            label={<span className="text-white">Loading...</span>}
          />
        </div>
      ) : (
        <section id="table-supplier" className="p-8 bg-gray-900 min-h-screen">
          <div className="flex justify-between mb-5 items-center">
            <h2 className="text-4xl font-bold text-white">Suppliers</h2>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
              onPress={onOpen}
            >
              + Tambah Supplier
            </Button>
            <ModalSupplier
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              onOpen={onOpen}
            />
          </div>

          <div className="flex flex-wrap mb-5 gap-4">
            <div className="relative w-full max-w-md flex-grow">
              <FaSearch className="absolute left-2 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search supplier..."
                className="p-2 pl-10 w-full rounded-md border border-gray-600 text-white bg-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              onChange={(e) => handleSort(e.target.value)}
              className="p-2 rounded-md text-white bg-gray-800 border border-gray-600 w-full sm:w-1/4"
            >
              <option value="">Sort By</option>
              <option value="name">Sort by Name</option>
            </select>

            <select
              onChange={(e) => handleFilter(e.target.value)}
              className="p-2 rounded-md text-white bg-gray-800 border border-gray-600 w-full sm:w-1/4"
            >
              <option value="">Filter by Category</option>
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
              <option value="services">Services</option>
            </select>
          </div>

          {filteredSuppliers.length > 0 ? (
            <TablePaginate
              allSuppliers={filteredSuppliers}
              loading={loading}
              rowsPerPage={rowsPerPage}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center text-white text-xl">
              Maaf, Tidak ada supplier terkait
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Supplier;
