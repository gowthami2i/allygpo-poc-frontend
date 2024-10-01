import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import "primeicons/primeicons.css";
import { IData } from "../../types/components/appTable";
import { data } from "./data";

const columns: ColumnDef<IData>[] = [
  {
    header: "Document",
    accessorKey: "document",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Contract Type",
    accessorKey: "contractType",
  },
  {
    header: "Date uploaded",
    accessorKey: "dateUploaded",
  },
];

const AppTable: React.FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          background: "#fff",
          border: "1px solid #E0E0E0",
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              style={{
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    fontWeight: "500",

                    fontSize: "14px",
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    style={{
                      borderBottom: "1px solid #E0E0E0",
                      padding: "14px 16px",
                      fontSize: "14px",
                      fontWeight:
                        cell?.column.columnDef?.accessorKey === "document"
                          ? 600
                          : 400,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
              <td
                style={{
                  borderBottom: "1px solid #E0E0E0",
                  padding: "14px 16px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#095192",
                }}
              >
                View Details
              </td>
              <td
                style={{
                  borderBottom: "1px solid #E0E0E0",
                  padding: "14px 16px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#095192",
                }}
              >
                <i className="pi pi-trash" style={{ color: "#D9342B" }}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppTable;
