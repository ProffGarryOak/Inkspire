import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MindInk - AI Journaling",
  description: "AI-powered journaling with mood analysis and insights.",
  openGraph: {
    type: "website",
    url: "https://inkspirejournal.vercel.app/",
    title: "MindInk - AI Journaling",
    description: "AI-powered journaling with mood analysis.",
    images: [
      {
        url: "https://drive.google.com/file/d/1FbIl0uYbIarkF6inaxXRA3X1XuwJddL6/view?usp=sharing",
        width: 1200,
        height: 630,
        alt: "Inkspire Preview",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <main style={styles.main}>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
const styles = {
  
  main: {
    flex: 1, 
    padding: '20px',
    minHeight: '100vh',
  },
};
