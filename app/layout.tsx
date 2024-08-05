import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import StyledComponentsRegistry from "@/lib/registry";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shipnment Task - 1",
  description: "Just your standard shipment employee report.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
        suppressHydrationWarning={true}
      >
        <NextTopLoader
          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          zIndex={1600}
          showAtBottom={false}
        />
        <div className="flex flex-col min-h-screen">
          <main className="flex flex-col flex-1 bg-muted/50">
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
