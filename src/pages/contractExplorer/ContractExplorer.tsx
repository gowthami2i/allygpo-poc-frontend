import React from "react";
import { CustomButton } from "../../components/customButton/CustomButton";
import UploadIcon from "../../assets/images/svg/upload_icon.svg";

export const ContractExplorer = () => {
  return (
    <div className="m-5">
      <CustomButton buttonType="primary" type="button" label="Primary Button" />
      <CustomButton
        buttonType="primary-outline"
        type="button"
        label="Primary Outline"
      />
      <CustomButton buttonType="primary" type="button" imgURL={UploadIcon} label="UPLOAD CONTRACT"/>
    </div>
  );
};
