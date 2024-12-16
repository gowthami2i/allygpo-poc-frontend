import React from "react";
import { Toast } from "primereact/toast";

interface IAppToast {
  toastRef?: any;
  show?: any;
}

const AppToast = (props: IAppToast) => {
  const { toastRef } = props;
  return (
    <div>
      <Toast
        ref={toastRef}
        position={"top-right"}
        className="z-100"
        pt={{
          icon: {
            className: "mr-3",
          },
        }}
        data-testid="app-toast"
      />
    </div>
  );
};

export default AppToast;
