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
import { CustomDialog } from "../../components/customdialog/CustomDialog";

export const ContractExplorer = () => {
  const { navigateTo } = usePageNavigation();
  const [visible, setVisible] = useState(false);
  const pageCount = 5;
  const columns = getContractExplorerColumn(navigateTo);
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
      >
        <ContractUpload setVisible={setVisible} />
      </CustomDialog>
    </div>
  );
};
