import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IData } from "../global/table/AppTable";
import Icon, { IconNames } from "../global/appIcons/Icon";
import { formatDate } from "../../utils/helpers";
import { DateFormats } from "../../constants/appConstants";

export const getContractExplorerColumn = (
  navigateTo: any,
  deleteDocument: any
): ColumnDef<IData>[] => {
  return [
    {
      header: "Document",
      accessorKey: "document.name",
      cell: ({ getValue }: any) => (
        <span className="document-data">{getValue()}</span>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Contract Type",
      accessorKey: "contractType",
    },
    {
      header: "Date uploaded",
      accessorKey: "dateUploaded",
      cell: ({ getValue }: any) => (
        <span>{formatDate(getValue(), DateFormats.DD_MM_YYYY_SLASH)}</span>
      ),
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
          View Details
        </span>
      ),
    },
    {
      header: "",
      accessorKey: "id",
      cell: ({ cell }) => (
        <div
          className="cursor-pointer"
          onClick={deleteDocument(cell.row.original.id)}
        >
          <Icon iconName={IconNames.trashIcon} iconSize={15} />
        </div>
      ),
    },
  ];
};
