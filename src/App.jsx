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

const App = () => {
  const [barang, setBarang] = useState([]);

  const getDataSupabase = async () => {
    const { data, error } = await supabase.from("barang").select("*");

    setBarang(data);
  };

  useEffect(() => {
    getDataSupabase();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tabel" element={<TableBarang />} />
        <Route path="/semua-supplier" element={<AllSupplier />} />
        <Route path="/semua-barang" element={<AllBarang />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/detail-supplier/:id" element={<DetailSupplier />} />
        <Route path="/detail/:id" element={<DetailBarang />} />
        <Route path="/edit/:id" element={<UbahBarang />} />
        <Route path="/edit-supplier/:id" element={<UbahSupplier />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
