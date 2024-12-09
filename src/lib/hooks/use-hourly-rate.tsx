import React, { createContext, useContext, ReactNode } from "react";

interface GlobalContextProps {
  hourlyRate: number;
  setHourlyRate: () => void;
  // add more global context properties here
}

const GlobalContext = createContext<GlobalContextProps>({
  hourlyRate: 10,

  // add default global context properties here
});

export const GlobalProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [globalValues, setGlobalValues] = React.useState<GlobalContextProps>({
    hourlyRate: 10,
  });
  return (
    <GlobalContext.Provider value={{ hourlyRate, setGlobalValues }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useHourlyRate = () => {
  return useContext(GlobalContext);
};
