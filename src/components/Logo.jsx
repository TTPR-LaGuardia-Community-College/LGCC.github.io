import Image from 'next/image'
import logoImg from '@/images/logos/LG-logo.png'

export function Logo({ className, ...props }) {
  return (
    <div className="flex flex-row items-center gap-2.5" {...props}>
      <Image
        src={logoImg}
        alt="LaGuardia Community College"
        height={24}
        width={24}
        className="shrink-0 object-contain"
        unoptimized
      />
      <span className="text-sm font-semibold leading-none whitespace-nowrap text-zinc-900 dark:text-white">
        LAGCC TTPR Handbook
      </span>
    </div>
  )
}
