import { create } from 'zustand'

const STORAGE_PREFIX = 'lgcc:checkboxes:'

function readIsComplete(href) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + href)
    if (!raw) return false
    const data = JSON.parse(raw)
    const values = Object.values(data)
    return values.length > 0 && values.every(Boolean)
  } catch {
    return false
  }
}

export const useCheckboxCompletionStore = create((set, get) => ({
  completions: {},

  checkPage: (href) => {
    const complete = readIsComplete(href)
    if (get().completions[href] !== complete) {
      set((s) => ({ completions: { ...s.completions, [href]: complete } }))
    }
  },
}))

if (typeof window !== 'undefined') {
  const handler = (e) => {
    const { pathname } = e.detail ?? {}
    if (pathname) useCheckboxCompletionStore.getState().checkPage(pathname)
  }
  if (window.__lgccCheckboxHandler) {
    window.removeEventListener('lgcc:checkboxes:update', window.__lgccCheckboxHandler)
  }
  window.__lgccCheckboxHandler = handler
  window.addEventListener('lgcc:checkboxes:update', handler)
}
