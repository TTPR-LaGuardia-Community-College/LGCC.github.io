'use client'

import { usePathname } from 'next/navigation'

import { Heading } from '@/components/Heading'
import { NavCompletionBadge } from '@/components/NavCompletionBadge'
import { getTextContent } from '@/lib/getTextContent'

const MODULE_HREFS = {
  1: '/modules/01-setup',
  2: '/modules/02-html',
  3: '/modules/03-css',
  4: '/modules/04-javascript',
  5: '/modules/05-dom',
  6: '/modules/06-apis',
  7: '/modules/07-react',
  8: '/modules/08-state-props',
  9: '/modules/09-routing',
  10: '/modules/10-node-express',
  11: '/modules/11-databases',
  12: '/modules/12-crud',
  13: '/modules/13-deployment',
  14: '/modules/14-capstone',
}

export function ModuleIndexH2({ children, ...props }) {
  const pathname = usePathname()
  const isModulesIndex = pathname === '/modules'

  let moduleHref = null
  if (isModulesIndex) {
    const text = getTextContent(children)
    const match = text.match(/Module\s+(\d+)/)
    if (match) {
      moduleHref = MODULE_HREFS[parseInt(match[1], 10)] ?? null
    }
  }

  return (
    <Heading level={2} {...props}>
      <span className="inline-flex items-center gap-2">
        {children}
        {moduleHref && (
          <NavCompletionBadge
            href={moduleHref}
            className="shrink-0 text-[1em] leading-none"
          />
        )}
      </span>
    </Heading>
  )
}
