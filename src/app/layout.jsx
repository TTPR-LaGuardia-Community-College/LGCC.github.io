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

// cache the promise itself — not just the result — so concurrent requests
// (e.g. prefetch + navigate arriving before the first resolves) share one
// computation instead of each triggering a full glob + import chain.
// restart the dev server if you add new mdx files or change exported `sections`.
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
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
