"use client";

import React from "react";
import clsx, { ClassValue } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Section,
  useActiveSectionContext,
} from "@/context/active-section-context";
import { useTheme } from "@/context/theme-context";
import { twMerge } from "tailwind-merge";

type Hash =
  | "#home"
  | "#about"
  | "#projects"
  | "#skills"
  | "#experience"
  | "#contact";

type Link = {
  name: Section;
  hash: Hash;
};

const links: Link[] = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
];

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { theme } = useTheme();

  return (
    <header className="w-full sm:w-[initial] fixed top-0 z-[999] left-0">
      <motion.div
        className={`
         top-0 left-0 w-full rounded-none
         !translate-x-0
        h-[4.5rem] sm:h-[3.25rem]
         sm:left-1/2 border border-white border-opacity-40 sm:!-translate-x-1/2 sm:w-[36rem] flex bg-white backdrop-blur-[8px] bg-opacity-80 shadow-black/[0.03] shadow-lg px-4 sm:rounded-full fixed sm:top-6
          dark:bg-gray-950 dark:bg-opacity-75 dark:border-black/40 dark:shadow-black/[0.03] dark:shadow-lg
         `}
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      <nav
        className={`flex left-1/2 -translate-x-1/2 fixed sm:top-[1.7rem]
        h-12 sm:h-[initial] py-2
        top-[0.15rem] sm:py-0
      `}
      >
        <ul className="flex justify-center w-[22rem] sm:w-[initial] sm:max-w-[initial] flex-wrap sm:flex-nowrap items-center text-[0.9rem] text-gray-500 font-medium sm:gap-5 gap-y-1">
          <AnimatePresence>
            {links.map((link, index) => {
              return (
                <motion.li
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  key={link.hash}
                  className="relative h-3/4 flex justify-center items-center"
                >
                  <Link
                    href={`${link.hash}`}
                    className={cn(
                      "w-full flex justify-center dark:text-gray-500 dark:hover:text-gray-300 items-center py-3 px-3 rounded-full hover:text-gray-950 transition",
                      {
                        "text-gray-950": activeSection === link.name && !(theme === "dark"),
                        "dark:text-gray-200": activeSection === link.name && theme === "dark"
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
                        className={`absolute -z-10 inset-0 bg-gray-100 rounded-full
                        dark:bg-gray-800
                        `}
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
          </AnimatePresence>
        </ul>
      </nav>
    </header>
  );
}
