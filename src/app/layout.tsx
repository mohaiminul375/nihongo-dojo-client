'use client'
import localFont from "next/font/local";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { UserProvider } from "@/AuthProvider/UserContext";
// import { UserProvider } from "@/AuthProvider/UserContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const roboto = Roboto({
  subsets: ['latin'], // Add subsets as needed
  weight: ['400', '700'], // Specify font weights
  style: ['normal', 'italic'], // Specify styles
  variable: '--font-roboto', // Optional CSS variable
});

// Create a client
const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={`${roboto.className} antialiased`}
      >
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <main className="mt-10">
              {children}
            </main>
            <Toaster />
          </QueryClientProvider>
        </UserProvider>
      </body>
    </html>
  );
}
