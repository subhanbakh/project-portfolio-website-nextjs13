import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

export default function FormSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx(
        "group bg-gray-900 self-start dark:bg-opacity-10 dark:bg-white text-white w-[8rem] h-[3rem] rounded-full flex items-center disabled:bg-opacity-75 disabled:scale-100 justify-center gap-2 transition-all active:scale-105 focus:bg-gray-950 focus:scale-110 outline-none hover:bg-gray-950 hover:scale-110",
        {
          "opacity-65": pending,
        }
      )}
      disabled={pending}
    >
      {pending ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all opacity-70 text-xs" />
        </>
      )}
    </button>
  );
}
