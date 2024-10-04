import React from "react";
import { FileUpload } from "primereact/fileupload";

export const CustomFileUpload = (props: any) => {
  return (
    <div>
      <FileUpload
        mode="basic"
        name="demo[]"
        url="/api/upload"
        accept="pdf"
        maxFileSize={1000000}
        // customUpload
        chooseOptions={{
          label: "Select File",
          className: "custom-button primary-button px-4", // Remove default button styles
        }}
        uploadHandler={props.uploadFileHandler}
        pt={{
          chooseIcon: {
            className: "hidden",
          },
        }}
      />
    </div>
  );
};
