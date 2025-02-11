import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'zonr - Share your Time',
  description:
    'zonr is a platform for sharing your time with others in different timezones',
};

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
