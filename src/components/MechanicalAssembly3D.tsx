import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Group } from 'three'

function Gear({ teeth, radius, position, speed }: { teeth: number; radius: number; position: [number, number, number]; speed: number }) {
  const group = useRef<Group>(null)
  const toothAngles = useMemo(() => Array.from({ length: teeth }, (_, i) => i * Math.PI * 2 / teeth), [teeth])
  useFrame(({ clock }) => { if (group.current) group.current.rotation.z = clock.getElapsedTime() * speed })
  return <group ref={group} position={position}><mesh castShadow receiveShadow><cylinderGeometry args={[radius, radius, .28, 48]}/><meshStandardMaterial color="#3b3d3f" metalness={.82} roughness={.28}/></mesh><mesh position={[0, 0, .16]}><cylinderGeometry args={[radius * .62, radius * .62, .025, 48]}/><meshStandardMaterial color="#131416" metalness={.72} roughness={.22}/></mesh>{toothAngles.map((angle) => <mesh key={angle} position={[Math.cos(angle) * (radius + .12), Math.sin(angle) * (radius + .12), 0]} rotation={[0, 0, angle]} castShadow><boxGeometry args={[.21, .13, .34]}/><meshStandardMaterial color="#4a4c4e" metalness={.85} roughness={.25}/></mesh>)}<mesh position={[0, 0, .2]}><cylinderGeometry args={[radius * .18, radius * .18, .42, 28]}/><meshStandardMaterial color="#dadada" metalness={.94} roughness={.16}/></mesh></group>
}

function CrankSlider() {
  const crank = useRef<Group>(null); const rod = useRef<Group>(null); const piston = useRef<Group>(null)
  useFrame(({ clock }) => { const angle = clock.getElapsedTime() * 1.2; const r = .62; const l = 2; const pinX = r * Math.cos(angle); const pinY = r * Math.sin(angle); const pistonX = pinX + Math.sqrt(l * l - pinY * pinY); const dx = pistonX - pinX; const dy = -pinY; if (crank.current) crank.current.rotation.z = angle; if (rod.current) { rod.current.position.set(pinX + dx / 2, pinY + dy / 2, 0); rod.current.rotation.z = Math.atan2(dy, dx) } if (piston.current) piston.current.position.x = pistonX })
  return <group position={[0,-2.15,0]}><mesh rotation={[Math.PI / 2,0,0]}><cylinderGeometry args={[.78,.78,.24,48]}/><meshStandardMaterial color="#3b3d3f" metalness={.86} roughness={.25}/></mesh><group ref={crank}><mesh position={[.62,0,0]}><sphereGeometry args={[.13,20,20]}/><meshStandardMaterial color="#d4d4d4" metalness={.95} roughness={.15}/></mesh><mesh position={[.31,0,0]}><boxGeometry args={[.62,.1,.1]}/><meshStandardMaterial color="#989898" metalness={.85} roughness={.2}/></mesh></group><group ref={rod}><mesh><boxGeometry args={[2,.15,.15]}/><meshStandardMaterial color="#b9b9b9" metalness={.9} roughness={.18}/></mesh></group><group ref={piston}><mesh><boxGeometry args={[.44,.8,.55]}/><meshStandardMaterial color="#55575a" metalness={.85} roughness={.26}/></mesh></group><mesh position={[2,0,0]}><boxGeometry args={[.18,1.28,.76]}/><meshStandardMaterial color="#1a1b1d" metalness={.72} roughness={.3}/></mesh></group>
}

function Assembly() { return <><color attach="background" args={['#111214']}/><ambientLight intensity={.7}/><directionalLight position={[4,5,5]} intensity={2.1} castShadow/><pointLight position={[-4,1,3]} intensity={12} color="#ffcc00" distance={7}/><Gear teeth={16} radius={1.18} position={[-1.35,.6,0]} speed={.75}/><Gear teeth={12} radius={.88} position={[.7,.6,0]} speed={-1}/><CrankSlider/><gridHelper args={[9,9,'#393b3e','#242629']} position={[0,-3.1,-.55]}/></> }

export default function MechanicalAssembly3D() { return <div className="assembly-3d" aria-label="Interactive 3D mechanical gear and crank assembly"><Canvas shadows dpr={[1,1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }}><PerspectiveCamera makeDefault position={[0,0,8]} fov={34}/><Assembly/><OrbitControls enablePan={false} minDistance={5.5} maxDistance={11} maxPolarAngle={Math.PI*.65} minPolarAngle={Math.PI*.28}/></Canvas><span className="assembly-note">Drag to inspect · Scroll to zoom</span></div> }
