"use server";

import React from "react";
import { Resend } from "resend";
import ContactFormEmail from "@/email/contact-form-email";
import { getErrorMessage, validateString } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      from: "portfolio@resend.dev",
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
