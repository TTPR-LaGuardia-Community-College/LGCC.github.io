'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useCheckboxCompletionStore } from '@/components/CheckboxCompletionStore'

export function ModuleCompletionBadge() {
  const pathname = usePathname()
  const isModulePage = pathname.startsWith('/modules/') && pathname !== '/modules'

  const complete = useCheckboxCompletionStore((s) => s.completions[pathname] ?? false)
  const checkPage = useCheckboxCompletionStore((s) => s.checkPage)

  useEffect(() => {
    if (isModulePage) checkPage(pathname)
  }, [pathname, isModulePage, checkPage])

  if (!isModulePage || !complete) return null

  return (
    <span
      aria-label="Module complete"
      className="shrink-0 text-xl leading-none"
    >
      ✅
    </span>
  )
}
