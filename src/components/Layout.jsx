'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { SectionProvider } from '@/components/SectionProvider'
import { useSidebarStore } from '@/components/SidebarStore'

export function Layout({ children, allSections }) {
  let pathname = usePathname()
  let { isOpen } = useSidebarStore()

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <aside
        aria-label="Sidebar navigation"
        className={clsx(
          'fixed inset-y-0 left-0 z-40 hidden lg:flex lg:flex-col',
          'bg-white dark:bg-zinc-900',
          'transition-[width] duration-300 ease-in-out overflow-hidden',
          isOpen
            ? 'lg:w-72 xl:w-80 border-r border-zinc-900/10 dark:border-white/10'
            : 'lg:w-0 border-r-0',
        )}
      >
        <div className="flex h-full w-72 xl:w-80 flex-col overflow-y-auto px-6 pt-4 pb-8">
          <div className="flex shrink-0">
            <Link href="/" aria-label="Home">
              <Logo />
            </Link>
          </div>
          <Navigation className="mt-10 flex-1" />
        </div>
      </aside>
      <div
        className={clsx(
          'flex min-h-full flex-col',
          'transition-[padding-left] duration-300 ease-in-out',
          isOpen ? 'lg:pl-72 xl:pl-80' : 'lg:pl-0',
        )}
      >
        <Header />
        <div className="relative flex flex-1 flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main id="main-content" className="flex-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}
