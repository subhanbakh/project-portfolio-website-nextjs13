"use client";

import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { sendEmail } from "@/actions/send-email";
import FormSubmitButton from "@/components/form-submit";
import { useSectionInView } from "@/lib/hooks";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      className="mb-20 w-[min(100%,38rem)] text-center sm:mb-28 sm:px-0"
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="mb-2 text-3xl font-medium dark:text-white">Contact Me</h2>

      <p className="text-gray-700 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:example@gmail.com">
          example@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form
        className="mt-10 flex flex-col rounded-2xl dark:text-black"
        action={async (formData: FormData) => {
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
          className="h-14 rounded-lg border border-black/10 px-4 transition-all dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100"
          placeholder="Your email"
          maxLength={500}
          required
        />
        <textarea
          name="message"
          className="my-3 h-52 rounded-lg border border-black/10 p-4 transition-all dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100"
          placeholder="Your message"
          maxLength={5000}
          required
        />
        <FormSubmitButton />
      </form>
    </motion.section>
  );
}
