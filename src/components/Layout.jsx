import React from "react";

const Layout = () => {
  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="absolute inset-0 bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20230425/pngtree-warehouse-warehouses-with-many-boxes-image_2515070.jpg')] bg-cover bg-center opacity-80"></div>

      <section className="relative bg-[#57b0f8] dark:bg-gray-800  text-gray-800 dark:text-white p-8 rounded-lg shadow-2xl max-w-2xl mx-4 text-center">
        {" "}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Welcome to the Admin Panel
        </h1>
        <div className="bg-white bg-opacity-30 dark:bg-gray-700 dark:bg-opacity-40 sm:p-6 p-4 rounded-lg w-full mb-6">
          <p className="text-xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Hello, {import.meta.env.VITE_NAMA_USER}
          </p>
        </div>
        <p className="text-base sm:text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
          Welcome to the administrator's panel. This dashboard allows you to
          manage various tasks, view important reports, and control system data
          efficiently. Please ensure that you handle all operations carefully to
          maintain the integrity and performance of the system.
        </p>
      </section>
    </div>
  );
};

export default Layout;
