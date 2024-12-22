'use client'
import { Roboto } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { UserProvider } from "@/AuthProvider/UserContext";
import Footer from '@/components/shared/Footer';
// import { UserProvider } from "@/AuthProvider/UserContext";


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
            <main className="my-10">
              {children}
            </main>
            <Footer />
            <Toaster />
          </QueryClientProvider>
        </UserProvider>
      </body>
    </html>
  );
}
