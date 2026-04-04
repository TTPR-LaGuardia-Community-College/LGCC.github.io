export function HeroPattern() {
  return (
    <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">

      {/* dot grid — fades radially from top center, light mode */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(196,38,46,0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 55% at 50% 0%, black 0%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 100% 55% at 50% 0%, black 0%, transparent 100%)',
        }}
      />

      {/* dot grid — dark mode, slightly more visible */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(196,38,46,0.28) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          WebkitMaskImage:
            'radial-gradient(ellipse 100% 55% at 50% 0%, black 0%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 100% 55% at 50% 0%, black 0%, transparent 100%)',
        }}
      />

      {/* concentric arcs bleeding off the top-right corner */}
      <svg
        aria-hidden="true"
        className="absolute top-0 right-0 opacity-[0.07] dark:opacity-[0.13] pointer-events-none"
        width="520"
        height="420"
        viewBox="0 0 520 420"
        fill="none"
      >
        <circle cx="520" cy="0" r="160" stroke="#C4262E" strokeWidth="1.5" />
        <circle cx="520" cy="0" r="240" stroke="#C4262E" strokeWidth="1" />
        <circle cx="520" cy="0" r="320" stroke="#C4262E" strokeWidth="1" />
        <circle cx="520" cy="0" r="400" stroke="#C4262E" strokeWidth="0.75" />
        <circle cx="520" cy="0" r="480" stroke="#C4262E" strokeWidth="0.75" />
      </svg>

      {/* soft red glow behind the arcs */}
      <div className="absolute -top-20 right-0 h-72 w-96 rounded-full bg-[#C4262E] opacity-[0.04] blur-[72px] dark:opacity-[0.08]" />

    </div>
  )
}
