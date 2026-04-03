import Image from 'next/image'
import logoImg from '@/images/logos/LG-logo.png'

export function Logo(props) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <Image
        src={logoImg}
        alt="LaGuardia Community College"
        height={28}
        width={28}
        className="h-7 w-7 object-contain"
        unoptimized
      />
      <span className="text-sm font-semibold text-zinc-900 dark:text-white">
        LAGCC Handbook
      </span>
    </div>
  )
}
