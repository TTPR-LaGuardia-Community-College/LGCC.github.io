'use client'

import { useEffect } from 'react'
import { useCheckboxCompletionStore } from '@/components/CheckboxCompletionStore'

export function NavCompletionBadge({ href, className }) {
  const complete = useCheckboxCompletionStore((s) => s.completions[href] ?? false)
  const checkPage = useCheckboxCompletionStore((s) => s.checkPage)

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
