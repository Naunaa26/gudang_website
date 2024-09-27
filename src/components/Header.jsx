import React, { useState } from "react";
import PersistentDrawer from "./PersistentDrawer";
import DropdownUser from "./DropdownUser";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const pageName =
    location.pathname === "/"
      ? "Dashboard"
      : location.pathname === "/tabel"
      ? "Tabel Barang"
      : location.pathname === "/semua-barang"
      ? "Semua Barang"
      : location.pathname === "/supplier"
      ? "Supplier"
      : location.pathname === "/semua-supplier"
      ? "Semua Supplier"
      : "Page Not Found";

  return (
    <div className="flex items-center justify-between p-2 md:p-4 bg-gradient-to-r from-[#1F1F1F] to-[#2C2C2C] text-white border-b border-gray-700">
      <PersistentDrawer />

      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="text-base md:text-lg font-semibold">Warehouse</div>
        <div className="text-base md:text-lg font-semibold">/</div>
        <div className="text-sm md:text-base font-normal" id="title">
          {pageName}
        </div>
      </div>

      <div className="flex ml-auto items-center mr-1 space-x-2 md:space-x-4">
        <div className="p-2 px-6 md:p-2 mr-1 md:px-6 bg-gradient-to-r from-[#3A3A3A] to-[#4E4E4E] text-xs md:text-base text-white rounded-full hover:from-[#4E4E4E] hover:to-[#3A3A3A] cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
          Login
        </div>

        <div className="w-8 h-8 md:w-auto md:h-auto">
          <DropdownUser />
        </div>
      </div>
    </div>
  );
};

export default Header;
