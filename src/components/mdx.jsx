import { isValidElement, Children } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Heading } from '@/components/Heading'
import { Prose } from '@/components/Prose'
import { PersistentCheckbox } from '@/components/PersistentCheckbox'
import { ModuleCompletionBadge } from '@/components/ModuleCompletionBadge'
import { ModuleIndexH2 } from '@/components/ModuleIndexH2'

export function a({ href, children, ...props }) {
  const isExternal = href && (href.startsWith('http') || href.startsWith('//'))
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    )
  }
  return <Link href={href} {...props}>{children}</Link>
}
export { Button } from '@/components/Button'
export { Code as code, CodeGroup, Pre as pre } from '@/components/Code'

export function wrapper({ children }) {
  return (
    <article className="flex h-full flex-col pt-16 pb-10">
      <Prose className="flex-auto">{children}</Prose>
    </article>
  )
}

export const h2 = function H2(props) {
  return <ModuleIndexH2 {...props} />
}

export function h1({ children }) {
  return (
    <h1 className="flex items-center gap-3">
      <span>{children}</span>
      <ModuleCompletionBadge />
    </h1>
  )
}

function InfoIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

export function Note({ children }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-[#C4262E]/20 bg-[#C4262E]/5 p-4 text-sm/6 text-zinc-900 dark:border-[#C4262E]/30 dark:bg-[#C4262E]/10 dark:text-zinc-200">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-[#C4262E] stroke-white dark:fill-[#C4262E]/60 dark:stroke-zinc-200" />
      <div className="*:first:mt-0 *:last:mb-0">{children}</div>
    </div>
  )
}

function getTextContent(node) {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (isValidElement(node) && node.props.children) {
    return Children.toArray(node.props.children).map(getTextContent).join('')
  }
  return ''
}

export function li({ children }) {
  const childArray = Children.toArray(children)
  const first = childArray[0]
  if (
    isValidElement(first) &&
    first.type === 'input' &&
    first.props.type === 'checkbox'
  ) {
    const label = childArray.slice(1).map(getTextContent).join('').trim()
    return (
      <li className="flex items-start gap-2 pl-0! my-1 list-none">
        <PersistentCheckbox label={label} defaultChecked={first.props.checked} />
        <span className={label && childArray.length > 2 ? '' : 'leading-snug'}>
          {childArray.slice(1)}
        </span>
      </li>
    )
  }
  return <li>{children}</li>
}

export function Row({ children }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  )
}

export function Col({ children, sticky = false }) {
  return (
    <div
      className={clsx(
        '*:first:mt-0 *:last:mb-0',
        sticky && 'xl:sticky xl:top-24',
      )}
    >
      {children}
    </div>
  )
}

export function Properties({ children }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="m-0 max-w-[calc(var(--container-lg)-(--spacing(8)))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  )
}

export function Property({ name, children, type }) {
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        {type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              {type}
            </dd>
          </>
        )}
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none *:first:mt-0 *:last:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}
