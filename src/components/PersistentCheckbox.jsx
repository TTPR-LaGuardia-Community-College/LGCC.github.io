'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const STORAGE_PREFIX = 'lgcc:checkboxes:'

const cache = new Map()

function loadPage(pathname) {
  if (cache.has(pathname)) return cache.get(pathname)
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + pathname)
    const data = raw ? JSON.parse(raw) : {}
    cache.set(pathname, data)
    return data
  } catch {
    cache.set(pathname, {})
    return {}
  }
}

function savePage(pathname, data) {
  cache.set(pathname, data)
  try {
    localStorage.setItem(STORAGE_PREFIX + pathname, JSON.stringify(data))
    window.dispatchEvent(
      new CustomEvent('lgcc:checkboxes:update', { detail: { pathname } }),
    )
  } catch {}
}

function registerLabel(pathname, label, value) {
  const page = loadPage(pathname)
  if (label in page) return // already registered, nothing to do
  const next = { ...page, [label]: value }
  cache.set(pathname, next)
  try {
    localStorage.setItem(STORAGE_PREFIX + pathname, JSON.stringify(next))
    window.dispatchEvent(
      new CustomEvent('lgcc:checkboxes:update', { detail: { pathname } }),
    )
  } catch {}
}

export function PersistentCheckbox({ label, defaultChecked }) {
  const pathname = usePathname()
  const [checked, setChecked] = useState(!!defaultChecked)

  useEffect(() => {
    registerLabel(pathname, label, !!defaultChecked)
    const page = loadPage(pathname)
    setChecked(page[label])
  }, [pathname, label, defaultChecked])

  function handleChange(e) {
    const next = e.target.checked
    setChecked(next)
    const page = loadPage(pathname)
    savePage(pathname, { ...page, [label]: next })
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      aria-label={label}
      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-zinc-300 accent-[#C4262E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4262E] focus-visible:ring-offset-2 dark:border-zinc-600"
    />
  )
}
