import React, { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { CustomInput } from "../customInput/CustomInput";
import "./fileUpload.scss";
import Document_icon from "../../assets/images/svg/document_icon.svg";

interface CustomFileUpload {
  uploadFileHandler: (event: any) => void;
  label: string;
}
export const CustomFileUpload = (props: CustomFileUpload) => {
  const { uploadFileHandler, label } = props;
  const [fileName, setFileName] = useState([]);

  return (
    <div className="custom-file-upload">
      {!fileName.length ? (
        <div className="flex file-upload-container">
          <FileUpload
            mode="basic"
            accept="application/pdf"
            maxFileSize={1000000}
            chooseOptions={{
              label: "SELECT FILE",
              className: "custom-button primary-button px-4",
            }}
            pt={{
              chooseIcon: {
                className: "hidden",
              },
            }}
            onSelect={(event: any) => {
              event.files.forEach((file: any) => {
                setFileName(file.name);
              });
              uploadFileHandler(event);
            }}
          />
          <CustomInput
            value={""}
            placeholder="No File Selected"
            onChange={() => {}}
            labelClassName="m-0"
            className="file-upload-input pointer-events-none"
          />
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="select-file flex px-2 gap-2">
            <img
              src={Document_icon}
              alt="button image"
              width={"24px"}
              height={"24px"}
            />
            <input
              type="text"
              value={fileName || "No File Selected"} // Display selected file name or fallback text
              className="custom-input"
              readOnly
            />
            <i
              className="pi pi-check align-content-center"
              style={{ color: "var(--app-successColor)" }}
            />
          </div>
          <i
            className="pi pi-trash align-content-center cursor-pointer"
            style={{ color: "var(--app-dangerColor)" }}
            onClick={() => {
              setFileName([]); // Clears the file name when the trash icon is clicked
            }}
          />
        </div>
      )}
    </div>
  );
};
