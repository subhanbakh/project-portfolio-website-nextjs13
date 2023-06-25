"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/context/active-section-context";
import { motion } from "framer-motion";

const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Apollo",
  "Express",
  "PostgreSQL",
  "Python",
  "Django",
  "Framer Motion",
];

const FADE_IN_ANIMATION_VARIANTS = {
  initial: { y: 100, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05, // Delay each letter's animation by 0.05 seconds
    },
  }),
};

export default function Skills() {
  const { ref, inView, entry } = useInView({
    threshold: 0.75,
  });
  const { activeSection, setActiveSection, timeOfLastClick } =
    useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection("Skills");
    }
  }, [inView, timeOfLastClick, setActiveSection]);

  return (
    <section
      id="skills"
      className="flex flex-col max-w-[850px] text-center m-auto my-28 sm:my-44 scroll-mt-28"
      ref={ref}
    >
      <h2 className="text-3xl text-gray-950 font-medium dark:text-white">
        My Skills
      </h2>
      <ul className="flex text-lg px-4 text-gray-800 justify-center gap-x-2 mt-7 flex-wrap gap-y-2">
        {skillsData.map((skill, index) => (
          <motion.li
            key={index}
            className="bg-white dark:bg-white/10 dark:text-white dark:text-white/80 px-5 py-3 border border-black/[0.1] rounded-xl"
            variants={FADE_IN_ANIMATION_VARIANTS}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
