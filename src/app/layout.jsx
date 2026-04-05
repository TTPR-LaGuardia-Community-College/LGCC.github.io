import glob from 'fast-glob'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - LAGCC Handbook',
    default: 'LAGCC Student Handbook',
  },
  description:
    'Student handbook and course archive for the TTPR program at LaGuardia Community College.',
}

let _sectionsPromise = null

function getAllSections() {
  if (!_sectionsPromise) {
    _sectionsPromise = (async () => {
      const pages = await glob('**/*.mdx', { cwd: 'src/app' })
      const entries = await Promise.all(
        pages.map(async (filename) => [
          '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
          (await import(`./${filename}`)).sections,
        ]),
      )
      return Object.fromEntries(entries)
    })()
  }
  return _sectionsPromise
}

export default async function RootLayout({ children }) {
  let allSections = await getAllSections()

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-zinc-900 focus:ring-2 focus:ring-[#C4262E] dark:focus:bg-zinc-900 dark:focus:text-white"
          >
            Skip to main content
          </a>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
