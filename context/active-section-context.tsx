"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Section } from "@/lib/types";

type ActiveSectionContextType = {
  activeSection: Section;
  setActiveSection: Dispatch<SetStateAction<Section>>;
  timeOfLastClick: number;
  setTimeOfLastClick: Dispatch<SetStateAction<number>>;
};

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

const ActiveSectionContext = createContext<ActiveSectionContextType | null>(
  null
);

function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<Section>("Home");
  const [timeOfLastClick, setTimeOfLastClick] = useState(0); // we need to keep track of this to disable observer temporarily when user clicks on nav

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider"
    );
  }

  return context;
}

export { ActiveSectionContextProvider, useActiveSectionContext };
