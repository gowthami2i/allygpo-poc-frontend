import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import "./appTable.scss";
import { IAppTable } from "../../types/components/appTable";

const AppTable = (props: IAppTable) => {
  const { columns, data } = props;
  const [page, setPage] = useState(0); // Tracks the starting row
  const pageCount = 5;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageCount,
      },
    },
  });

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage(event.first);
    table.setPageIndex(Math.floor(event.first / pageCount));
  };

  return (
    <div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "var(--app-bgWhite)",
          borderTop: "1px solid var(--app-borderColor)",
          borderBottom: "1px solid var(--app-borderColor)",
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              style={{
                borderBottom: "1px solid var(--app-borderColor)",
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
                      borderBottom: "1px solid var(--app-borderColor)",
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
              <td className="view-details">View Details</td>
              <td
                style={{
                  borderBottom: "1px solid var(--app-borderColor)",
                  padding: "14px 16px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <i
                  className="pi pi-trash"
                  style={{ color: "var(--app-dangerColor)" }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator
        first={page}
        rows={pageCount}
        totalRecords={data.length}
        onPageChange={onPageChange}
        template="PrevPageLink PageLinks NextPageLink"
        style={{
          marginBottom: "19px",
          display: "flex",
          justifyContent: "center",
          height: "75px",
          borderRadius: 0,
        }}
        className="custom-paginator"
      />
    </div>
  );
};

export default AppTable;
