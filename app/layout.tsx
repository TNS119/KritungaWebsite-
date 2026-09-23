import type { Metadata, Viewport } from 'next';
import { Cinzel, Outfit } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0A0203',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "KRITUNGA — The Palegar's Cuisine | The Royal Taste of Rayalaseema",
  description:
    'Experience the legendary scrollytelling journey of Kritunga. Fiery Rayalaseema Dum Biryani, Natu Kodi Ragi Mudda, Gongura Mutton, and authentic 21-spice potli dum crafted in earthen pots over wood embers.',
  keywords: [
    'Kritunga',
    'Palegar Cuisine',
    'Rayalaseema Biryani',
    'Natu Kodi Biryani',
    'Ragi Mudda',
    'Gongura Mutton',
    'Pot Biryani',
    'Hyderabad Best Biryani',
    'Authentic Andhra Restaurant',
  ],
  authors: [{ name: "Kritunga The Palegar's Cuisine" }],
  openGraph: {
    title: "KRITUNGA — The Palegar's Cuisine | Royal Rayalaseema Feast",
    description:
      'The sacred culinary traditions of Rayalaseema warlords. Handcrafted earthen pot dum biryani with 21 secret spices.',
    siteName: "Kritunga The Palegar's Cuisine",
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "KRITUNGA — The Palegar's Cuisine",
    description: 'Fiery Heritage, Regal Flavours. Authentic Rayalaseema Ruchulu.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${cinzel.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-palegar-crimson selection:text-palegar-goldLight">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
