"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Blimp(props) {
  const { nodes, materials } = useGLTF('/models/blimp-transformed.glb')
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
      position={[0, -0.5, 0]}
      scale={[0.002, 0.002, 0.002]}
      onPointerDown={(e) => {
        e.stopPropagation()
        setIsDragging(true)
        setLastPosition([e.clientX, e.clientY])
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
      onPointerMove={handlePointerMove}
    >
      <mesh scale={[1000, 1000, 1000]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.55, 1.55, 1.55]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Helices} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.Cartel} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.Material} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.Ala_Misil} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      <mesh geometry={nodes.defaultMaterial_4.geometry} material={materials.Blimp_3} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      <mesh geometry={nodes.defaultMaterial_5.geometry} material={materials.nave} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      <mesh geometry={nodes.defaultMaterial_6.geometry} material={materials.Window} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      <mesh geometry={nodes.defaultMaterial_7.geometry} material={materials.Navebottom} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      <mesh geometry={nodes.defaultMaterial_8.geometry} material={materials.Blimp_2} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      <mesh geometry={nodes.defaultMaterial_9.geometry} material={materials.Blimp_1} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
    </group>
  )
}

useGLTF.preload('/models/blimp-transformed.glb')
