import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import TableBarang from "./pages/TableBarang";
import DetailBarang from "./pages/barang/DetailBarang";
import UbahBarang from "./pages/barang/UbahBarang";
import Supplier from "./pages/Supplier";
import AllBarang from "./pages/AllBarang";
import AllSupplier from "./pages/AllSupplier";
import DetailSupplier from "./pages/supplier/DetailSupplier";
import UbahSupplier from "./pages/supplier/UbahSupplier";
import UbahProfiles from "./pages/profille/UbahProfiles";
import Login from "./auth/Login";
import AuthAdmin from "./auth/AuthAdmin";
import Profile from "./pages/Profile";
import Swal from "sweetalert2";

const App = () => {
  const [barang, setBarang] = useState([]);

  const getDataSupabase = async () => {
    const { data, error } = await supabase.from("barang").select("*");

    if (error) {
      console.error("Error fetching data: ", error);
      return;
    }

    setBarang(data);
  };

  useEffect(() => {
    getDataSupabase();
  }, []);

  useEffect(() => {
    // Cek jika notifikasi sudah pernah ditampilkan menggunakan localStorage
    const isNotificationShown = localStorage.getItem("notificationShown");

    if (!isNotificationShown) {
      // Tampilkan notifikasi
      Swal.fire({
        title: "Pemberitahuan",
        text: "Maaf, dark mode belum bekerja dengan sempurna. Maaf atas ketidaknyamanannya.",
        icon: "info",
        confirmButtonText: "OK",
        background: "#333",
        color: "#fff",
      }).then(() => {
        // Setelah tombol OK ditekan, simpan status notifikasi sudah ditampilkan
        localStorage.setItem("notificationShown", "true");
      });
    }
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/tabel" element={<TableBarang />} />
        <Route path="/semua-supplier" element={<AllSupplier />} />
        <Route path="/semua-barang" element={<AllBarang />} />
        <Route path="/detail-supplier/:id" element={<DetailSupplier />} />
        <Route path="/edit-profile" element={<UbahProfiles />} />
        <Route path="/detail/:id" element={<DetailBarang />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route element={<AuthAdmin />}>
          <Route path="/edit/:id" element={<UbahBarang />} />
          <Route path="/edit-supplier/:id" element={<UbahSupplier />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
