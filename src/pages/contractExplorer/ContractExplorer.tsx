import React, { useState } from "react";
import AppTable from "../../components/table/AppTable";
import Typography from "../../typography/Typography";
import { ContractUpload } from "../../components/contractUpload/ContractUpload";
import { CustomDialog } from "../../components/customDialog/CustomDialog";
import { CustomButton } from "../../components/customButton/CustomButton";
import { ColumnDef } from "@tanstack/react-table";
import { IData } from "../../types/components/appTable";
import { data } from "../../components/table/data";
import SearchBar from "../../components/customInput/SearchBar";

export const ContractExplorer = () => {
  const [visible, setVisible] = useState(false);
  const columns: ColumnDef<IData>[] = [
    {
      header: "Document",
      accessorKey: "document",
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
  ];
  return (
    <div className="m-5 ">
      <div
        style={{
          background: "var(--app-bgwhite)",
          border: "1px solid var(--app-borderColor)",
          height: "420px",
        }}
      >
        <div
          className="flex justify-content-between align-items-center h-4rem px-3"
          style={{ background: "var(--app-bgWhite" }}
        >
          <Typography variant="h6" className="font-medium">
            Contracts
          </Typography>
          <div className="flex justify-content-between gap-5">
            <SearchBar />
            <CustomButton
              buttonType={"primary"}
              icon="pi pi-upload"
              onClick={() => {
                setVisible(true);
              }}
              label={"UPLOAD CONTRACT"}
              className="upload-button"
            />
          </div>
        </div>
        <AppTable columns={columns} data={data} />
      </div>
      <CustomDialog
        visible={visible}
        headerName={"Upload Contract"}
        setVisible={setVisible}
      >
        <ContractUpload setVisible={setVisible} />
      </CustomDialog>
    </div>
  );
};
