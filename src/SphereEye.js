import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three'
import { Sparkles, Shadow, ContactShadows, Billboard, Environment, BakeShadows, OrbitControls } from '@react-three/drei'
import { LayerMaterial, Depth } from 'lamina'
import crossTexture from './circle1.jpg'
function SphereEye({color = 'white', amount = 50, emissive, size = 2, ...props}) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  const sparklesRef = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const initialY = useRef(props.position[1]); // Store the initial Y position
  const { camera } = useThree();

 useEffect(() => {
    // Add event listener for click events on the window
    window.addEventListener('click', handleWindowClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const handleWindowClick = (event) => {
    click(true);

    const intersectPlane = new THREE.Plane(new THREE.Vector3(-1, 1, -1), 0);
    const intersection = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({ x: (event.clientX / window.innerWidth) * 2 - 1, y: -(event.clientY / window.innerHeight) * 2 + 1 }, camera);
    raycaster.ray.intersectPlane(intersectPlane, intersection);
    ref.current.lookAt(intersection);
  };
  
  useFrame(({ clock, mouse, camera }) => {
    // Calculate the floating animation
    // ref.current.position.y = initialY.current + Math.sin(clock.elapsedTime) * 0.3; // Adjust the amplitude (0.2) to control the floating height
    // ref.current.rotation.y += 0.01; // Rotate the sphere
    // if (clicked) {
    //   const intersectPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
    //   const intersection = new THREE.Vector3();
    //   const raycaster = new THREE.Raycaster();
    //   raycaster.setFromCamera(mouse, camera);
    //   raycaster.ray.intersectPlane(intersectPlane, intersection);
    //   ref.current.lookAt(intersection);
    // }
    
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
  
       
        <meshBasicMaterial map={new THREE.TextureLoader().load(crossTexture)} transparent={true} />
     
    {/* <Sparkles ref = {sparklesRef} count={amount} scale={size * 4} size={10} speed={0.8} /> */}
    <Shadow rotation={[-Math.PI / 2, 0, 0]} scale={size} position={[0, -size, 0]} color={emissive} opacity={0.5} />
  </mesh>
  );
}
 
export default SphereEye;