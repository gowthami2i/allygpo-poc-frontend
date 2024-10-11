import React from "react";
import { ColumnDef } from "@tanstack/react-table";

export interface IPastTopics {
  question: string;
  createdDate: string;
  id: number;
}

export const getPastTopicsColumn = (
  navigateTo: any
): ColumnDef<IPastTopics>[] => {
  return [
    {
      header: "Topic",
      accessorKey: "question",
      cell: ({ getValue }: any) => (
        <span className="document-data">{getValue()}</span>
      ),
    },
    {
      header: "Date",
      accessorKey: "createdDate",
    },
    {
      header: "",
      accessorKey: "id",
      cell: ({ cell }) => (
        <span
          className="extra-data"
          onClick={() => {
            navigateTo("view-details", cell.row.original);
          }}
        >
          Load Conversation
        </span>
      ),
    },
    {
      header: "",
      accessorKey: "id",
      cell: () => <i className="pi pi-trash icon cursor-pointer"></i>,
    },
  ];
};
