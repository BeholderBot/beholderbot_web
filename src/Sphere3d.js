import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import { Sparkles, Shadow, ContactShadows, Billboard, Environment, BakeShadows, OrbitControls } from '@react-three/drei'
import { LayerMaterial, Depth } from 'lamina'
import crossTexture from './circle1.jpg'
function Sphere3d({color = 'white', amount = 50, emissive, size = 2, ...props}) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  const sparklesRef = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const initialY = useRef(props.position[1]); // Store the initial Y position
 
  
  useFrame(({ clock }) => {
    // Calculate the floating animation
    ref.current.position.y = initialY.current + Math.sin(clock.elapsedTime) * 0.3; // Adjust the amplitude (0.2) to control the floating height
    // ref.current.rotation.y += 0.01; // Rotate the sphere
    // Other animation or logic can be added here
  });
  
  return (
    <mesh
    {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={[size, 64, 64]} >
  
        </sphereGeometry>
    <meshStandardMaterial roughness={0} metalness = {0.1} color={color} emissive={emissive || color} envMapIntensity={0.2}/>
  
  
    {/* <Sparkles ref = {sparklesRef} count={amount} scale={size * 4} size={10} speed={0.8} /> */}
    <Shadow rotation={[-Math.PI / 2, 0, 0]} scale={size} position={[0, -size, 0]} color={emissive} opacity={0.5} />
  </mesh>
  );
}
 
export default Sphere3d;