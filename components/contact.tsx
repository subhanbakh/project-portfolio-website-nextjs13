"use client";

import { useState } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { sendEmail } from "@/actions";
import FormSubmitButton from "./form-submit";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ senderEmail: "", message: "" });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();
  const { ref, inView } = useInView({
    threshold: 0.75,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prevForm) => {
      return { ...prevForm, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection("Contact");
    }
  }, [inView, timeOfLastClick, setActiveSection]);

  return (
    <motion.section
      id="contact"
      className="max-w-[600px] m-auto text-center my-28 sm:my-32 px-5 sm:px-0"
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-medium mb-2 dark:text-white">Contact Me</h2>
      <div>
        <p className="dark:text-white/80 text-gray-700">
          Please contact me directly at{" "}
          <a className="underline" href="mailto:example@gmail.com">
            example@gmail.com
          </a>{" "}
          or through this form.
        </p>

        <form
          className="rounded-2xl flex flex-col mt-10 dark:text-black"
          action={async (formData: FormData) => {
            // send email
            const { data, error } = await sendEmail(formData);

            if (error) {
              console.log(error);
              toast.error(`Failed to send email. Reason: ${error}`);
              return;
            }

            toast.success("Email sent successfully!");
          }}
        >
          <input
            type="email"
            name="senderEmail"
            className="h-14 px-4 border border-black/10 rounded-lg dark:outline-none dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all"
            placeholder="Your email"
            onChange={handleChange}
            value={form.senderEmail}
            maxLength={500}
            required
          />
          <textarea
            name="message"
            className="h-48 p-4 my-3 border border-black/10 rounded-lg dark:bg-white dark:outline-none dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all"
            placeholder="Your message"
            onChange={handleChange}
            value={form.message}
            maxLength={5000}
            required
          />
          <FormSubmitButton />
        </form>
      </div>
    </motion.section>
  );
}
