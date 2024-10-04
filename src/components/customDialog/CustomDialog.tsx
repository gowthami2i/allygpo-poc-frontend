import { Dialog } from "primereact/dialog";
import React from "react";
import Typography from "../../typography/Typography";

interface ICustomDialog {
  visible: boolean;
  headerName: string;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
}
export const CustomDialog = (props: ICustomDialog) => {
  const { visible, headerName, setVisible, children } = props;

  const headerElement = (headerName: string) => (
    <div className="border-b-2">
      <Typography variant="p3">{headerName}</Typography>
    </div>
  );

  return (
    <div className="custom-dialog">
      <Dialog
        visible={visible}
        modal
        header={headerElement(headerName)}
        style={{ minWidth: "40%" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        pt={{
          header: {
            className: "custom-header border-300",
          },
        }}
      >
        {children}
      </Dialog>
    </div>
  );
};
