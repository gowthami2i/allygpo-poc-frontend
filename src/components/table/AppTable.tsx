import React, { useState } from "react";
import { flexRender } from "@tanstack/react-table";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import "./appTable.scss";
import { IAppTable, IHeaderGroup } from "../../types/components/appTable";

const AppTable = (props: IAppTable) => {
  const { table, data, pageCount, extraData } = props;
  const [page, setPage] = useState(0);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage(event.first);
    table.setPageIndex(Math.floor(event.first / pageCount));
  };

  return (
    <div>
      <table className="table-container">
        <thead>
          {table.getHeaderGroups().map((headerGroup: IHeaderGroup) => (
            <tr key={headerGroup.id} className="cell-border">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="table-header">
                  {flexRender(
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
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="table-data">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="extra-data">{extraData.link}</td>
              <td className="table-data extra-data-txt icon">
                <i className={extraData.icon}></i>
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
