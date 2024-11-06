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

  const filteredOrders = recentOrders.filter((order) =>
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const formatCurrency = (amount) => {
    return "Rp " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <section className="dark:bg-[#140620] bg-[#124670] min-h-[100px] text-white">
        <div className="bg-[#57b0f8]  dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Recent Orders
            </h3>
            <div className="relative w-full max-w-xs">
              <FaSearch className="absolute left-3 top-3 text-gray-200" />
              <input
                type="text"
                placeholder="Search by customer..."
                className="p-2 pl-10 w-full rounded-md bg-[#2d78b6] placeholder:text-white  dark:bg-gray-700 text-white dark:text-white border border-gray-300 dark:border-gray-600"
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
              <table className="min-w-full table-auto text-gray-800 dark:text-gray-200">
                <thead>
                  <tr className="bg-[#2672b1] rounded-lg dark:bg-gray-700 dark:text-gray-300 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Customer</th>
                    <th className="py-3 px-6 text-left">Order Total</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Date</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300 text-sm font-light">
                  {currentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-300 dark:border-gray-600 hover:bg-[#326fa1] dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-3 px-6 text-left text-black dark:text-white">
                        {order.customer_name}
                      </td>
                      <td className="py-3 px-6 text-left text-black dark:text-white">
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
                      <td className="py-3 px-6 text-center text-black dark:text-white">
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
                <span className="text-black dark:text-white mx-4 sm:mx-2">
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
            <div className="text-center text-gray-500 dark:text-gray-400">
              No recent orders
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RecentOrders;
