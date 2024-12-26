// import React, { createContext, useState, ReactNode, FC, useContext } from "react";

// // Define the shape of the context
// export interface CheckedContextType {
//   checked: boolean;
//   setChecked: React.Dispatch<React.SetStateAction<boolean>>;
// }

// // Create the context with a default value of `undefined`
//  const HeaderContext = createContext<CheckedContextType | null>(null);

// // Define the props for the provider component
// interface CheckedProviderProps {
//   children: ReactNode;
// }

// // Create the provider component
// export const HeaderProvider: FC<CheckedProviderProps> = ({ children }) => {
//   const [checked, setChecked] = useState<boolean>(false);

//   return (
//     <HeaderContext.Provider value={{ checked, setChecked }}>
//       {children}
//     </HeaderContext.Provider>
//   );
// };
// export const useHeaderContext = ()=>useContext(HeaderContext)

import React, { createContext, useState, ReactNode, FC, useContext } from "react";

// Define the shape of the context
export interface HeaderContextType {
  checked: boolean; // Expose the checked state
  setChecked: React.Dispatch<React.SetStateAction<boolean>>; // Expose the setChecked function
}

// Create the context with a default value of `undefined`
const HeaderContext = createContext<HeaderContextType | null>(null);

// Define the props for the provider component
interface HeaderProviderProps {
  children: ReactNode;
}

// Create the provider component
export const HeaderProvider: FC<HeaderProviderProps> = ({ children }) => {
  const [checked, setChecked] = useState<boolean>(false);

  // Provide both the `checked` state and the `setChecked` function
  return (
    <HeaderContext.Provider value={{ checked, setChecked }}>
      {children}
    </HeaderContext.Provider>
  );
};

// Custom hook to use the HeaderContext
export const useHeaderContext = (): HeaderContextType => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderProvider");
  }

  return context; // Return both `checked` and `setChecked`
};
