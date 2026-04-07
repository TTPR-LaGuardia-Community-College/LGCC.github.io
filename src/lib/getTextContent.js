import { Children, isValidElement } from 'react'

export function getTextContent(node) {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join('')
  if (isValidElement(node) && node.props.children) {
    return Children.toArray(node.props.children).map(getTextContent).join('')
  }
  return ''
}
