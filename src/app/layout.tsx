import "./globals.css";
import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { Providers } from "./providers";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitHub Connect",
  description: "FitHub Connect",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <Providers>
          <div className="relative flex flex-col h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
