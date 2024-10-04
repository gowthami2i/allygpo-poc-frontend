import React, { useState } from "react";
import AppTable from "../../components/table/AppTable";
import Typography from "../../typography/Typography";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dialog } from "primereact/dialog";
import { ContractUpload } from "../../components/contractUpload/ContractUpload";
import { CustomDialog } from "../../components/customDialog/CustomDialog";
import { CustomButton } from "../../components/customButton/CustomButton";

export const ContractExplorer = () => {
  const [visible, setVisible] = useState(false);

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
          <div className="flex justify-content-between gap-6">
            <IconField iconPosition="right">
              <InputIcon
                className="pi pi-search"
                style={{ top: "35%", color: "#18406f" }}
              />
              <InputText placeholder="Search" className="p-inputtext-sm" />
            </IconField>
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
        <AppTable />
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
