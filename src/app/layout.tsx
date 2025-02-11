import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';

export const runtime = 'edge';

interface Props {
  params: { slug: string };
  searchParams: { dt?: string };
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const dt = searchParams.dt;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zonr.dev';

  const metadata: Metadata = {
    title: 'zonr - Share your Time',
    description:
      'zonr is a platform for sharing your time with others in different timezones',
    openGraph: {
      title: 'zonr - Share your Time',
      description:
        'zonr is a platform for sharing your time with others in different timezones',
      images: dt
        ? [`${baseUrl}/api/og?dt=${encodeURIComponent(dt)}`]
        : [`${baseUrl}/api/og`],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };

  return metadata;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
