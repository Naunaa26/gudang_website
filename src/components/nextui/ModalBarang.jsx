import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faMoneyBill,
  faBox,
  faUtensils,
  faInfoCircle,
  faList,
  faCamera,
  faTshirt,
  faFlask,
  faCar,
  faBook,
  faPills,
  faHammer,
  faCoffee,
  faGamepad,
  faCouch,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../utils/SupaClient";
import Swal from "sweetalert2";

export default function ModalBarang({ isOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    nama_barang: "",
    harga_barang: "",
    stok: "",
    deskripsi: "",
    jenis_barang: "",
    foto_barang: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      jenis_barang: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.from("barang").insert([formData]);

      if (error) {
        console.error("Error inserting data:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal Menambahkan Barang Ke Database.",
          icon: "error",
        });
      } else {
        console.log("Data inserted successfully:", data);
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil Menambahkan Barang Ke Database!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            setFormData({
              nama_barang: "",
              harga_barang: "",
              stok: "",
              deskripsi: "",
              jenis_barang: "",
              foto_barang: "",
            });
            onOpenChange(false);
            window.location.reload();
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
        <ModalHeader className="text-white">Tambah Barang</ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <div className="flex items-center text-white gap-2 mb-2">
                  <FontAwesomeIcon icon={faTag} />
                  <span>Nama Barang</span>
                </div>
                <Input
                  type="text"
                  placeholder="Masukkan Nama Barang"
                  labelPlacement="outside"
                  name="nama_barang"
                  value={formData.nama_barang}
                  onChange={handleChange}
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center text-white gap-2 mb-2">
                  <FontAwesomeIcon icon={faCamera} />
                  <span>Gambar Barang</span>
                </div>
                <Input
                  type="text"
                  placeholder="Masukkan URL Gambar"
                  labelPlacement="outside"
                  name="foto_barang"
                  value={formData.foto_barang}
                  onChange={handleChange}
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center text-white gap-2 mb-2">
                  <FontAwesomeIcon icon={faList} />
                  <span>Jenis Barang</span>
                </div>
                <Select
                  required
                  radius="sm"
                  placeholder="Pilih Jenis Barang"
                  value={formData.jenis_barang} // Set the selected value here
                  onValueChange={handleSelectChange}
                  className="w-full sm:w-auto"
                >
                  <SelectItem value="makanan">
                    <FontAwesomeIcon icon={faUtensils} /> Makanan
                  </SelectItem>
                  <SelectItem value="minuman">
                    <FontAwesomeIcon icon={faCoffee} /> Minuman
                  </SelectItem>
                  <SelectItem value="mainan">
                    <FontAwesomeIcon icon={faGamepad} /> Mainan
                  </SelectItem>
                  <SelectItem value="pakaian">
                    <FontAwesomeIcon icon={faTshirt} /> Pakaian
                  </SelectItem>
                  <SelectItem value="kosmetik">
                    <FontAwesomeIcon icon={faFlask} /> Kosmetik dan Perawatan
                    Diri
                  </SelectItem>
                  <SelectItem value="otomotif">
                    <FontAwesomeIcon icon={faCar} /> Otomotif
                  </SelectItem>
                  <SelectItem value="buku">
                    <FontAwesomeIcon icon={faBook} /> Buku dan Alat Tulis
                  </SelectItem>
                  <SelectItem value="obat">
                    <FontAwesomeIcon icon={faPills} /> Obat-obatan dan Alat
                    Kesehatan
                  </SelectItem>
                  <SelectItem value="bahan_bangunan">
                    <FontAwesomeIcon icon={faHammer} /> Bahan Bangunan
                  </SelectItem>
                  <SelectItem value="peralatan_rumah">
                    <FontAwesomeIcon icon={faCouch} /> Peralatan Rumah Tangga
                  </SelectItem>
                  <SelectItem value="elektronik">
                    <FontAwesomeIcon icon={faTv} /> Elektronik
                  </SelectItem>
                </Select>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center text-white gap-2 mb-2">
                  <FontAwesomeIcon icon={faMoneyBill} />
                  <span>Harga</span>
                </div>
                <Input
                  type="text"
                  placeholder="Masukkan Harga"
                  labelPlacement="outside"
                  name="harga_barang"
                  value={formData.harga_barang}
                  onChange={handleChange}
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center text-white gap-2 mb-2">
                  <FontAwesomeIcon icon={faBox} />
                  <span>Stok</span>
                </div>
                <Input
                  type="number"
                  placeholder="Masukkan Stok"
                  labelPlacement="outside"
                  name="stok"
                  value={formData.stok}
                  onChange={handleChange}
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center text-white gap-2 mb-2">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>Deskripsi</span>
                </div>
                <Textarea
                  placeholder="Masukkan Deskripsi"
                  radius="sm"
                  name="deskripsi"
                  value={formData.deskripsi}
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
              Tambah Barang
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
