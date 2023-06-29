import "./App.css";
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import Sphere3d from "./Sphere3d";
import { Sparkles, Shadow, ContactShadows, Billboard, Environment, BakeShadows, OrbitControls } from '@react-three/drei'
import { LayerMaterial, Depth } from 'lamina'
import * as THREE from 'three'
import Eye3d from "./Eye3D";
import SphereEye from "./SphereEye"

 
function App() {
  const pointLightRef = useRef()
 
  return (
    <>
        <div style = {{height:"100vh", background: "#474746" } }> 

        <Canvas shadows camera={{ position: [0, 0, 20], fov: 30 }}>
        <Environment preset="night" background />
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Sphere3d color="white"size={2} emissive="black" position={[2, -1, 0]} />
        <SphereEye color="black"size={1} emissive="black" position={[2, 3, 5]} />
        
        {/* <Sphere3d color="black" amount={50} size={1} emissive="black" position={[1, 1, -2]} /> */}
        <Eye3d position={[10,10,-4]} />
        <pointLight ref={pointLightRef} position={[-4, 1, 0]} intensity={1} color="white" />
        
        {/* <ContactShadows renderOrder={2} color="black" resolution={1024} frames={1} scale={10} blur={1.5} opacity={0.65} far={0.5} /> */}
        <BakeShadows />
        <OrbitControls autoRotateSpeed={0.85} zoomSpeed={0.75}minAzimuthAngle={-Math.PI}  maxAzimuthAngle={Math.PI} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.55} />
        </Canvas>
        </div>
        </>
  );
}
 
export default App;