// import { useState } from "react";
// import { flexRender } from "@tanstack/react-table";
// import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
// import "./appTable.scss";
// import Typography from "../typography/Typography";
// import { TextVariant } from "../../../constants/appConstants";

// export interface IData {
//   id: number;
//   document: any;
//   description: string;
//   contractType: string;
//   dateUploaded: string;
// }

// export interface IAppTableProps {
//   columns: any;
//   data: any[];
//   pageCount?: number;
//   table: any;
//   paginator?: boolean;
// }

// export interface Column {
//   id: string;
//   parent?: Column;
//   depth: number;
//   columnDef: {
//     header: string | (() => JSX.Element);
//     accessorFn: ((row: any) => any) | undefined;
//     cell?: (info: any) => JSX.Element | string;
//     width?: string;
//   };
//   accessorFn?: (row: any) => any;
// }

// export interface IHeaderGroup {
//   depth: number;
//   id: string;
//   headers: Header[];
// }

// export interface Header {
//   colSpan: number;
//   column: Column;
//   depth: number;
//   getContext: () => {
//     table: any;
//     header: Header;
//     column: Column;
//   };
//   getLeafHeaders: () => Header[];
//   getResizeHandler: (event: Document) => void;
//   getSize: () => number;
//   getStart: () => number;
//   headerGroup: IHeaderGroup;
//   id: string;
//   index: number;
//   isPlaceholder: boolean;
//   placeholderId?: string;
//   rowSpan: number;
//   subHeaders: Header[];
// }
// const AppTable = (props: IAppTableProps) => {
//   const { table, data, columns, pageCount = 0, paginator } = props;
//   const [page, setPage] = useState(0);

//   const onPageChange = (event: PaginatorPageChangeEvent) => {
//     setPage(event.first);
//     table.setPageIndex(Math.floor(event.first / pageCount));
//   };

//   return (
//     <div>
//       {data?.length && table.getRowModel()?.rows?.length ? (
//         <table className="table-container">
//           <thead>
//             {table.getHeaderGroups()?.map((headerGroup: IHeaderGroup) => (
//               <tr
//                 key={headerGroup.id}
//                 className="cell-border sticky top-0 bg-white"
//               >
//                 {headerGroup.headers?.map((header, index) => (
//                   <th
//                     key={index}
//                     className="table-header"
//                     style={{ width: columns[index]?.width || "auto" }}
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>

//           <tbody>
//             {table.getRowModel()?.rows?.map((row: any, index: number) => (
//               <tr key={index}>
//                 {row.getVisibleCells()?.map((cell: any, index: number) => {
//                   return (
//                     <td
//                       key={index}
//                       className="table-data"
//                       style={{
//                         minWidth: cell.column?.columnDef?.width
//                           ? cell.column?.columnDef?.width
//                           : "auto",
//                       }}
//                     >

//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="flex justify-content-center align-items-center h-20rem">
//           <Typography variant={TextVariant.BODY1}>No Data</Typography>
//         </div>
//       )}
//       {paginator && data?.length > pageCount && (
//         <Paginator
//           first={page}
//           rows={pageCount}
//           totalRecords={data.length}
//           onPageChange={onPageChange}
//           template="PrevPageLink PageLinks NextPageLink"
//           className="custom-paginator pagination"
//         />
//       )}
//     </div>
//   );
// };

// export default AppTable;

import { useState } from "react";
import { flexRender } from "@tanstack/react-table";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { Checkbox } from "primereact/checkbox"; // Import Checkbox
import "./appTable.scss";
import Typography from "../typography/Typography";
import { TextVariant } from "../../../constants/appConstants";

export interface IData {
  id: number;
  document: any;
  description: string;
  contractType: string;
  dateUploaded: string;
}

export interface IAppTableProps {
  columns: any;
  data: any[];
  pageCount?: number;
  table: any;
  paginator?: boolean;
  showCheckbox?: boolean; // New Prop
  setChecked?: any;
  selectedRows?:any;
  setSelectedRows?:any;
  handleCheckboxChange?:any;
}

const AppTable = (props: IAppTableProps) => {
  const {
    table,
    data,
    columns,
    pageCount = 0,
    paginator,
    showCheckbox = true,
    setChecked,
    selectedRows,
    setSelectedRows,
    handleCheckboxChange
  } = props;
  const [page, setPage] = useState(0);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage(event.first);
    table.setPageIndex(Math.floor(event.first / pageCount));
  };
  
  // const handleCheckboxChange = (row: any, isChecked: boolean) => {
  //   console.log(row, "com");
  //   setSelectedRows((prev: any) => {
  //     if (isChecked) {
  //       setChecked(true);
  //       return [...prev, row];
  //     } else {
  //       setChecked(false);
  //       return prev.filter(
  //         (selectedRow: any) => selectedRow.documentName !== row.documentName
  //       );
  //     }
  //   });
  // };
  console.log(selectedRows, "select");
  return (
    <div>
      {data?.length && table.getRowModel()?.rows?.length ? (
        <table className="table-container">
          <thead>
            {table.getHeaderGroups()?.map((headerGroup: any) => (
              <tr
                key={headerGroup.id}
                className="cell-border sticky top-0 bg-white"
              >
                {showCheckbox && <th className="table-header">Select</th>}
                {headerGroup.headers?.map((header: any, index: any) => (
                  <th
                    key={index}
                    className="table-header"
                    style={{ width: columns[index]?.width || "auto" }}
                  >
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
            {table.getRowModel()?.rows?.map((row: any, rowIndex: number) => (
              <tr key={rowIndex}>
                {showCheckbox && (
                  <td className="table-data">
                    <Checkbox
                      onChange={(e: any) => {
                        handleCheckboxChange(row.original, e.checked);
                        console.log(row.original.documentName, "ff", e.checked);
                      }}
                      checked={selectedRows?.some(
                        (selectedRow: any) =>
                          selectedRow.documentName === row.original.documentName
                      )}
                    />
                  </td>
                )}
                {row.getVisibleCells()?.map((cell: any, cellIndex: number) => (
                  <td
                    key={cellIndex}
                    className="table-data"
                    style={{
                      minWidth: cell.column?.columnDef?.width
                        ? cell.column?.columnDef?.width
                        : "auto",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-content-center align-items-center h-20rem">
          <Typography variant={TextVariant.BODY1}>No Data</Typography>
        </div>
      )}
      {paginator && data?.length > pageCount && (
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
