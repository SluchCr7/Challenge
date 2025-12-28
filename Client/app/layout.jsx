import "./globals.css";
import { Outfit } from 'next/font/google';
import LayoutComponent from "./Components/LayoutComponent";

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
})

export const metadata = {
  title: "SHALAN CHALLENGE | Elite Football Quizzes",
  description: "Experience the most immersive football quiz platform. Join the elite rank of football experts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} font-sans bg-background text-foreground antialiased selection:bg-primary selection:text-white`}
      >
        <LayoutComponent>
          {children}
        </LayoutComponent>
      </body>
    </html>
  );
}

