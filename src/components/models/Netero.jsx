"use client"

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Netero(props) {
    const { nodes, materials } = useGLTF('/models/netero.glb')
  
    const modelRef = useRef();
  
    useFrame((state) => {
      modelRef.current.position.y =
        -2 + Math.sin(state.clock.elapsedTime) * 0.12;
    });
    
    return (
      <group
        {...props}
        dispose={null}
        position={[0, 0, 0]}
        scale={[0.2, 0.2, 0.2]}
        rotation={[0, 0, 0]}
        ref={modelRef}
      >
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.model_0.geometry}
        material={materials.clothes}
        />
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.model_0_1.geometry}
        material={materials.body}
        />
    </group>
  )
}

useGLTF.preload('/models/netero.glb')
