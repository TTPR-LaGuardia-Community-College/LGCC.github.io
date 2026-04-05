'use client'

import clsx from 'clsx'
import { motion, useIsPresent } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useMobileNavigationStore } from '@/components/MobileNavigationStore'
import { navigation } from '@/components/navigation-data'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { NavCompletionBadge } from '@/components/NavCompletionBadge'
import { remToPx } from '@/lib/remToPx'

function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({ href, children }) {
  let { close } = useMobileNavigationStore()
  return (
    <li className="md:hidden">
      <Link
        href={href}
        onClick={close}
        className="block py-1 text-sm text-zinc-600 transition duration-200 ease-in hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({ href, children, tag, active = false, isAnchorLink = false, onClose }) {
  return (
    <Link
      href={href}
      onClick={onClose}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition duration-200 ease-in',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
      {!isAnchorLink && <NavCompletionBadge href={href} />}
    </Link>
  )
}

function SubNavLink({ href, children, active, onClose }) {
  return (
    <Link
      href={href}
      onClick={onClose}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-0.5 pl-8 pr-3 text-xs transition duration-200 ease-in rounded-md',
        active
          ? 'bg-zinc-800/5 text-zinc-900 dark:bg-white/5 dark:text-white'
          : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white',
      )}
    >
      <span className="truncate">{children}</span>
      <NavCompletionBadge href={href} />
    </Link>
  )
}

function VisibleSectionHighlight({ group, pathname }) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0],
    ),
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      className="absolute left-2 h-6 w-px bg-[#C4262E]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      style={{ top, transition: 'top 200ms ease' }}
    />
  )
}

function NavigationGroup({ group, className }) {
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let { close } = useMobileNavigationStore()
  let onClose = isInsideMobileNavigation ? close : undefined

  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation,
  )

  let effectivePathname = pathname
  for (const link of group.links) {
    if (link.sublinks?.some((s) => s.href === pathname)) {
      effectivePathname = link.href
      break
    }
  }

  let isActiveGroup =
    group.links.findIndex((link) => link.href === effectivePathname) !== -1

  let isOnSublink = effectivePathname !== pathname

  return (
    <li className={clsx('relative mt-6', className)}>
      <h2 className="text-xs font-semibold text-zinc-900 dark:text-white">
        {group.title}
      </h2>
      <div className="relative mt-3 pl-2">
        {isActiveGroup && !isOnSublink && (
          <VisibleSectionHighlight group={group} pathname={effectivePathname} />
        )}
        <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5" />
        {isActiveGroup && (
          <ActivePageMarker group={group} pathname={effectivePathname} />
        )}
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => {
            const isActive = link.href === pathname
            const isParentOfActive =
              link.sublinks?.some((s) => s.href === pathname) ?? false
            const showSublinks =
              link.sublinks &&
              (isActive || isParentOfActive || pathname.startsWith(link.href + '/'))

            return (
              <li key={link.href} className="relative">
                <NavLink
                  href={link.href}
                  active={isActive}
                  onClose={onClose}
                >
                  {link.title}
                </NavLink>

                {showSublinks && (
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.12, ease: 'easeOut' } }}
                    exit={{ opacity: 0, transition: { duration: 0 } }}
                  >
                    {link.sublinks.map((sub) => (
                      <li key={sub.href}>
                        <SubNavLink
                          href={sub.href}
                          active={sub.href === pathname}
                          onClose={onClose}
                        >
                          {sub.title}
                        </SubNavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}

                {isActive && !link.sublinks && sections.length > 0 && (
                  <ul
                    role="list"
                    className="animate-in fade-in duration-150"
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          href={`${link.href}#${section.id}`}
                          tag={section.tag}
                          isAnchorLink
                          onClose={onClose}
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </li>
  )
}

export function Navigation(props) {
  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href="/">Handbook</TopLevelNavItem>
        <TopLevelNavItem href="/get-started">Get Started</TopLevelNavItem>
        <TopLevelNavItem href="/modules">Modules</TopLevelNavItem>
        <TopLevelNavItem href="/faq">FAQ</TopLevelNavItem>
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
      </ul>
    </nav>
  )
}
