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
  const { columns, data, pageCount } = props;
  const [page, setPage] = useState(0);

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
      <table className="table-container">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="cell-border">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="table-header">
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
                    className="table-data"
                    style={{
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
              <td className="table-data view-details-txt">
                <i className="pi pi-trash trash"></i>
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
        className="custom-paginator pagination"
      />
    </div>
  );
};

export default AppTable;
