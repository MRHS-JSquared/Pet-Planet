"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getGameTime } from "@/lib/pet-logic"
import type { Pet } from "@/lib/types"

//Playground Structure
interface PetPlaygroundProps {
  pet: Pet
  onAction: (action: string, cost: number) => void
}

function getSkyColor(hour: number, minute: number): THREE.Color {
  const dayColor = new THREE.Color(0x87ceeb)
  const sunriseColor = new THREE.Color(0xffa07a)
  const sunsetColor = new THREE.Color(0xff6b6b)
  const nightColor = new THREE.Color(0x1a1a2e)

  if (hour >= 8 && hour < 18) {
    return dayColor
  } else if (hour >= 6 && hour < 8) {
    const t = ((hour - 6) * 60 + minute) / 120
    return new THREE.Color().lerpColors(nightColor, dayColor, t)
  } else if (hour >= 18 && hour < 20) {
    const t = ((hour - 18) * 60 + minute) / 120
    return new THREE.Color().lerpColors(dayColor, nightColor, t)
  } else {
    return nightColor
  }
}

export function PetPlayground({ pet, onAction }: PetPlaygroundProps) {
  //Setup THREE.JS
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    petMesh: THREE.Group | THREE.Object3D
    toys: (THREE.Mesh | THREE.Object3D)[]
    animationId: number | null
  } | null>(null)
  const [selectedToy, setSelectedToy] = useState<string | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const width = mountRef.current.clientWidth
    const height = 500

    const scene = new THREE.Scene()

    const gameTime = getGameTime(pet.createdAt)
    scene.background = getSkyColor(gameTime.hour, gameTime.minute)

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 3, 8)
    camera.lookAt(0, 1, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    mountRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const floorGeometry = new THREE.PlaneGeometry(20, 20)
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xd2b48c, roughness: 0.8 })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    const wallGeometry = new THREE.PlaneGeometry(20, 15)
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, roughness: 0.7 })
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial)
    backWall.position.z = -10
    backWall.position.y = 7.5
    backWall.receiveShadow = true
    scene.add(backWall)

    // ---------------------------------------------------------
    //  PET MODEL LOADING (GLTF folder loader with fallback)
    // ---------------------------------------------------------
    const loader = new GLTFLoader()
    const petGroup = new THREE.Group()
    petGroup.position.set(0, 0.5, 0)
    scene.add(petGroup)

    // Editable per-pet model transform config (tweak later)
    const PET_MODEL_CONFIG: Record<
      string,
      { path: string; scale: number; position: [number, number, number] }
    > = {
      dog: { path: "/models/dog/scene.gltf", scale: 1, position: [0, 0, 0] },
      cat: { path: "/models/cat/scene.gltf", scale: 1, position: [0, 0, 0] },
      rabbit: { path: "/models/rabbit/scene.gltf", scale: 1, position: [0, 0, 0] },
      hamster: { path: "/models/hamster/scene.gltf", scale: 1, position: [0, 0, 0] },
    }

    // --- Create original primitive fallback (exactly as before) ---
    let petColor = 0x8b4513
    let bodySize = { width: 0.8, height: 0.6, depth: 1.2 }

    switch (pet.type) {
      case "dog":
        petColor = 0x8b4513
        bodySize = { width: 0.8, height: 0.6, depth: 1.2 }
        break
      case "cat":
        petColor = 0xff8c00
        bodySize = { width: 0.6, height: 0.5, depth: 1.0 }
        break
      case "rabbit":
        petColor = 0xffffff
        bodySize = { width: 0.5, height: 0.6, depth: 0.8 }
        break
      case "hamster":
        petColor = 0xd2691e
        bodySize = { width: 0.4, height: 0.4, depth: 0.5 }
        break
    }

    // Build fallback primitive exactly like original
    const bodyGeometry = new THREE.BoxGeometry(bodySize.width, bodySize.height, bodySize.depth)
    const petMaterial = new THREE.MeshStandardMaterial({ color: petColor })
    const body = new THREE.Mesh(bodyGeometry, petMaterial)
    body.castShadow = true
    petGroup.add(body)

    const headSize = bodySize.width * 0.7
    const headGeometry = new THREE.SphereGeometry(headSize, 16, 16)
    const head = new THREE.Mesh(headGeometry, petMaterial)
    head.position.set(0, bodySize.height * 0.3, bodySize.depth * 0.7)
    head.castShadow = true
    petGroup.add(head)

    if (pet.type === "rabbit") {
      const earGeometry = new THREE.ConeGeometry(0.15, 0.6, 8)
      const leftEar = new THREE.Mesh(earGeometry, petMaterial)
      leftEar.position.set(-0.2, bodySize.height * 0.3 + 0.5, bodySize.depth * 0.7)
      leftEar.castShadow = true
      petGroup.add(leftEar)

      const rightEar = new THREE.Mesh(earGeometry, petMaterial)
      rightEar.position.set(0.2, bodySize.height * 0.3 + 0.5, bodySize.depth * 0.7)
      rightEar.castShadow = true
      petGroup.add(rightEar)
    }

    const eyeGeometry = new THREE.SphereGeometry(0.08, 8, 8)
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-0.15, bodySize.height * 0.3 + 0.1, bodySize.depth * 0.7 + headSize * 0.8)
    petGroup.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(0.15, bodySize.height * 0.3 + 0.1, bodySize.depth * 0.7 + headSize * 0.8)
    petGroup.add(rightEye)

    if (pet.type === "dog" || pet.type === "cat") {
      const tailGeometry = new THREE.CylinderGeometry(0.1, 0.05, 0.8, 8)
      const tail = new THREE.Mesh(tailGeometry, petMaterial)
      tail.position.set(0, bodySize.height * 0.2, -bodySize.depth * 0.7)
      tail.rotation.x = Math.PI / 4
      tail.castShadow = true
      petGroup.add(tail)
    }

    // Save a reference to the fallback in case GLTF replaces it later
    // We'll keep petGroup as root (we replace children if model loads)
    // ---------------------------------------------------------

    // Attempt to load GLTF model from folder (path from config)
    const cfg = PET_MODEL_CONFIG[pet.type] || { path: `/models/${pet.type}/scene.gltf`, scale: 1, position: [0, 0, 0] }

    loader.load(
      cfg.path,
      (gltf) => {
        try {
          const model = gltf.scene.clone(true)

          // Clear fallback children (leave petGroup root)
          while (petGroup.children.length) {
            const child = petGroup.children[0]
            petGroup.remove(child)
            // dispose geometries/materials of fallback to be safe
            if ((child as THREE.Mesh).geometry) {
              try {
                ;((child as THREE.Mesh).geometry as THREE.BufferGeometry).dispose()
              } catch {}
            }
            if ((child as THREE.Mesh).material) {
              const m = (child as THREE.Mesh).material
              if (Array.isArray(m)) {
                m.forEach((mat) => mat.dispose && mat.dispose())
              } else {
                ;(m as THREE.Material).dispose && (m as THREE.Material).dispose()
              }
            }
          }

          // Apply config transform
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true
              child.receiveShadow = true
              // ensure standard material can receive lights
              if (child.material && (child.material as any).isMeshStandardMaterial === false) {
                // leave as-is — usually gltf materials are fine
              }
            }
          })

          model.scale.set(cfg.scale, cfg.scale, cfg.scale)
          model.position.set(cfg.position[0], cfg.position[1], cfg.position[2])

          petGroup.add(model)

          if (sceneRef.current) {
            sceneRef.current.petMesh = petGroup
          }
        } catch (err) {
          console.error("Error processing loaded GLTF for", pet.type, err)
        }
      },
      undefined,
      (err) => {
        // If the model fails to load, keep the original primitive fallback in place
        console.warn(`Failed to load GLTF for ${pet.type} at ${cfg.path}. Using fallback.`, err)
      }
    )

    // ---------------------------------------------------------

    // Setup Toy Geometry (unchanged)
    const toys: (THREE.Mesh | THREE.Object3D)[] = []

    const ballGeometry = new THREE.SphereGeometry(0.3, 16, 16)
    const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    const ball = new THREE.Mesh(ballGeometry, ballMaterial)
    ball.position.set(-3, 0.3, 2)
    ball.castShadow = true
    ball.userData = { type: "ball" }
    scene.add(ball)
    toys.push(ball)

    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(3, 0.25, 2)
    cube.castShadow = true
    cube.userData = { type: "block" }
    scene.add(cube)
    toys.push(cube)

    const yarnGroup = new THREE.Group()
    yarnGroup.position.set(0, 0.4, 4)
    const yarnColor = 0xff69b4
    const yarnSphereMaterial = new THREE.MeshStandardMaterial({ color: yarnColor })
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), yarnSphereMaterial)
      sphere.position.set(Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3)
      sphere.castShadow = true
      yarnGroup.add(sphere)
    }
    const centerMesh = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), yarnSphereMaterial)
    centerMesh.castShadow = true
    yarnGroup.add(centerMesh)
    yarnGroup.userData = { type: "yarn" }
    scene.add(yarnGroup)
    toys.push(yarnGroup)

    const bone = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.8, 4, 8), new THREE.MeshStandardMaterial({ color: 0xf5f5dc }))
    bone.position.set(-2, 0.15, -2)
    bone.rotation.z = Math.PI / 2
    bone.castShadow = true
    bone.userData = { type: "bone" }
    scene.add(bone)
    toys.push(bone)

    sceneRef.current = {
      scene,
      camera,
      renderer,
      petMesh: petGroup,
      toys,
      animationId: null,
    }

    let time = 0
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      if (sceneRef.current) sceneRef.current.animationId = animationId

      time += 0.01

      // FLOATING ANIMATION (still works)
      if (petGroup) {
        petGroup.position.y = 0.5 + Math.sin(time * 2) * 0.05
        petGroup.rotation.y = Math.sin(time * 0.5) * 0.3
      }

      toys.forEach((toy, index) => {
        toy.rotation.y += 0.01 * (index + 1)
        toy.position.y = toy.userData.originalY || toy.position.y
        toy.position.y += Math.sin(time * 2 + index) * 0.02
        if (!toy.userData.originalY) toy.userData.originalY = toy.position.y
      })

      const currentTime = getGameTime(pet.createdAt)
      scene.background = getSkyColor(currentTime.hour, currentTime.minute)

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!mountRef.current) return
      const newWidth = mountRef.current.clientWidth
      camera.aspect = newWidth / height
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (sceneRef.current?.animationId) cancelAnimationFrame(sceneRef.current.animationId)
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [pet.type, pet.createdAt])

  const handleToyInteraction = (toyType: string) => {
    setSelectedToy(toyType)
    onAction("play", 0)

    if (sceneRef.current) {
      const toy = sceneRef.current.toys.find((t) => t.userData.type === (toyType === "yarn" ? "yarn" : toyType))
      if (toy) {
        const targetPosition = new THREE.Vector3(0, 0.5, 2)
        const duration = 1000
        const startPosition = toy.position.clone()
        const startTime = Date.now()

        const moveToy = () => {
          const progress = Math.min((Date.now() - startTime) / duration, 1)
          toy.position.lerpVectors(startPosition, targetPosition, progress)
          if (progress < 1) {
            requestAnimationFrame(moveToy)
          } else {
            setTimeout(() => {
              toy.position.copy(startPosition)
              setSelectedToy(null)
            }, 1000)
          }
        }

        moveToy()
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🎮</span>
          Virtual Playground
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={mountRef} className="w-full overflow-hidden rounded-lg border" style={{ height: "500px" }} />

        <div className="flex gap-2 justify-center flex-wrap">
          <Button
            onClick={() => handleToyInteraction("ball")}
            disabled={selectedToy !== null}
            variant={selectedToy === "ball" ? "default" : "outline"}
            size="sm"
          >
            🔴 Ball
          </Button>
          <Button
            onClick={() => handleToyInteraction("block")}
            disabled={selectedToy !== null}
            variant={selectedToy === "block" ? "default" : "outline"}
            size="sm"
          >
            🟩 Block
          </Button>
          <Button
            onClick={() => handleToyInteraction("yarn")}
            disabled={selectedToy !== null}
            variant={selectedToy === "yarn" ? "default" : "outline"}
            size="sm"
          >
            🧶 Yarn Ball
          </Button>
          <Button
            onClick={() => handleToyInteraction("bone")}
            disabled={selectedToy !== null}
            variant={selectedToy === "bone" ? "default" : "outline"}
            size="sm"
          >
            🦴 Bone
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Click toys to play with {pet.name}!
        </p>
      </CardContent>
    </Card>
  )
}
