import { Dispatch, SetStateAction, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { AppInput } from "../global/appInput/AppInput";
import "./fileUpload.scss";
import { Constants } from "../../constants/appConstants";
import Icon, { IconNames } from "../global/appIcons/Icon";
import { ProgressSpinner } from "primereact/progressspinner";

interface CustomFileUpload {
  uploadFileHandler: (event: any) => void;
  label: string;
  isCheckFile: boolean;
  isPending: boolean;
  setCheckFile: Dispatch<SetStateAction<boolean>>;
}
export const CustomFileUpload = (props: CustomFileUpload) => {
  const { uploadFileHandler, isCheckFile, isPending, setCheckFile } = props;
  const [fileName, setFileName] = useState([]);

  return (
    <div className="custom-file-upload">
      {!fileName.length ? (
        <div className="flex file-upload-container">
          <FileUpload
            mode="basic"
            accept="application/pdf"
            maxFileSize={10000000}
            chooseOptions={{
              label: Constants.SELECT_FILE,
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
          <AppInput
            value={""}
            placeholder={Constants.PLACEHOLDER_FILE}
            onChange={() => {}}
            labelClassName="m-0"
            className="file-upload-input pointer-events-none"
          />
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="select-file flex px-2 gap-2">
            <Icon iconName={IconNames.documentIcon} iconSize={22} />
            <input
              type="text"
              value={fileName || Constants.PLACEHOLDER_FILE} // Display selected file name or fallback text
              className="custom-input"
              readOnly
            />
            {isPending ? (
              <ProgressSpinner
                aria-label="Loading"
                strokeWidth="8"
                style={{ width: "24px", height: "24px" }}
              />
            ) : isCheckFile ? (
              <Icon iconName={IconNames.erroIcon} />
            ) : (
              <Icon iconName={IconNames.tickIcon} />
            )}
          </div>
          <div
            className="cursor-pointer flex align-items-center"
            onClick={() => {
              setFileName([]);
              setCheckFile(false);
            }}
          >
            <Icon iconName={IconNames.trashIcon} iconSize={15} />
          </div>
        </div>
      )}
    </div>
  );
};
