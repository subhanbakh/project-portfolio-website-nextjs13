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
      className="my-24 hidden h-16 w-1 rounded-full bg-gray-200 dark:bg-opacity-20 sm:flex"
    ></motion.div>
  );
}
