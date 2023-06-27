"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useTheme } from "@/context/theme-context";
import { links } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { theme } = useTheme();

  return (
    <header className="fixed left-0 top-0 z-[999] w-full sm:w-[initial]">
      <motion.div
        className="fixed left-0 top-0 flex h-[4.5rem] w-full !translate-x-0 rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 px-4 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:border-black/40 dark:bg-gray-950 dark:bg-opacity-75 dark:shadow-lg dark:shadow-black/[0.03] sm:left-1/2 sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:!-translate-x-1/2 sm:rounded-full"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      <nav className="fixed left-1/2 top-[0.15rem] flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {/* <AnimatePresence> */}
          {links.map((link) => {
            return (
              <motion.li
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                key={link.hash}
                className="relative flex h-3/4 items-center justify-center"
              >
                <Link
                  href={`${link.hash}`}
                  className={cn(
                    "flex w-full items-center justify-center rounded-full px-3 py-3 transition hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-300",
                    {
                      "text-gray-950":
                        activeSection === link.name && !(theme === "dark"),
                      "dark:text-gray-200":
                        activeSection === link.name && theme === "dark",
                    }
                  )}
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  {link.name}

                  {activeSection === link.name ? (
                    <motion.span
                      className="absolute inset-0 -z-10 rounded-full bg-gray-100 dark:bg-gray-800"
                      layoutId="blabla"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : null}
                </Link>
              </motion.li>
            );
          })}
          {/* </AnimatePresence> */}
        </ul>
      </nav>
    </header>
  );
}
