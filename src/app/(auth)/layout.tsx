import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FitHub Connect - Autenticación",
  description: "Autenticación para FitHub Connect",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section>{children}</section>
    </>
  );
}
