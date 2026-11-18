import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { NotificationListener } from "@/components/notifications/notification-listener";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exovie",
  description: "Exovie workspace",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-svh flex-col bg-background text-foreground">
        <NotificationListener />

        <main className="flex min-h-0 flex-1 flex-col">
          {children}
        </main>

        <Toaster
  position="top-right"
  theme="dark"
  closeButton
  duration={5000}
  toastOptions={{
    classNames: {
      toast: "!bg-zinc-900 !border !border-zinc-700 !text-white !rounded-xl !shadow-xl",
      title: "!text-sm !font-semibold !text-white",
      description: "!text-xs !text-zinc-400",
      closeButton: "!bg-zinc-800 !border-zinc-700 !text-white",
    },
  }}
/>
      </body>
    </html>
  );
}