import React, { useState } from "react";
import AppTable from "../../components/table/AppTable";
import Typography from "../../typography/Typography";
import { ContractUpload } from "../../components/contractUpload/ContractUpload";

import { CustomButton } from "../../components/customButton/CustomButton";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { data } from "../../components/table/data";
import SearchBar from "../../components/customInput/SearchBar";
import { getContractExplorerColumn } from "./contractExplorerMeta";
import "./contractExplorer.scss";
import { usePageNavigation } from "../../hook/UsePageNavigation";
import { useDelete } from "../../hook/services/document/useDelete";
import { CustomDialog } from "../../components/customdialog/CustomDialog";
import { Constants } from "../../constants/constant";


export const ContractExplorer = () => {
  const { navigateTo } = usePageNavigation();
  const { mutate: deleteDocument } = useDelete();
  const [visible, setVisible] = useState(false);
  const pageCount = 5;
  const handleDelete = (documentId: string) => {
    deleteDocument(
      { document_id: documentId },
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
  const columns = getContractExplorerColumn(navigateTo, handleDelete);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageCount,
      },
    },
  });

  return (
    <div className="m-5 ">
      <div className="layout">
        <div className="flex justify-content-between align-items-center h-4rem px-3">
          <Typography variant="h6" className="font-medium">
            {Constants.CONTARCTS}
          </Typography>
          <div className="flex justify-content-between gap-5">
            <SearchBar />
            <CustomButton
              buttonType={"primary"}
              icon="pi pi-upload"
              onClick={() => {
                setVisible(true);
              }}
              label={Constants.UPLOAD_CONTRACT}
              className="upload-button"
            />
          </div>
        </div>
        <AppTable
          columns={columns}
          data={data}
          pageCount={pageCount}
          table={table}
          paginator={true}
        />
      </div>
      <CustomDialog
        visible={visible}
        headerName={"Upload Contract"}
        setVisible={setVisible}
        headerClassName="p-2"
        contentClassName="p-4"
        width="50vw"
      >
        <ContractUpload setVisible={setVisible} />
      </CustomDialog>
    </div>
  );
};
