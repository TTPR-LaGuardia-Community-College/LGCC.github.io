'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const STORAGE_PREFIX = 'lgcc:checkboxes:'

// Module-level cache: pathname -> { [label]: boolean }
// Parsed once per page per session — all subsequent reads are O(1) Map lookups.
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

// Writes to cache + localStorage and fires the update event so badges re-check.
function savePage(pathname, data) {
  cache.set(pathname, data)
  try {
    localStorage.setItem(STORAGE_PREFIX + pathname, JSON.stringify(data))
    window.dispatchEvent(
      new CustomEvent('lgcc:checkboxes:update', { detail: { pathname } }),
    )
  } catch {}
}

// Registers a label on first visit (value = false) so isPageComplete always
// sees the full set. Fires the update event so badges recalculate — a newly
// discovered unchecked box means the page is not complete.
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
    // Register this label with its default (false) if not yet stored.
    // This ensures isPageComplete sees every checkbox, not just clicked ones.
    registerLabel(pathname, label, !!defaultChecked)

    // Then read the stored value (may differ from defaultChecked if user
    // has previously visited and checked/unchecked this box).
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
      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-zinc-300 accent-[#C4262E] dark:border-zinc-600"
    />
  )
}
