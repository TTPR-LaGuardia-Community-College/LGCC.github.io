import nextMDX from '@next/mdx'

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/handbook',
  assetPrefix: '/handbook',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/**/*': ['./src/app/**/*.mdx'],
  },
  images: {
    unoptimized: true,
  },
  // Cache RSC payloads: 30s for dynamic routes, 5min for static.
  // Prevents the router from re-fetching a page that was already prefetched.
  // Moved to top-level in Next.js 15+ (no longer under experimental).
  staleTimes: {
    dynamic: 30,
    static: 300,
  },
  webpack(config, { dev }) {
    if (dev) {
      // Persist the webpack compilation cache to disk across dev server restarts.
      // First visit to any page still compiles, but restarts are instant.
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [new URL(import.meta.url).pathname],
        },
      }
    }
    return config
  },
}

export default withSearch(withMDX(nextConfig))
