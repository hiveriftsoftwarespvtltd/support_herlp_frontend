import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/Header";
import { AppFooter } from "@/components/Footer/AppFooter";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Accounting Firm by Certified Bookkeepers and Accountants – Support Help",
  description:
    "Support Help is a leading accounting firm run by certified bookkeepers and accountants. We offer payroll, taxation, accounts receivable and payable services in USA, Australia, and India.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-US"
      className={`${poppins.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-poppins text-gray-900 bg-white">
        <AppHeader />
        <main className="flex-1">{children}</main>
        <AppFooter />
      </body>
    </html>
  );
}
