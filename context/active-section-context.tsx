"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type Section =
  | "Home"
  | "About"
  | "Projects"
  | "Skills"
  | "Experience"
  | "Contact";

type ActiveSectionContextType = {
  activeSection: Section;
  setActiveSection: Dispatch<SetStateAction<Section>>;
  timeOfLastClick: number;
  setTimeOfLastClick: Dispatch<SetStateAction<number>>;
};

type ProviderProps = {
  children: React.ReactNode;
};

const ActiveSectionContext = createContext<ActiveSectionContextType | null>(
  null
);

export const ActiveSectionContextProvider = ({ children }: ProviderProps) => {
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
};

export const useActiveSectionContext = () => {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within a ActiveSectionContextProvider"
    );
  }

  return context;
};
