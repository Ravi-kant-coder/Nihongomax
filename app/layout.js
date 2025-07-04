import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NavbarBelow from "@/app/NavbarBelow";
import Navbar from "./Navbar";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nihongomax",
  description: "Ask all about Japanese language",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` dark:bg-[rgb(30,30,30)] 
          bg-gray-300 ${geistSans.variable} ${geistMono.variable} ${poppins.variable} 
          antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <NavbarBelow />
          {children}
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
