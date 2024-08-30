import type { Metadata } from "next";
import { Inter, Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/reutilizable/theme-provider"
const recursive = Recursive({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "2kceltics | Home",
  description: "2kceltics v2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >

      <title>2kceltics | Home</title>
      <meta name="description" content="2kceltics v2" />
      <meta property="og:url" content="https://2kceltics.xyz" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="2kceltics | Home" />
      <meta property="og:description" content="2kceltics v2" />
      <meta property="og:image" content="https://opengraph.b-cdn.net/production/images/a13bd035-00fd-4ba3-a010-7c2c46260eba.jpg?token=-wLRIoq9gpRyzt23-Wi2L338yaGYQvsHhl7Yfufo1uA&height=630&width=1200&expires=33261025516" />


      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="2kceltics.xyz" />
      <meta property="twitter:url" content="https://2kceltics.xyz" />
      <meta name="twitter:title" content="2kceltics | Home" />
      <meta name="twitter:description" content="2kceltics v2" />
      <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/a13bd035-00fd-4ba3-a010-7c2c46260eba.jpg?token=-wLRIoq9gpRyzt23-Wi2L338yaGYQvsHhl7Yfufo1uA&height=630&width=1200&expires=33261025516">
      </meta>
      <body className={`${recursive.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
