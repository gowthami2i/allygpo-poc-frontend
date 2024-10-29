import React, { useState } from "react";
import AppTable from "../../components/global/table/AppTable";
import { ContractUpload } from "../../components/contractExplorer/ContractUpload";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePageNavigation } from "../../hook/global/UsePageNavigation";
import { Constants, TextVariant } from "../../constants/appConstants";
import { Button } from "primereact/button";
import "../../components/contractExplorer/contractExplorer.scss";
import { getContractExplorerColumn } from "../../components/contractExplorer/contractExplorerMeta";
import { data } from "../../mockData/data";
import Typography from "../../components/global/typography/Typography";
import SearchBar from "../../components/global/appInput/SearchBar";
import { AppDialog } from "../../components/global/appDialog/AppDialog";

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
    <div className="m-5">
      <div className="layout">
        <div className="flex justify-content-between align-items-center h-4rem px-3">
          <Typography variant={TextVariant.HEADING1} className="font-medium">
            {Constants.CONTRACTS}
          </Typography>
          <div className="flex justify-content-between gap-5">
            <SearchBar />
            <Button
              label={Constants.UPLOAD_CONTRACT}
              type={"button"}
              onClick={() => {
                setVisible(true);
              }}
              icon="pi pi-upload"
              severity="secondary"
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
      <AppDialog
        visible={visible}
        headerName={"Upload Contract"}
        setVisible={setVisible}
        headerClassName="p-2"
        contentClassName="p-4"
        width="50vw"
      >
        <ContractUpload setVisible={setVisible} />
      </AppDialog>
    </div>
  );
};
