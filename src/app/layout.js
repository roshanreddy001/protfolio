import { Inter, Outfit, Great_Vibes } from "next/font/google";
import "./globals.css";
import LoadingBar from "@/components/ui/LoadingBar"; // Will implement later or skip if simple

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-script" });

export const metadata = {
  title: "Roshna Reddy Basava | Full Stack Developer",
  description: "Premium personal portfolio of Roshna Reddy Basava, featuring frame-based animation and 3D depth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${greatVibes.variable}`}>
        {children}
      </body>
    </html>
  );
}
