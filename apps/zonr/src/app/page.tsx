import DtConfigCard from '@/components/features/dtConfigCard'
import DtConvertCard from '@/components/features/dtConvertCard'
import { ThemeToggle } from '@/components/theme-toggle'
import { DateTime } from 'luxon'
import { Metadata } from 'next'
import { DiGithubBadge } from 'react-icons/di'

export const runtime = 'edge'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ dt: string | undefined }>
}): Promise<Metadata> {
  const dt = decodeURIComponent((await searchParams).dt as string)

  const baseUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://zonr.dev')

  const description =
    dt && isValidDateTime(dt)
      ? `Time shared: ${DateTime.fromISO(dt, { setZone: true }).toFormat('FFFF')}. Click for instant conversion to your local timezone.`
      : 'The easiest way to share your time with others in different timezones.'

  const metadata: Metadata = {
    title: 'zonr - Stay in Sync with a Single Link',
    metadataBase: baseUrl,
    description,
    openGraph: {
      title: 'zonr - Stay in Sync with a Single Link',
      description,
      images: dt ? [`/opengraph-image?dt=${encodeURIComponent(dt)}`] : [`/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      images: dt ? [`/opengraph-image?dt=${encodeURIComponent(dt)}`] : [`/opengraph-image`],
    },
  }

  return metadata
}

function isValidDateTime(dt: string) {
  if (dt.length < 4 || dt.length > 25 || dt === 'undefined') {
    return false
  }
  return true
}

export default async function Home({
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const dt = decodeURIComponent((await searchParams).dt as string)
  console.log(dt)
  console.log(isValidDateTime(dt))
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4">
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>
      <main className="mx-auto w-full max-w-3xl space-y-6">
        {dt && isValidDateTime(dt) && <DtConvertCard dt={dt} />}
        <DtConfigCard />
        <div className="text-muted-foreground text-center text-sm">
          <p>Stay in sync with a single link.</p>
          <p>
            Made with ❤️ by{' '}
            <a href="https://twitch.tv/sevadus" target="_blank" className="underline">
              Matt
            </a>
          </p>
          <p>
            <DiGithubBadge className="inline-block size-4 align-middle" />
            &nbsp;
            <a href="https://github.com/sevadus/zonr" target="_blank" className="underline">
              Source
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
