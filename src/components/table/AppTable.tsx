import React, { useState } from "react";
import { flexRender } from "@tanstack/react-table";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import "./appTable.scss";
import { useDelete } from "../../hook/useDelete";
import { ColumnDef } from "@tanstack/react-table";

export interface IData {
  document: any;
  description: string;
  contractType: string;
  dateUploaded: string;
}

export interface IAppTableProps {
  columns: ColumnDef<any>[];
  data: any[];
  pageCount?: number;
  table: any;
  paginator?: boolean;
}

export interface Column {
  id: string;
  parent?: Column;
  depth: number;
  columnDef: {
    header: string | (() => JSX.Element);
    accessorFn: ((row: any) => any) | undefined;
    cell?: (info: any) => JSX.Element | string;
  };
  accessorFn?: (row: any) => any;
}

export interface IHeaderGroup {
  depth: number;
  id: string;
  headers: Header[];
}

export interface Header {
  colSpan: number;
  column: Column;
  depth: number;
  getContext: () => {
    table: any;
    header: Header;
    column: Column;
  };
  getLeafHeaders: () => Header[];
  getResizeHandler: (event: Document) => void;
  getSize: () => number;
  getStart: () => number;
  headerGroup: IHeaderGroup;
  id: string;
  index: number;
  isPlaceholder: boolean;
  placeholderId?: string;
  rowSpan: number;
  subHeaders: Header[];
}

const AppTable = (props: IAppTableProps) => {
  const { table, data, pageCount = 0, paginator } = props;
  const { mutate: deleteDocument } = useDelete();

  const [page, setPage] = useState(0);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage(event.first);
    table.setPageIndex(Math.floor(event.first / pageCount));
  };

  const handleDelete = () => {
    const documentId = "doc";
    deleteDocument(
      { document_id: documentId }, // Pass the document_id as expected by the mutation
      {
        onSuccess: () => {
          console.log("Document deleted successfully");
        },
        onError: (error) => {
          console.error("Error deleting document:", error);
        },
      }
    );
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
