import React, { ReactNode } from "react";
import { Dialog } from "primereact/dialog";
import { TextVariant } from "../../../constants/appConstants";
import Typography from "../typography/Typography";

interface IAppDialogProps {
  visible: boolean;
  headerName: string;
  setVisible: (visible: boolean) => void;
  children: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  width?: string;
}
export const AppDialog = (props: IAppDialogProps) => {
  const {
    visible,
    headerName,
    setVisible,
    children,
    headerClassName,
    contentClassName,
    width = "50vw",
  } = props;

  const headerElement = (headerName: string) => (
    <div className="border-b-2">
      <Typography variant={TextVariant.HEADING3}>{headerName}</Typography>
    </div>
  );
  console.log("heaer", headerName);
  

  return (
    <div>
      <Dialog
        visible={visible}
        modal
        header={headerElement(headerName)}
        style={{ width }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        pt={{
          header: {
            className: `${
              headerClassName ? headerClassName : " "
            } custom-header align-content-center p-0 px-4`,
          },
          content: {
            className: contentClassName,
          },
          headerIcons: {
            className: "mt-2",
          },
          closeButtonIcon: {
            color: "var(--secondary-color)",
          },
        }}
      >
        {children}
      </Dialog>
    </div>
  );
};
