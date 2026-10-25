type RMMarkProps = { compact?: boolean }

export function RMMark({ compact = false }: RMMarkProps) {
  return <svg className="rm-mark" viewBox="0 0 54 54" role="img" aria-label="RM engineering monogram">
    <path d="M8 43V11h14.5c7.2 0 11.5 3.5 11.5 9.6 0 4-1.9 7-5.4 8.5L36 43h-8.4l-6.2-12H16v12H8Z"/>
    {!compact && <path d="M36 43V11h5.9l5.1 13.6L52 11h5.9v32h-7.5V26.8l-3.2 8.6h-1L43 26.8V43H36Z" transform="translate(-4 0) scale(.86 1)"/>}
    <path className="rm-mark-line" d="M6 47H48M6 7H48"/>
  </svg>
}
