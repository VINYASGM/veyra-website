import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthProvider } from '@/hooks/useAuth';
import { SuppressKnownWarnings } from '@/components/SuppressKnownWarnings';

export const metadata: Metadata = {
  title: {
    default: 'Veyra — Your Mind, Infinitely Augmented',
    template: '%s | Veyra',
  },
  description:
    'Veyra is an AI lifelong-tutoring platform that builds a persistent model of you and makes every learning decision personal, adaptive, and optimized for real skill acquisition.',
  keywords: ['AI tutoring', 'adaptive learning', 'personalized education', 'Veyra', 'metacognition'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Veyra',
    title: 'Veyra — Your Mind, Infinitely Augmented',
    description: 'AI lifelong-tutoring platform with a persistent, evolving model of you.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SuppressKnownWarnings />
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
