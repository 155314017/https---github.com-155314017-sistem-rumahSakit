import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { GedungState, GedungAction } from "./GedungTypes";
import { gedungReducer, initialState } from "./gedungReducer";

interface GedungContextType {
  state: GedungState;
  dispatch: React.Dispatch<GedungAction>;
}

const GedungContext = createContext<GedungContextType | undefined>(undefined);

interface GedungProviderProps {
  children: ReactNode;
}

export const GedungProvider: React.FC<GedungProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gedungReducer, initialState);

  return (
    <GedungContext.Provider value={{ state, dispatch }}>
      {children}
    </GedungContext.Provider>
  );
};

export const useGedungContext = () => {
  const context = useContext(GedungContext);
  if (context === undefined) {
    throw new Error("useGedungContext must be used within a GedungProvider");
  }
  return context;
}; 