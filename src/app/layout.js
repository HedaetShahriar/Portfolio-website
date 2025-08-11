import { Inter, Sora } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

// New Metadata API for SEO and social sharing
export const metadata = {
  title: {
    default: 'Md. Hedaet Shahriar Himon - Portfolio',
    template: '%s | Md. Hedaet Shahriar Himon',
  },
  description: 'The professional portfolio of Md. Hedaet Shahriar Himon, a Full Stack Developer.',
  openGraph: {
    title: 'Md. Hedaet Shahriar Himon - Portfolio',
    description: 'Full Stack Developer Portfolio.',
    url: 'https://your-domain.com', // Replace with your actual domain
    siteName: 'Md. Hedaet Shahriar Himon',
    images: [
      {
        url: 'https://your-domain.com/og-image.png', // Add an OG image to your public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} scroll-smooth`}>
      <body className="antialiased" suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}