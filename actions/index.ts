"use server";

import { Resend } from "resend";
import ContactFormEmail from "@/email/email";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

const validateString = (data: unknown, maxLength: number) => {
  if (!data || typeof data !== "string" || data.length > maxLength) {
    return false;
  }
  return true;
};

const getErrorMessage = (e: unknown): string => {
  let message: string;

  if (e instanceof Error) {
    message = e.message;
  } else if (e && typeof e === "object" && "message" in e) {
    message = String(e.message);
  } else if (typeof e === "string") {
    message = e;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export async function sendEmail(formData: FormData) {
  const message = formData.get("message");
  const senderEmail = formData.get("senderEmail");

  // simple validation (server-side)
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  } else if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }

  let data;
  try {
    data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bytegrad@gmail.com",
      subject: "Message from contact form",
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        senderEmail: senderEmail as string,
      }),
    });
  } catch (e) {
    return {
      error: getErrorMessage(e),
    };
  }

  return {
    data,
  };
}
