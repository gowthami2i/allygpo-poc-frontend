import React from "react";
import { ReactElement, createContext, useContext, useRef } from "react";
import AppToast from "../components/global/toast/AppToast";

const ToastContext: any = createContext(null);

interface IToastProvider {
  children?: ReactElement;
}

interface IShowToast {
  severity: string;
  detail: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
}

export const ToastProvider = ({ children }: IToastProvider) => {
  const toastRef = useRef<any>(null);

  const showToast = ({
    severity,
    detail,
    life = 10000,
    sticky,
    closable,
  }: IShowToast) => {
    toastRef.current.show({ severity, detail, life, sticky, closable });
  };

  const clearToast = () => {
    toastRef.current.clear();
  };

  return (
    <ToastContext.Provider value={{ showToast, clearToast }}>
      {children}
      <AppToast toastRef={toastRef} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
