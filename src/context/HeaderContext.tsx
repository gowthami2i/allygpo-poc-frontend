import React, { createContext, useState, ReactNode, FC, useContext } from "react";

export interface HeaderContextType {
  checked: boolean; 
  setChecked: React.Dispatch<React.SetStateAction<boolean>>; 
  isDisable: boolean; 
  setIsDisable: React.Dispatch<React.SetStateAction<boolean>>; 
}

const HeaderContext = createContext<HeaderContextType | null>(null);

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider: FC<HeaderProviderProps> = ({ children }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  return (
    <HeaderContext.Provider value={{ checked, setChecked, setIsDisable, isDisable }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = (): HeaderContextType => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderProvider");
  }

  return context;
};
