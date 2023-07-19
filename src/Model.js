import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Model (){
  const gltf = useLoader(GLTFLoader, "./full-body1.glb");
  return (
    <>
      <primitive object={gltf.scene} scale={0.03} />
    </>
  );
};

export default Model;
