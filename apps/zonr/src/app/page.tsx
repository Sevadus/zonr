import DtConfigCard from '@/components/features/dtConfigCard'
import { ThemeToggle } from '@/components/theme-toggle'
import { Metadata } from 'next'
import { DiGithubBadge } from 'react-icons/di'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://zonr.dev')

  const description = 'The easiest way to share your time with others in different timezones.'

  const metadata: Metadata = {
    title: 'zonr - Stay in Sync with a Single Link',
    metadataBase: baseUrl,
    description,
    openGraph: {
      title: 'zonr - Stay in Sync with a Single Link',
      description,
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/opengraph-image'],
    },
  }

  return metadata
}

export default async function Home() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4">
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>
      <main className="mx-auto w-full max-w-3xl space-y-6">
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
