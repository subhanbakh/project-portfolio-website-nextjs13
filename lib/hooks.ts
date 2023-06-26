import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/context/active-section-context";
import type { Section } from "@/lib/types";
import { useEffect } from "react";

function useSectionInView(sectionName: Section, threshold = 0.75) {
  const { ref, inView } = useInView({
    threshold,
  });
  const {
    activeSection,
    setActiveSection,
    timeOfLastClick,
    setTimeOfLastClick,
  } = useActiveSectionContext();

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionName);
    }
  }, [inView, sectionName, setActiveSection]);

  return {
    ref,
    inView,
    activeSection,
    setActiveSection,
    timeOfLastClick,
    setTimeOfLastClick,
  };
}

export { useSectionInView };
