import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/SupaClient";
import PersistentDrawer from "./PersistentDrawer";
import DropdownUser from "./DropdownUser";
import Theme from "./Theme";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
      ? "Tabel Supplier"
      : location.pathname === "/semua-supplier"
      ? "Semua Supplier"
      : location.pathname === "/login"
      ? "Login"
      : location.pathname === "/profile"
      ? "Profile"
      : location.pathname === "/edit-profile"
      ? "Edit Profile"
      : "Page Not Found";

  useEffect(() => {
    const checkUserRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: roles } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        setIsAdmin(roles?.role === "admin");
      }
    };

    checkUserRole();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowLogoutPopup(true);

    setTimeout(() => {
      setShowLogoutPopup(false);
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-4 bg-[#57b0f8] dark:bg-gray-800 text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-700 relative">
      <div className="flex items-center justify-between w-full md:w-auto">
        <PersistentDrawer />
        <div className="flex items-center space-x-1 md:space-x-2 ml-2">
          <div className="text-base md:text-lg font-semibold">Warehouse</div>
          <div className="text-base md:text-lg font-semibold">/</div>
          <div className="text-sm md:text-base font-normal" id="title">
            {pageName}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center mt-2 md:mt-0 md:ml-auto space-x-2 md:space-x-4">
        {!user && !isAdmin && (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="rounded-2xl bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold px-4 py-1 md:px-8 md:py-2 hover:from-gray-400 hover:to-gray-600 transition-colors duration-200"
          >
            Login
          </button>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold px-4 py-1 md:px-8 md:py-2 rounded-2xl hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        )}
        <Theme />
        <DropdownUser />
      </div>

      {/* Popup Notification */}
      {showLogoutPopup && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 md:p-4 rounded-md shadow-lg z-50 max-w-[90%] md:max-w-xs text-center">
          <div className="flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m2 2a9 9 0 11-9-9 9 9 0 019 9z"
              />
            </svg>
            <span className="text-sm md:text-base">
              You have successfully logged out!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
