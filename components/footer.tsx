import React from "react";

export default function Footer() {
  return (
    <footer className="text-gray-500 text-center mb-10 px-4">
      <small className="text-xs mb-2 block">
        &copy; 2030 ByteGrad. All rights reserved.
      </small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion, React Email & Resend, Vercel hosting.
      </p>
    </footer>
  );
}
