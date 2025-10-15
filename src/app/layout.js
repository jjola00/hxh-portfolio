import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import FireFliesBackground from "@/components/FireFliesBackground";
import Sound from "@/components/Sound";
import { BackgroundProvider } from "@/components/BackgroundManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    template: "%s | HxH Portfolio",
    default: "HxH Portfolio",
  },
  description:
    "My personal website and portfolio, showcasing my projects and blog posts theme based on my favorite anime.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          "bg-background text-foreground font-inter"
        )}
      >
        <BackgroundProvider>
          {children}
          <FireFliesBackground />
          <Sound />
          <div id="my-modal" />
        </BackgroundProvider>
      </body>
    </html>
  );
}