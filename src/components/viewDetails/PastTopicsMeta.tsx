import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../../utils/helpers";
import { DateFormats } from "../../constants/appConstants";

export interface IPastTopics {
  topicId: string;
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
      accessorKey: "createdAt",
      cell: ({ getValue }: any) => (
        <span>{formatDate(getValue(), DateFormats.DD_MM_YYYY_SLASH)}</span>
      ),
    },
    {
      header: "",
      accessorKey: "topicId",
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
      accessorKey: "topicId",
      cell: () => <i className="pi pi-trash icon cursor-pointer"></i>,
    },
  ];
};
