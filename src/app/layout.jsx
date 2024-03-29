import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: { default: "Beach For Life", template: "%s | Beach For Life" },
  description: "แหล่งรวบรวมความรู้และข้อมูลที่เกี่ยวกับชายหาด",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
