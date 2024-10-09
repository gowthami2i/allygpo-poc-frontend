import { ColumnDef } from "@tanstack/react-table";

export interface IData {
  document: string;
  description: string;
  contractType: string;
  dateUploaded: string;
}

export interface IAppTable {
  columns: ColumnDef<IData>[];
  data: IData[];
  pageCount: number;
  table: any;
  extraData: {
    link: string;
    icon: string;
  };
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
