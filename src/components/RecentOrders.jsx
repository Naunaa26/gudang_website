import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/SupaClient";
import { Spinner } from "@nextui-org/spinner";
import { FaSearch } from "react-icons/fa";

const RecentOrders = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("orders")
          .select("id, customer_name, total, status, created_at")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setRecentOrders(data);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  // Filter orders based on search term
  const filteredOrders = recentOrders.filter((order) =>
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastOrder = currentPage * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Currency formatting function
  const formatCurrency = (amount) => {
    return "Rp " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Recent Orders</h3>
        <div className="relative w-full max-w-xs">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer..."
            className="p-2 pl-10 w-full rounded-md bg-gray-700 text-white border border-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner size="lg" color="secondary" />
        </div>
      ) : currentOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-white">
            <thead>
              <tr className="bg-gray-700 text-gray-400 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Customer</th>
                <th className="py-3 px-6 text-left">Order Total</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm font-light">
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-6 text-left">{order.customer_name}</td>
                  <td className="py-3 px-6 text-left">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`py-1 px-3 rounded-full text-xs font-semibold ${
                        order.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : order.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4 sm:justify-center">
            <button
              className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-500 disabled:opacity-50 sm:mr-auto"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-white mx-4 sm:mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-500 disabled:opacity-50 sm:ml-auto"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No recent orders</div>
      )}
    </div>
  );
};

export default RecentOrders;
