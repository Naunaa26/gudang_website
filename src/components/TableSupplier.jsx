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
import { EditIcon } from "./nextui/EditIcon";
import { DeleteIcon } from "./nextui/DeleteIcon";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../../utils/SupaClient";

const getKeyValue = (obj, key) => {
  return obj[key] !== undefined ? obj[key] : "";
};

const columns = [
  { key: "logo_supplier", label: "Logo" },
  { key: "nama_supplier", label: "Nama Supplier" },
  { key: "no_hp", label: "No. HP" },
  { key: "kategori", label: "Kategori" },
  { key: "alamat", label: "Alamat" },
  { key: "email", label: "Email" },
  { key: "action", label: "Action" },
];

export default function TableSupplier({ allSuppliers, refreshSuppliers }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(allSuppliers.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return allSuppliers.slice(start, end);
  }, [page, allSuppliers]);

  const deleteSupplierById = async (id) => {
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
          const { error } = await supabase
            .from("supplier")
            .delete()
            .eq("id", id);
          if (error) {
            console.error(error);
          } else {
            Swal.fire({
              title: "Deleted!",
              text: "The supplier has been deleted.",
              icon: "success",
            });
            refreshSuppliers(); // Call refresh function to reload supplier data
          }
        } catch (error) {
          console.error("Error deleting supplier:", error);
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table
        aria-label="Table of Suppliers"
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
                  {columnKey === "logo_supplier" ? (
                    <img
                      src={item.logo_supplier}
                      alt={item.nama_supplier}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : columnKey === "action" ? (
                    <div className="relative flex items-center gap-5">
                      <Link to={`/edit-supplier/${item.id}`}>
                        <Tooltip content="Edit Supplier">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                          </span>
                        </Tooltip>
                      </Link>
                      <Tooltip color="danger" content="Delete Supplier">
                        <span
                          className="text-lg text-danger cursor-pointer active:opacity-50"
                          onClick={() => deleteSupplierById(item.id)}
                        >
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </div>
                  ) : (
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {getKeyValue(item, columnKey)}
                    </div>
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
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
    </div>
  );
}
