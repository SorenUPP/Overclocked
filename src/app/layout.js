import Providers from '@/lib/providers';

export const metadata = {
  title: 'Overclocked — PC Build Recommender',
  description:
    'Tell us your budget, the games you play, and your target FPS. Get a matching PC build.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
