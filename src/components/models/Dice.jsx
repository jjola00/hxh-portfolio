"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Dice(props) {
  const { nodes, materials } = useGLTF('/models/dice-transformed.glb')
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
      position={[0, 0.5, 0]} 
      scale={[50, 50, 50]}
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
        <boxGeometry args={[10, 10, 10]} />
        <meshBasicMaterial transparent opacity={100} />
      </mesh>
      <mesh geometry={nodes.Object_2.geometry} material={materials.material} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_3.geometry} material={materials.material_1} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_4.geometry} material={materials.material_2} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_5.geometry} material={materials.material_3} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/models/dice-transformed.glb')