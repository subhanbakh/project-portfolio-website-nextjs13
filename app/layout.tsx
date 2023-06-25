import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import { ActiveSectionContextProvider } from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";
import ThemeSwitch from "@/components/theme-switch";
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
    <html lang="en" className="!scroll-smooth ">
      <body
        className={`${inter.className} text-gray-950 bg-gray-50 dark:bg-gray-950 pt-28 sm:pt-36 relative transition-all
        dark:text-gray-50 dark:bg-opacity-90 dark:text-opacity-90`}
      >
        <div
          className={`bg-[#fbe2e3] rounded-full blur-[10rem] -z-10 h-[500px] w-[500px] sm:w-[1100px] absolute top-[-6rem] right-[11rem]
          dark:bg-[#946263]`}
        ></div>
        <div
          className={`bg-[#dbd7fb] rounded-full blur-[10rem] -z-10 h-[500px] w-[800px] sm:w-[1100px] absolute top-[-1rem] left-[-35rem] sm:left-[-30rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]
        dark:bg-[#676394]`}
        ></div>

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
