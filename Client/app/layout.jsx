import "./globals.css";
import Nav from "./Components/Nav";

import {Mada } from '@next/font/google';
import LayoutComponent from "./Components/LayoutComponent";


const MadaFont = Mada({
  subsets: ['latin'],
})

export const metadata = {
  title: "Challenge Football",
  description: "عايز تلعب تحديات صباحو كوورة وعمرونصوحي .. هنا هتقدر تلاقي كل العاب صباحو",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-100 dark:bg-gray-900 ${MadaFont.className}`}      >
          <LayoutComponent>
            {children}
          </LayoutComponent>
      </body>
    </html>
  );
}
