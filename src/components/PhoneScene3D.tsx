'use client'

// Rendu WebGL (Three.js / R3F) -- 'use client' obligatoire : canvas, matchMedia,
// chargement de texture ne peuvent pas tourner cote serveur.

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

type Props = {
  screenSrc: string
  fallbackSrc: string
  alt: string
}

// Angle fixe choisi une fois -- meme esprit que le mockup CSS precedent : un
// seul point de vue soigne, pas de rotation au pointeur.
const CAMERA_POSITION: [number, number, number] = [1.25, 0.51, 2.67]
const CAMERA_TARGET: [number, number, number] = [0, 0.04, 0]
const TARGET_HEIGHT = 1.05

const textureCache = new Map<string, THREE.Texture>()

function loadTexture(src: string): Promise<THREE.Texture> {
  const cached = textureCache.get(src)
  if (cached) return Promise.resolve(cached)
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      src,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        textureCache.set(src, tex)
        resolve(tex)
      },
      undefined,
      reject,
    )
  })
}

function useScreenTexture(src: string, fallbackSrc: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(() => textureCache.get(src) ?? null)

  useEffect(() => {
    let cancelled = false
    loadTexture(src)
      .catch(() => loadTexture(fallbackSrc))
      .then((tex) => {
        if (!cancelled) setTexture(tex)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [src, fallbackSrc])

  return texture
}

let cachedModel: THREE.Group | null = null
let modelPromise: Promise<THREE.Group> | null = null

// "Smartphone" par smallbigsquare (poly.pizza, licence CC0) -- silhouette
// bord a bord, sans bouton physique, plus proche d'un smartphone actuel.
function loadPhoneModel(): Promise<THREE.Group> {
  if (cachedModel) return Promise.resolve(cachedModel)
  if (!modelPromise) {
    modelPromise = new Promise((resolve, reject) => {
      new GLTFLoader().load(
        '/models/smartphone.glb',
        (gltf) => {
          cachedModel = gltf.scene
          resolve(gltf.scene)
        },
        undefined,
        reject,
      )
    })
  }
  return modelPromise
}

type ScreenRect = { width: number; height: number; centerX: number; centerY: number; z: number }

function buildPhoneGroup(source: THREE.Object3D): { group: THREE.Group; screenRect: ScreenRect } {
  const group = new THREE.Group()
  const model = source.clone(true)

  // Ce modele est authore a plat (longueur sur Z, epaisseur sur Y) -- on le
  // redresse pour que la longueur devienne la hauteur (Y) et l'epaisseur
  // fasse face a la camera (Z).
  model.rotation.set(-Math.PI / 2, 0, 0)
  model.updateMatrixWorld(true)

  const box = new THREE.Box3().setFromObject(model)
  const size = new THREE.Vector3()
  box.getSize(size)
  const center = new THREE.Vector3()
  box.getCenter(center)

  const scale = TARGET_HEIGHT / (size.y || 1)
  model.scale.setScalar(scale)
  model.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
  model.updateMatrixWorld(true)

  group.add(model)

  const screenBox = new THREE.Box3().setFromObject(model)
  const screenSize = new THREE.Vector3()
  screenBox.getSize(screenSize)
  const screenCenter = new THREE.Vector3()
  screenBox.getCenter(screenCenter)

  // Marge pour rester a l'interieur du biseau visible autour de l'ecran --
  // ce modele n'a pas de sous-maillage ecran dedie (mesh unique, materiau
  // partage), la marge s'applique donc a la face entiere.
  const inset = 0.96

  return {
    group,
    screenRect: {
      width: screenSize.x * inset,
      height: screenSize.y * inset,
      centerX: screenCenter.x,
      centerY: screenCenter.y,
      z: screenBox.max.z + 0.004,
    },
  }
}

function CameraRig() {
  const { camera } = useThree()
  useLayoutEffect(() => {
    camera.position.set(...CAMERA_POSITION)
    camera.lookAt(...CAMERA_TARGET)
    camera.updateProjectionMatrix()
  }, [camera])
  return null
}

function PhoneModel({ texture }: { texture: THREE.Texture | null }) {
  const [built, setBuilt] = useState<{ group: THREE.Group; screenRect: ScreenRect } | null>(null)

  useEffect(() => {
    let cancelled = false
    loadPhoneModel()
      .then((source) => {
        if (cancelled) return
        setBuilt(buildPhoneGroup(source))
      })
      .catch((err) => {
        console.error('[PhoneScene3D] échec du chargement du modèle', err)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (!built) return null

  return (
    <group>
      <primitive object={built.group} />
      {texture && (
        <mesh position={[built.screenRect.centerX, built.screenRect.centerY, built.screenRect.z]}>
          <planeGeometry args={[built.screenRect.width, built.screenRect.height]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}
    </group>
  )
}

function FloatingRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useFrame((state) => {
    if (!ref.current || reducedMotionRef.current) return
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.045
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.015
  })

  return <group ref={ref}>{children}</group>
}

export function PhoneScene3D({ screenSrc, fallbackSrc, alt }: Props) {
  const texture = useScreenTexture(screenSrc, fallbackSrc)

  return (
    <div role="img" aria-label={alt} style={{ width: '100%', height: '100%' }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 26 }}
        style={{ width: '100%', height: '100%' }}
        aria-hidden="true"
      >
        <CameraRig />
        <ambientLight intensity={0.6} />
        <directionalLight position={[2.4, 3, 2.2]} intensity={1.2} />
        <directionalLight position={[-2.2, 1.2, -1.6]} intensity={0.4} color="#8B6F47" />
        <directionalLight position={[0, -1.5, 1]} intensity={0.18} color="#ffffff" />
        <FloatingRig>
          <PhoneModel texture={texture} />
        </FloatingRig>
        <ContactShadows position={[0, -0.56, 0]} opacity={0.4} scale={1.8} blur={2.2} far={1.1} />
      </Canvas>
    </div>
  )
}
