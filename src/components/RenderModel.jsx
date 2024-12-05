"use client";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import React, { Suspense } from "react";

const RenderModel = ({ children, className }) => {
  return (
    <div className="w-full h-full">
      <Canvas
        className={clsx("w-screen h-screen relative", className)}
        shadows={true}
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 5],
          fov: 75
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>{children}</Suspense>
        <Environment preset="forest"></Environment>
      </Canvas>
    </div>
  );
};

export default RenderModel;