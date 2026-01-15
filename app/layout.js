import "./globals.css";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import AuthWrapper from "./auth-wrapper";
import ClientThemeProvider from "./ClientThemeProvider";

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
  description: "Learn Japanese language Online",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
    >
      <body className="dark:bg-[rgb(30,30,30)] bg-gray-300">
        <ClientThemeProvider>
          <AuthWrapper>
            {/* Centralized layout spacing to handle fixed sidebar and Navbar*/}
            <main className="mt-20 mb-20 md:ml-85 lg:ml-90 xl:ml-95">
              {children}
            </main>
          </AuthWrapper>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
