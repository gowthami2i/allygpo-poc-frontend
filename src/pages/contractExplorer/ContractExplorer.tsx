import React from "react";
import AppTable from "../../components/table/AppTable";
import Typography from "../../typography/Typography";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

export const ContractExplorer = () => {
  return (
    <div className="m-5">
      <div
        className="p-5"
        style={{ background: "#fff", border: "1px solid #E0E0E0" }}
      >
        <div className="flex justify-content-between">
          <Typography variant="h6" className="m-0 mb-5 font-medium">
            Contracts
          </Typography>
          <div className="flex justify-content-between gap-1">
            <IconField iconPosition="right">
              <InputIcon
                className="pi pi-search"
                style={{ top: "35%", color: "#18406f" }}
              />
              <InputText placeholder="Search" className="p-inputtext-sm" />
            </IconField>
          </div>
        </div>
        <AppTable />
        <div></div>
      </div>
    </div>
  );
};
