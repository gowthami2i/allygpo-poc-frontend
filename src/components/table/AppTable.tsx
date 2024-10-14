import React, { useState } from "react";
import { flexRender } from "@tanstack/react-table";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import "./appTable.scss";
import { IAppTable, IHeaderGroup } from "../../types/components/appTable";

const AppTable = (props: IAppTable) => {
  const { table, data, pageCount = 0, paginator } = props;
  const [page, setPage] = useState(0);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage(event.first);
    table.setPageIndex(Math.floor(event.first / pageCount));
  };

  return (
    <div>
      <table className="table-container">
        <thead>
          {table.getHeaderGroups()?.map((headerGroup: IHeaderGroup) => (
            <tr
              key={headerGroup.id}
              className="cell-border sticky top-0 bg-white"
            >
              {headerGroup.headers?.map((header, index) => (
                <th key={index} className="table-header">
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
          {table.getRowModel()?.rows?.map((row: any, index: number) => (
            <tr key={index}>
              {row.getVisibleCells()?.map((cell: any, index: number) => (
                <td key={index} className="table-data">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {paginator && (
        <Paginator
          first={page}
          rows={pageCount}
          totalRecords={data.length}
          onPageChange={onPageChange}
          template="PrevPageLink PageLinks NextPageLink"
          className="custom-paginator pagination"
        />
      )}
    </div>
  );
};

export default AppTable;
