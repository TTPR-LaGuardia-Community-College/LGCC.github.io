'use client'

import { useId } from 'react'

export function GridPattern({ width, height, x, y, squares, ...props }) {
  let patternId = useId()

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={width / 2} cy={height / 2} r="1.5" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy]) => (
            <circle
              key={`${sx}-${sy}`}
              cx={sx * width + width / 2}
              cy={sy * height + height / 2}
              r="4"
            />
          ))}
        </svg>
      )}
    </svg>
  )
}
