import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salon 3D Print Yavoriv — 3D-друк у Яворові",
  description: "3D-друк деталей, декору, подарунків і прототипів у Яворові з доставкою по Україні.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className="antialiased">{children}</body>
    </html>
  );
}
