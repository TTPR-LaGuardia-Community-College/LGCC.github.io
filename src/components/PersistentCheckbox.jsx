'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function PersistentCheckbox({ label, defaultChecked }) {
  const pathname = usePathname()
  const storageKey = `checkbox:${pathname}:${label}`
  const [checked, setChecked] = useState(!!defaultChecked)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored !== null) {
      setChecked(stored === 'true')
    }
  }, [storageKey])

  function handleChange(e) {
    const next = e.target.checked
    setChecked(next)
    localStorage.setItem(storageKey, String(next))
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-zinc-300 accent-[#C4262E] dark:border-zinc-600"
    />
  )
}
