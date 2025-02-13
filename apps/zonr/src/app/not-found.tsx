import { ThemeToggle } from '@/components/theme-toggle';

export const runtime = 'edge';

export default async function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="max-w-3xl w-full mx-auto space-y-6">
        <h1>404 - Page not found</h1>
      </main>
    </div>
  );
}
