import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Deal Analyser - Forever Home Buyers",
  description: "An exclusive application for FHB team members to analyse deals faster than ever.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Vivek Sharma" },
    {
      name: "Vivek Sharma",
      url: "https://www.upwork.com/freelancers/~01c21c1a7f8d1472f2",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
