"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
  
  export default function Computer(props) {
    const { nodes, materials } = useGLTF('/models/retro_computer.glb')
    const groupRef = useRef()
    const [isDragging, setIsDragging] = useState(false)
    const [lastPosition, setLastPosition] = useState([0, 0])
    const [rotation, setRotation] = useState([0.4, -0.9, 0])
  
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
      <group 
      {...props} 
      dispose={null}
      position={[0, 1.8, 0]}
      scale={[0.03, 0.03, 0.03]}
      ref={groupRef}
      onPointerDown={(e) => {
        e.stopPropagation()
        setIsDragging(true)
        setLastPosition([e.clientX, e.clientY])
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
      onPointerMove={handlePointerMove}
    >
      <mesh scale={[50, 50, 50]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.55, 1.55, 1.55]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.retro_computer_setup_retro_computer_setup_Mat_0.geometry}
          material={materials.retro_computer_setup_Mat}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    )
  }
  
  useGLTF.preload('/models/retro_computer.glb')
