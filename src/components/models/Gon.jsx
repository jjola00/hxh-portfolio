"use client"

import React, { useState, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Gon(props) {
  const { nodes, materials } = useGLTF('/models/gon.glb')
  const groupRef = useRef()
  const [isDragging, setIsDragging] = useState(false)
  const [lastPosition, setLastPosition] = useState([0, 0])
  const [rotation, setRotation] = useState([0, 0, 0])

  const handlePointerMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - lastPosition[0]
      const deltaY = event.clientY - lastPosition[1]
      setRotation([rotation[0] + deltaY * 0.01, rotation[1] + deltaX * 0.01, rotation[2]])
      setLastPosition([event.clientX, event.clientY])
    }
  }

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
    }
  })

  return (
    <group {...props} 
      ref={groupRef} 
      dispose={null} 
      position={[0, -1.5, 0]} 
      scale={[2, 2, 2]}
      onPointerDown={(e) => {
        e.stopPropagation()
        setIsDragging(true)
        setLastPosition([e.clientX, e.clientY])
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
      onPointerMove={handlePointerMove}
    >
      <mesh scale={[1, 1, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[2, 2, 3]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.model_55.geometry}
        material={materials.Material}
      />
    </group>
  )
}

useGLTF.preload('/models/gon.glb')
