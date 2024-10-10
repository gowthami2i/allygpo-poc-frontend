import { createContext, useContext, useState } from "react";

const HeaderContext = createContext<any>(null);

export const useHeader = () => useContext(HeaderContext);

export const HeaderProvider = ({ children }: { children: JSX.Element }) => {
  const [header, setHeader] = useState(null);

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};
