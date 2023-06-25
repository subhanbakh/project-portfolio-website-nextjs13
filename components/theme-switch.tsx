"use client";

import React, { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { useTheme } from "@/context/theme-context";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-5 right-5">
      <button
        className="w-[3rem] h-[3rem] hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 rounded-full border border-white border-opacity-40 shadow-2xl shadow- bg-white backdrop-blur-[8px] bg-opacity-80 flex justify-center items-center"
        onClick={toggleTheme}
      >
        {theme === "light" ? <BsSun /> : <BsMoon />}
      </button>
    </div>
  );
}
