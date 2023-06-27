"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useActiveSectionContext } from "@/context/active-section-context";
import { skillsData } from "@/lib/data";

const fadeInAnimationVariants = {
  initial: { y: 100, opacity: 0 },
  animate: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: index * 0.05, // Delay each letter's animation by 0.05 seconds
    },
  }),
};

export default function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.75,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection("Skills");
    }
  }, [inView, timeOfLastClick, setActiveSection]);

  return (
    <section
      id="skills"
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
      ref={ref}
    >
      <h2 className="text-3xl font-medium text-gray-950 dark:text-white">
        My Skills
      </h2>
      <ul className="mt-7 flex flex-wrap justify-center gap-x-2 gap-y-2 px-4 text-lg text-gray-800">
        {skillsData.map((skill, index) => (
          <motion.li
            key={index}
            className="rounded-xl border border-black/[0.1] bg-white px-5 py-3 dark:bg-white/10 dark:text-white dark:text-white/80"
            variants={fadeInAnimationVariants}
            custom={index}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
