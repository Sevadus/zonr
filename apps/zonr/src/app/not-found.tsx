import { ThemeToggle } from '@/components/theme-toggle'

export const runtime = 'edge'

export default async function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4">
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>
      <main className="mx-auto w-full max-w-3xl space-y-6">
        <h1>404 - Page not found</h1>
      </main>
    </div>
  )
}
