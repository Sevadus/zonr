import { z } from 'zod';

import { DiGithubBadge } from 'react-icons/di';

import { Metadata } from 'next';

import DtConfigCard from '@/components/features/dtConfigCard';
import DtConvertCard from '@/components/features/dtConvertCard';
import { ThemeToggle } from '@/components/theme-toggle';

export const runtime = 'edge';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ dt: string | undefined }>;
}): Promise<Metadata> {
  const { dt } = await searchParams;

  const baseUrl = new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://zonr.dev',
  );

  const metadata: Metadata = {
    title: 'zonr - Share your Time',
    metadataBase: baseUrl,
    description:
      'zonr is a platform for sharing your time with others in different timezones',
    openGraph: {
      title: 'zonr - Share your Time',
      description:
        'zonr is a platform for sharing your time with others in different timezones',
      images: dt
        ? [`/opengraph-image?dt=${encodeURIComponent(dt)}`]
        : [`/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      images: dt
        ? [`/opengraph-image?dt=${encodeURIComponent(dt)}`]
        : [`/opengraph-image`],
    },
  };

  return metadata;
}

function isValidDateTime(dt: string) {
  try {
    z.string().datetime({ offset: true }).parse(dt);
    return true;
  } catch {
    return false;
  }
}

export default async function Home({
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const dt = decodeURIComponent((await searchParams).dt as string);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="max-w-3xl w-full mx-auto space-y-6">
        {dt && isValidDateTime(dt) && <DtConvertCard dt={dt} />}
        <DtConfigCard />
        <div className="text-center text-sm text-muted-foreground">
          <p>Stay in sync with a single link.</p>
          <p>
            Made with ❤️ by{' '}
            <a href="https://twitch.tv/sevadus" className="underline">
              Sevadus
            </a>
          </p>
          <p>
            <DiGithubBadge className="inline-block size-4 align-middle" />
            &nbsp;
            <a href="https://github.com/sevadus/zonr" className="underline">
              Source Code
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
