import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from "./nextui/EyeIcon";
import { EditIcon } from "./nextui/EditIcon";
import { DeleteIcon } from "./nextui/DeleteIcon";
import useFormatRupiah from "../hooks/useFormatRupiah.jsx";
import useTruncateText from "../hooks/useTruncate";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../../utils/SupaClient";

const getKeyValue = (obj, key) => {
  return obj[key] !== undefined ? obj[key] : "";
};

const columns = [
  { key: "foto_barang", label: "Foto Barang" },
  { key: "nama_barang", label: "Nama Barang" },
  { key: "harga_barang", label: "Harga" },
  { key: "jenis_barang", label: "Jenis Barang" },
  { key: "stok", label: "Stok" },
  { key: "deskripsi", label: "Deskripsi" },
  { key: "action", label: "Action" },
];

export default function TablePaginate({ allBarang }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(allBarang.length / rowsPerPage);
  const { formatRupiah } = useFormatRupiah();
  const { truncateText } = useTruncateText();

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return allBarang.slice(start, end);
  }, [page, allBarang]);

  const deleteBarangById = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { error } = await supabase.from("barang").delete().eq("id", id);
          if (error) {
            console.error(error);
          } else {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            const updatedBarang = allBarang.filter(
              (barang) => barang.id !== id
            );
            setPage(1);

            allBarang(updatedBarang);
          }
        } catch (error) {
          console.error("Error deleting barang:", error);
        }
      }
    });
  };

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="success"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px] bg-[#18181B] shadow-lg",
      }}
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn key={col.key} className="text-white bg-[#27272A]">
            {col.label}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow
            key={item.id}
            className="hover:bg-gray-700 transition-colors duration-200"
          >
            {(columnKey) => (
              <TableCell key={columnKey} className="text-white">
                {columnKey === "foto_barang" ? (
                  <img
                    src={item.foto_barang}
                    alt={item.nama_barang}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : columnKey === "action" ? (
                  <div className="relative flex items-center gap-5">
                    <Link to={`/edit/${item.id}`}>
                      <Tooltip content="Ubah Barang">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Tooltip>
                    </Link>
                    <Tooltip color="danger" content="Hapus Barang">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => deleteBarangById(item.id)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                ) : columnKey === "harga_barang" ? (
                  formatRupiah(getKeyValue(item, columnKey))
                ) : columnKey === "jenis_barang" ? (
                  <span className="capitalize">
                    {getKeyValue(item, columnKey)}
                  </span>
                ) : columnKey === "deskripsi" ? (
                  truncateText(getKeyValue(item, columnKey), 30)
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}