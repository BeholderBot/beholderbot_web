import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { MathUtils } from 'three';
import { TextureLoader } from "three/src/loaders/TextureLoader";

// const name = (type) => `PavingStones092_1K_${type}.jpg`;

function Eye3d() {
  const eyeRef = useRef();
  const eyelidRef = useRef();
  const [eyelidOpen, setEyelidOpen] = useState(true);
//   const texture = useLoader(TextureLoader,[name("Color")])

  const toggleEyelid = () => {
    setEyelidOpen(!eyelidOpen);
  };

  useFrame(({ clock }) => {
    if (eyeRef.current && eyelidRef.current) {
      // Rotate the eye
      eyeRef.current.rotation.y += 0.01;

      // Calculate the offset for both eye and eyelid along the y-axis
      const time = clock.getElapsedTime(); // Get the elapsed time since the component mounted
      const offsetY = Math.sin(time ) * 0.3; // Adjust the amplitude (0.5) as needed

      // Set the positions for both eye and eyelid
      eyeRef.current.position.y = offsetY;
      eyelidRef.current.position.y = offsetY;

      // Close or open the eyelid based on the state
      const targetEyelidPosition = eyelidOpen ? 0 : -0.5;
      eyelidRef.current.position.x = MathUtils.lerp(
        eyelidRef.current.position.x,
        targetEyelidPosition,
        0.1
      );
    }
  });

  return (
    <>
      {/* Eyelid */}
      <mesh ref={eyelidRef}>
        <boxGeometry args={[0.2, 1.5, 1.5]} />
        <meshPhongMaterial color="black" />
      </mesh>

      {/* Eye */}
      <mesh ref={eyeRef} onClick={toggleEyelid}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial color="white" />
      </mesh>
    </>
  );
}

export default Eye3d;
