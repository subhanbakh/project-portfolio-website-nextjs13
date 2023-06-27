import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ThemeSwitch from "@/components/theme-switch";
import { ActiveSectionContextProvider } from "@/context/active-section-context";
import { ThemeContextProvider } from "@/context/theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ricardo | Personal Portfolio",
  description: "Ricardo is a full-stack developer with 8 years of experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} relative bg-gray-50 pt-28 text-gray-950 transition-all dark:bg-gray-950 dark:bg-opacity-90 dark:text-gray-50 dark:text-opacity-90 sm:pt-36`}
      >
        <div className="absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] dark:bg-[#946263] sm:w-[68.75rem]"></div>
        <div className="absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-[#dbd7fb] blur-[10rem] dark:bg-[#676394] sm:left-[-30rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
          </ActiveSectionContextProvider>

          <ThemeSwitch />
        </ThemeContextProvider>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
