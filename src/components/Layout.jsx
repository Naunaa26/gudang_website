import React from "react";

const Layout = () => {
  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-900">
      <div className="absolute inset-0 bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20230425/pngtree-warehouse-warehouses-with-many-boxes-image_2515070.jpg')] bg-cover bg-center opacity-50"></div>

      <section className="relative bg-white bg-opacity-30 backdrop-blur-lg text-black p-8 rounded-lg shadow-2xl max-w-2xl mx-4 text-center">
        {/* Teks Utama */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
          Welcome to the Admin Panel
        </h1>

        {/* Salam Pengguna */}
        <div className="bg-white bg-opacity-40 sm:p-6 p-4 rounded-lg w-full mb-6">
          <p className="text-xl sm:text-3xl font-semibold text-gray-800">
            Hello, M. Naufal T
          </p>
        </div>

        {/* Deskripsi */}
        <p className="text-base sm:text-lg text-white leading-relaxed">
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
