/**
 * Logo3D.jsx — Chrome 3D-Logo mit:
 *   ◆ Intro: elastischer Scale-Pop beim ersten Laden
 *   ◆ Ruheposition: leicht zur Seitenmitte geneigt (BASE_ROT_Y = -0.30 rad)
 *   ◆ Maus-Folge: globaler Mauszeiger steuert sanft die Rotation (Lerp-Faktor 0.04)
 *   ◆ Kein Auto-Drehen mehr
 *   ◆ "Atmung": minimale Y-Sinusbewegung für Leben
 */

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, SpotLight, Environment } from '@react-three/drei'
import * as THREE from 'three'
import logoUrl from '../assets/logo.glb?url'

/*
 * Chrome PBR mit MeshPhysicalMaterial — besser als Standard für Metall:
 * clearcoat simuliert eine klare Decklackschicht auf dem Chrom-Effekt.
 */
const CHROME = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(0xFFFFFF),
  metalness: 1.0,
  roughness: 0.08,        // leicht geraut → Reflexionen weich/metallisch, kein Raum erkennbar
  reflectivity: 1.0,
  clearcoat: 0.9,         // leichte Klarlackschicht → Tiefeneffekt
  clearcoatRoughness: 0.2,
  envMapIntensity: 2.0,
})

/* Ruherotation — Logo neigt sich leicht zur Seitenmitte */
const BASE_ROT_X = 0.08   // minimaler Downward-Tilt
const BASE_ROT_Y = -0.40   // ca. -17° → Vorderfront schaut leicht nach links (zur Textseite)

/* ══════════════════════════════════════════════════
   LogoModel — Interne 3D-Komponente
   ══════════════════════════════════════════════════ */
function LogoModel() {
  /* Zwei Gruppen-Refs:
     wrapperRef → Intro-Scale + Rotation + Breathing
     modelRef   → nur Geometrie-Zentrierung/Skalierung (wird in useEffect gesetzt) */
  const wrapperRef = useRef()
  const modelRef = useRef()
  const { scene } = useGLTF(logoUrl)

  const startTime = useRef(null)              // gesetzt wenn Modell bereit
  const curRotX = useRef(BASE_ROT_X)        // aktuell interpolierte Rotation
  const curRotY = useRef(BASE_ROT_Y)
  const mouse = useRef({ x: 0, y: 0 })   // normalisierte Mausposition

  /* Globaler Maus-Listener (nur auf Pointer-Geräten, nicht Touch) */
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 4 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 4 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* Modell-Setup: Chrome-Material + Auto-Zentrierung */
  useEffect(() => {
    const m = modelRef.current
    if (!m) return

    /* Chrome auf alle Meshes */
    m.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.material = CHROME
      }
    })

    /* Bounding-Box → einheitliche Größe + Zentrierung */
    const box = new THREE.Box3().setFromObject(m)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    if (maxDim > 0) {
      const s = 0.2 / maxDim
      m.scale.setScalar(s)
      const sc = center.clone().multiplyScalar(s)
      m.position.set(-sc.x, -sc.y, -sc.z)
    }

    /* Intro-Timer starten */
    startTime.current = performance.now()
  }, [scene])

  /* ── Render-Loop ── */
  useFrame((state) => {
    const w = wrapperRef.current
    if (!w) return

    /* Modell noch nicht fertig geladen → unsichtbar halten */
    if (!startTime.current) {
      w.scale.setScalar(0)
      return
    }

    /* ── Intro Scale: elastischer Pop (Elastic Ease-Out) ── */
    const elapsed = (performance.now() - startTime.current) / 1000
    const t = Math.min(elapsed / 1.4, 1)
    const eased = t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((Math.PI * 2) / 3)) + 1
    w.scale.setScalar(Math.max(0, eased))

    /* ── Maus-Rotation: träger Lerp (sanfte Verzögerung) ── */
    const targetX = BASE_ROT_X + mouse.current.y * -0.22
    const targetY = BASE_ROT_Y + mouse.current.x * 0.30

    curRotX.current = THREE.MathUtils.lerp(curRotX.current, targetX, 0.04)
    curRotY.current = THREE.MathUtils.lerp(curRotY.current, targetY, 0.04)

    w.rotation.x = curRotX.current
    w.rotation.y = curRotY.current

    /* ── AtemAnimation: sanfte Y-Sinuswelle ── */
    w.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.06
  })

  return (
    /* wrapperRef startet bei scale=0 — wird in useFrame animiert */
    <group ref={wrapperRef} scale={0}>
      <group ref={modelRef}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

useGLTF.preload(logoUrl)

/* ══════════════════════════════════════════════════
   Logo3D — Canvas + Beleuchtung
   ══════════════════════════════════════════════════ */
export default function Logo3D({ className = '' }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 2.0], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
        shadows
      >
        {/*
         * 'studio' = neutralstes Preset, keine sichtbare Architektur.
         * roughness=0.08 an MeshPhysicalMaterial macht Reflexionen weich genug
         * dass man keinen Raum erkennt, die Metallik aber klar ist.
         */}
        <Environment preset="studio" background={false} />

        {/* Hauptspot: harte Glanzlinie auf Chrome */}
        <SpotLight position={[4, 7, 4]} intensity={50} color="#ffffff" angle={0.22} penumbra={0.5} distance={24} castShadow />

        {/* Rim-Lights */}
        <directionalLight position={[5, 3, 2]} intensity={1.0} color="#dde6ff" />
        <directionalLight position={[0, -4, 5]} intensity={0.5} color="#8888aa" />

        {/* Crimson */}
        <pointLight position={[-3, 4, 3]} intensity={3.5} color="#b91c1c" />
        <pointLight position={[4, -2, 1]} intensity={1.0} color="#7f1d1d" />

        <ambientLight intensity={0.4} />

        <Suspense fallback={null}>
          <LogoModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
