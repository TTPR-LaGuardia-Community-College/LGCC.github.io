'use client'

import { useEffect } from 'react'
import { useCheckboxCompletionStore } from '@/components/CheckboxCompletionStore'

export function NavCompletionBadge({ href, className }) {
  const complete = useCheckboxCompletionStore((s) => s.completions[href] ?? false)
  const checkPage = useCheckboxCompletionStore((s) => s.checkPage)

  // Read localStorage once on mount to seed the store for this href.
  // After that, the global event listener in CheckboxCompletionStore handles updates.
  useEffect(() => {
    checkPage(href)
  }, [href, checkPage])

  if (!complete) return null

  return (
    <span
      aria-label="Completed"
      className={className ?? 'ml-auto shrink-0 self-center text-[1em] leading-none'}
    >
      ✅
    </span>
  )
}
