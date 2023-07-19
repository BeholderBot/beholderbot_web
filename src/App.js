import "./App.css";
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import Sphere3d from "./Sphere3d";
import { Sparkles, Shadow, ContactShadows, Billboard, Environment, BakeShadows, OrbitControls } from '@react-three/drei'
import { LayerMaterial, Depth } from 'lamina'
import * as THREE from 'three'
import Eye3d from "./Eye3D";
import SphereEye from "./SphereEye"
import LineDrawing from "./Line"
import Model from './Model';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());


const Scene = () => {
  const materials = useLoader(MTLLoader, "Poimandres.mtl");
  const obj = useLoader(OBJLoader, "mouth.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  console.log(obj);
  return <primitive object={obj} scale={0.4} />;
};
 
function App() {
  const pointLightRef = useRef();
  const modelUrl = '/Users/muskan/USC/Semio/beholderbot_web/src/mouth.stl';
 
  return (
    <>
   <div style = {{height:"100vh", background: "#474746" } }> 

        <Canvas shadows camera={{ position: [0, 0, 20], fov: 40 }}>
        <Environment preset="night" background />
        <hemisphereLight intensity={0.5} color="red" groundColor="black" />
        {/* <Sphere3d color="red"size={2} emissive="black" position={[2, 0, 0]} /> */}
        
        <SphereEye color="black"size={1} emissive="black" position={[1, 3, 7]} />
        <SphereEye color="black"size={1} emissive="black" position={[2, 5, 0]} />
        <SphereEye color="black"size={1} emissive="black" position={[0, 4, -7]} />
        <LineDrawing points =  {[[1,0.5,5], [1, 0, 0]]}></LineDrawing>
        <LineDrawing points =  {[[1,3,7], [1, 0.5, 5]]}></LineDrawing>

        <LineDrawing points =  {[[4,2,0], [1, 0, 0]]}></LineDrawing>
        <LineDrawing points =  {[[2,5,0], [4, 2, 0]]}></LineDrawing>

        <LineDrawing points =  {[[1,0,-5], [1, 0, 0]]}></LineDrawing>
        <LineDrawing points =  {[[0,4,-7], [1,0,-5]]}></LineDrawing>
        
        {/* <Sphere3d color="black" amount={50} size={1} emissive="black" position={[1, 1, -2]} /> */}
        <Eye3d position={[10,10,-4]} />
        <ambientLight intensity={0.5} /> {/* Add ambient light */}
        <pointLight position={[10, 10, 10]} /> {/* Add a point light */}
        
        {/* <ContactShadows renderOrder={2} color="black" resolution={1024} frames={1} scale={10} blur={1.5} opacity={0.65} far={0.5} /> */}
        <BakeShadows />
        <Model />
        <Scene/>
        <OrbitControls autoRotateSpeed={0.85} zoomSpeed={0.75}minAzimuthAngle={-Math.PI}  maxAzimuthAngle={Math.PI} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.55} />
        </Canvas>

        </div>
        
        </>
  );
}
 
export default App;