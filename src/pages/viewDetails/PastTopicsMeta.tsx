import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../../utils/helpers";
import { DateFormats } from "../../constants/constant";

export interface IPastTopics {
  conversation_id: string;
  summary: string;
  created_at: string;
  last_interaction: string;
}

export const getPastTopicsColumn = (
  handleViewDetails: any
): ColumnDef<IPastTopics>[] => {
  return [
    {
      header: "Topic",
      accessorKey: "summary",
    },
    {
      header: "Date",
      accessorKey: "created_at",
      cell: ({ getValue }: any) => (
        <span>{formatDate(getValue(), DateFormats.DD_MM_YYYY_SLASH)}</span>
      ),
    },
    {
      header: "",
      accessorKey: "conversation_id",
      cell: ({ cell }) => (
        <span
          className="extra-data"
          onClick={() => {
            handleViewDetails(cell.row.original);
          }}
        >
          Load Conversation
        </span>
      ),
    },
    {
      header: "",
      accessorKey: "conversation_id",
      cell: () => <i className="pi pi-trash icon cursor-pointer"></i>,
    },
  ];
};
