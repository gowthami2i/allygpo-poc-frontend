import { ColumnDef } from "@tanstack/react-table";

export interface IData {
  document: string;
  description: string;
  contractType: string;
  dateUploaded: string;
}

export interface IColumn {
  header: string;
  accessorKey: string;
}
export interface IAppTable {
  columns: ColumnDef<IData>[];
  data: IData[];
  pageCount: number;
}
