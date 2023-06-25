"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.125,
      }}
      className="hidden sm:flex w-1 h-16 bg-gray-200 dark:bg-opacity-20 my-24 m-auto rounded-full"
    ></motion.div>
  );
}
