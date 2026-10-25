import { useEffect, useId, useRef } from 'react'

type MechanicalMotionProps = { reducedMotion: boolean }

const gearOneTeeth = Array.from({ length: 16 }, (_, index) => index)
const gearTwoTeeth = Array.from({ length: 15 }, (_, index) => index)

export function MechanicalMotion({ reducedMotion }: MechanicalMotionProps) {
  const gearOneRef = useRef<SVGGElement>(null)
  const gearTwoRef = useRef<SVGGElement>(null)
  const crankRef = useRef<SVGGElement>(null)
  const rodRef = useRef<SVGLineElement>(null)
  const pistonRef = useRef<SVGGElement>(null)
  const pinRef = useRef<SVGCircleElement>(null)
  const frameRef = useRef<number | undefined>(undefined)
  const gradientId = useId().replace(/:/g, '')

  useEffect(() => {
    if (reducedMotion) return
    const crankCenter = { x: 276, y: 205 }
    const crankRadius = 28
    const rodLength = 94
    let origin = performance.now()
    let pausedAt = 0

    const render = (now: number) => {
      const elapsed = (now - origin) / 1000
      const angle = elapsed * Math.PI * 2 * 0.22
      const degrees = angle * 180 / Math.PI
      const pinX = crankCenter.x + crankRadius * Math.cos(angle)
      const pinY = crankCenter.y + crankRadius * Math.sin(angle)
      const pistonX = crankCenter.x + crankRadius * Math.cos(angle) + Math.sqrt(rodLength ** 2 - (crankRadius * Math.sin(angle)) ** 2)

      gearOneRef.current?.setAttribute('transform', `translate(89 108) rotate(${degrees})`)
      gearTwoRef.current?.setAttribute('transform', `translate(170 108) rotate(${-degrees * 16 / 15})`)
      crankRef.current?.setAttribute('transform', `translate(${crankCenter.x} ${crankCenter.y}) rotate(${degrees})`)
      rodRef.current?.setAttribute('x1', String(pinX))
      rodRef.current?.setAttribute('y1', String(pinY))
      rodRef.current?.setAttribute('x2', String(pistonX))
      rodRef.current?.setAttribute('y2', String(crankCenter.y))
      pinRef.current?.setAttribute('cx', String(pinX))
      pinRef.current?.setAttribute('cy', String(pinY))
      pistonRef.current?.setAttribute('transform', `translate(${pistonX} ${crankCenter.y})`)
      frameRef.current = requestAnimationFrame(render)
    }

    const visibility = () => {
      if (document.hidden) {
        pausedAt = performance.now()
        if (frameRef.current) cancelAnimationFrame(frameRef.current)
      } else {
        origin += performance.now() - pausedAt
        frameRef.current = requestAnimationFrame(render)
      }
    }
    frameRef.current = requestAnimationFrame(render)
    document.addEventListener('visibilitychange', visibility)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); document.removeEventListener('visibilitychange', visibility) }
  }, [reducedMotion])

  return <figure className={`mechanical-motion${reducedMotion ? ' is-static' : ''}`} aria-label="Animated mechanical assembly with meshing gears and a crank-slider mechanism">
    <svg viewBox="0 0 440 310" role="img" aria-labelledby="mechanism-title mechanism-desc">
      <title id="mechanism-title">Mechanical engineering motion study</title>
      <desc id="mechanism-desc">Two external spur gears rotate in opposite directions while a flywheel drives a connecting rod and horizontal piston.</desc>
      <defs><linearGradient id={gradientId} x1="0" x2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".04"/><stop offset="1" stopColor="currentColor" stopOpacity=".16"/></linearGradient></defs>
      <g className="construction"><path d="M24 46H416M24 108H416M24 205H416M24 266H416M89 25V284M170 25V284M276 25V284M370 25V284"/><circle cx="89" cy="108" r="47"/><circle cx="170" cy="108" r="44"/><circle cx="276" cy="205" r="35"/></g>
      <g className="housing"><path d="M42 156V54H210V156"/><path d="M237 251V158H420V251"/><path d="M228 205H425"/></g>
      <g ref={gearOneRef} className="gear gear-one" transform="translate(89 108)">{gearOneTeeth.map((tooth) => <rect key={tooth} x="-4" y="-49" width="8" height="12" rx="1" transform={`rotate(${tooth * 22.5})`}/>)}<circle r="39"/><circle r="26"/><path d="M0-24V24M-24 0H24M-17-17L17 17M17-17L-17 17"/><circle r="9" className="hub"/></g>
      <g ref={gearTwoRef} className="gear gear-two" transform="translate(170 108)">{gearTwoTeeth.map((tooth) => <rect key={tooth} x="-4" y="-46" width="8" height="11" rx="1" transform={`rotate(${tooth * 24})`}/>)}<circle r="36"/><circle r="23"/><path d="M0-21V21M-21 0H21M-15-15L15 15M15-15L-15 15"/><circle r="8" className="hub"/></g>
      <g className="shaft"><circle cx="89" cy="108" r="6"/><circle cx="170" cy="108" r="6"/></g>
      <g ref={crankRef} className="flywheel" transform="translate(276 205)"><circle r="31"/><circle r="22"/><circle r="6" className="hub"/><path d="M0 0L28 0"/><circle cx="28" cy="0" r="5"/></g>
      <line ref={rodRef} className="connecting-rod" x1="304" y1="205" x2="398" y2="205"/>
      <circle ref={pinRef} className="rod-pin" cx="304" cy="205" r="6"/>
      <g ref={pistonRef} className="piston" transform="translate(398 205)"><rect x="-11" y="-24" width="22" height="48" rx="2" fill={`url(#${gradientId})`}/><path d="M-11-15H11M-11 0H11M-11 15H11"/><rect x="-17" y="-28" width="34" height="56" rx="3"/></g>
      <g className="annotation"><path d="M35 282H143"/><path d="M35 278V286M143 278V286"/><text x="89" y="298" textAnchor="middle">PITCH CENTRES / 81</text><text x="276" y="66" textAnchor="middle">CRANK-SLIDER / 01</text><path d="M276 72V155"/></g>
    </svg>
    <figcaption><span>Mechanism study</span><span>Gears / crank / slider</span></figcaption>
  </figure>
}
