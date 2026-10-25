import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Group } from 'three'

function Gear({ teeth, radius, position, speed }: { teeth: number; radius: number; position: [number, number, number]; speed: number }) {
  const group = useRef<Group>(null)
  const toothAngles = useMemo(() => Array.from({ length: teeth }, (_, i) => i * Math.PI * 2 / teeth), [teeth])
  useFrame(({ clock }) => { if (group.current) group.current.rotation.z = clock.getElapsedTime() * speed })
  return <group ref={group} position={position}><mesh castShadow receiveShadow><cylinderGeometry args={[radius, radius, .28, 48]}/><meshStandardMaterial color="#aeb6bd" metalness={.9} roughness={.2}/></mesh><mesh position={[0, 0, .16]}><cylinderGeometry args={[radius * .62, radius * .62, .025, 48]}/><meshStandardMaterial color="#525960" metalness={.8} roughness={.24}/></mesh>{toothAngles.map((angle) => <mesh key={angle} position={[Math.cos(angle) * (radius + .12), Math.sin(angle) * (radius + .12), 0]} rotation={[0, 0, angle]} castShadow><boxGeometry args={[.21, .13, .34]}/><meshStandardMaterial color="#d6dce0" metalness={.92} roughness={.16}/></mesh>)}<mesh position={[0, 0, .2]}><cylinderGeometry args={[radius * .18, radius * .18, .42, 28]}/><meshStandardMaterial color="#f2f4f5" metalness={.96} roughness={.13}/></mesh></group>
}

function QuickReturn() {
  const crank = useRef<Group>(null); const lever = useRef<Group>(null); const coupling = useRef<Group>(null); const ram = useRef<Group>(null)
  useFrame(({ clock }) => {
    const angle = clock.getElapsedTime() * 1.2
    const pivot = { x: -1.45, y: -2.1 }; const crankCentre = { x: -.42, y: -2.1 }; const crankRadius = .46
    const pinX = crankCentre.x + crankRadius * Math.cos(angle); const pinY = crankCentre.y + crankRadius * Math.sin(angle)
    const leverAngle = Math.atan2(pinY - pivot.y, pinX - pivot.x); const leverLength = 2.1
    const endX = pivot.x + leverLength * Math.cos(leverAngle); const endY = pivot.y + leverLength * Math.sin(leverAngle)
    const ramY = -2.1; const couplingLength = 2.15; const ramX = endX + Math.sqrt(Math.max(.01, couplingLength ** 2 - (endY - ramY) ** 2))
    if (crank.current) { crank.current.position.set(crankCentre.x, crankCentre.y, 0); crank.current.rotation.z = angle }
    if (lever.current) { lever.current.position.set(pivot.x, pivot.y, 0); lever.current.rotation.z = leverAngle }
    if (coupling.current) { const dx = ramX - endX; const dy = ramY - endY; coupling.current.position.set(endX + dx / 2, endY + dy / 2, 0); coupling.current.rotation.z = Math.atan2(dy, dx) }
    if (ram.current) ram.current.position.set(ramX, ramY, 0)
  })
  return <group><mesh position={[-.42,-2.1,0]} rotation={[Math.PI / 2,0,0]}><cylinderGeometry args={[.67,.67,.24,48]}/><meshStandardMaterial color="#8c969e" metalness={.9} roughness={.2}/></mesh><group ref={crank}><mesh position={[.23,0,0]}><boxGeometry args={[.46,.1,.12]}/><meshStandardMaterial color="#b9c1c7" metalness={.9} roughness={.17}/></mesh><mesh position={[.46,0,0]}><sphereGeometry args={[.12,20,20]}/><meshStandardMaterial color="#f0f2f3" metalness={.97} roughness={.12}/></mesh></group><group ref={lever}><mesh position={[1.05,0,0]}><boxGeometry args={[2.1,.2,.22]}/><meshStandardMaterial color="#76818a" metalness={.87} roughness={.23}/></mesh><mesh position={[.92,0,.14]}><boxGeometry args={[1.45,.07,.08]}/><meshStandardMaterial color="#20262b" metalness={.75} roughness={.3}/></mesh></group><mesh position={[-1.45,-2.1,.18]}><cylinderGeometry args={[.16,.16,.4,24]}/><meshStandardMaterial color="#e8ecee" metalness={.95} roughness={.14}/></mesh><group ref={coupling}><mesh><boxGeometry args={[2.15,.16,.16]}/><meshStandardMaterial color="#d8dde0" metalness={.93} roughness={.15}/></mesh></group><group ref={ram}><mesh><boxGeometry args={[.48,.72,.56]}/><meshStandardMaterial color="#b4bdc4" metalness={.9} roughness={.19}/></mesh></group><mesh position={[2.7,-2.1,0]}><boxGeometry args={[.18,1.2,.8]}/><meshStandardMaterial color="#495158" metalness={.78} roughness={.28}/></mesh></group>
}

function Assembly() { return <><color attach="background" args={['#15191d']}/><ambientLight intensity={.95}/><directionalLight position={[4,5,5]} intensity={2.5} castShadow/><pointLight position={[-4,1,3]} intensity={10} color="#dce5ea" distance={7}/><Gear teeth={16} radius={1.18} position={[-1.35,.6,0]} speed={.75}/><Gear teeth={12} radius={.88} position={[.7,.6,0]} speed={-1}/><QuickReturn/><gridHelper args={[9,9,'#6b747c','#30373d']} position={[0,-3.1,-.55]}/></> }

export default function MechanicalAssembly3D() { return <div className="assembly-3d" aria-label="Interactive 3D mechanical gear and crank assembly"><Canvas shadows dpr={[1,1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }}><PerspectiveCamera makeDefault position={[0,0,8]} fov={34}/><Assembly/><OrbitControls enablePan={false} minDistance={5.5} maxDistance={11} maxPolarAngle={Math.PI*.65} minPolarAngle={Math.PI*.28}/></Canvas><span className="assembly-note">Drag to inspect · Scroll to zoom</span></div> }
