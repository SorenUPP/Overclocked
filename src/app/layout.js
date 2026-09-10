import { Archivo, Barlow, IBM_Plex_Mono } from 'next/font/google';
import Providers from '@/lib/providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata = {
  title: 'PC Builder — Build the PC you actually need',
  description:
    'Name your games, resolution, frame-rate target and budget. We resolve them against a curated hardware index and return one build that holds together.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${barlow.variable} ${plexMono.variable}`}
    >
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
