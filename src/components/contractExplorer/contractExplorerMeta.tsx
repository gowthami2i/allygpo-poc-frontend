import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IData } from "../../components/table/AppTable";
import Icon, { IconNames } from "../../components/global/appIcons/Icon";

export const getContractExplorerColumn = (
  navigateTo: any,
  handleDelete: any
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
      cell: () => <Icon iconName={IconNames.trashIcon} iconSize={15} />,
    },
  ];
};
