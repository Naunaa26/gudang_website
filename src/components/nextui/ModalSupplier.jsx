import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBuilding,
  faEnvelope,
  faPhone,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../utils/SupaClient";
import Swal from "sweetalert2";

const ModalSupplier = ({ isOpen, onOpenChange }) => {
  const [formData, setFormData] = useState({
    nama_supplier: "",
    alamat: "",
    email: "",
    no_hp: "",
    logo_supplier: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from("supplier")
        .insert([formData]);

      if (error) {
        console.error("Error inserting data:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal Menambahkan Supplier Ke Database.",
          icon: "error",
        });
      } else {
        console.log("Data inserted successfully:", data);
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil Menambahkan Supplier Ke Database!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            // Reset form data
            setFormData({
              nama_supplier: "",
              alamat: "",
              email: "",
              no_hp: "",
              logo_supplier: "",
            });
            // Close the modal
            onOpenChange(false);
            // Reload the page
            window.location.reload(); // This will refresh the page
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <ModalContent className="bg-[#18181B] max-h-[90vh] overflow-y-auto">
        <ModalHeader className="text-white">Tambah Supplier</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <div className="flex items-center text-white gap-2 mb-2">
                  <FontAwesomeIcon icon={faUser} />
                  <span>Nama Supplier</span>
                </div>
                <Input
                  type="text"
                  placeholder="Masukkan Nama Supplier"
                  labelPlacement="outside"
                  name="nama_supplier"
                  value={formData.nama_supplier}
                  onChange={handleChange}
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center text-white gap-2 mb-2">
                  <FontAwesomeIcon icon={faBuilding} />
                  <span>Alamat</span>
                </div>
                <Input
                  type="text"
                  placeholder="Masukkan Alamat"
                  labelPlacement="outside"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center text-white gap-2 mb-2">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>Email</span>
                </div>
                <Input
                  type="email"
                  placeholder="Masukkan Email"
                  labelPlacement="outside"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center text-white gap-2 mb-2">
                  <FontAwesomeIcon icon={faPhone} />
                  <span>No HP</span>
                </div>
                <Input
                  type="tel"
                  placeholder="Masukkan Nomor HP"
                  labelPlacement="outside"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center text-white gap-2 mb-2">
                  <FontAwesomeIcon icon={faImage} />
                  <span>Link Gambar</span>
                </div>
                <Input
                  type="text"
                  placeholder="Masukkan Link Gambar"
                  labelPlacement="outside"
                  name="logo_supplier"
                  value={formData.logo_supplier}
                  onChange={handleChange}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="flex flex-col sm:flex-row">
            <Button
              color="danger"
              variant="solid"
              onPress={() => onOpenChange(false)}
              className="w-full sm:w-auto mb-2 sm:mb-0"
            >
              Close
            </Button>
            <Button color="primary" type="submit" className="w-full sm:w-auto">
              Tambah Supplier
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalSupplier;
