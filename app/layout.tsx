import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "JM's Texas Craft BBQ | Urbana, IL",
  description: "Authentic low & slow smokehouse flavors straight from ATX to CU. Serving Urbana, IL.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-stone-950 text-stone-100 antialiased selection:bg-orange-600 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
