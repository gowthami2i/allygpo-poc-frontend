import { Dialog } from "primereact/dialog";
import React from "react";
import Typography from "../../typography/Typography";
import "./customDialog.scss";

interface ICustomDialog {
  visible: boolean;
  headerName: string;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  width?: string;
}
export const CustomDialog = (props: ICustomDialog) => {
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
      <Typography variant="p3">{headerName}</Typography>
    </div>
  );

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
            color: "var(--app-secondaryColor)",
          },
        }}
      >
        {children}
      </Dialog>
    </div>
  );
};
