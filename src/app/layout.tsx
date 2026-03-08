import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProductsProvider } from "@/store/ProductsContext";
import { AppSidebar } from "@/components/AppSidebar";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Repuestos — Gestión de inventario",
  description: "Sistema de gestión de repuestos automotrices",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <TooltipProvider>
          <ProductsProvider>
            <AppSidebar>{children}</AppSidebar>
          </ProductsProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
