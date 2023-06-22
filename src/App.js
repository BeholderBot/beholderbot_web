import "./App.css";
import { Canvas } from "@react-three/fiber";
import Sphere3d from "./component/Sphere3d";
import { Sparkles, Shadow, ContactShadows, Billboard, Environment, BakeShadows, OrbitControls } from '@react-three/drei'
import { LayerMaterial, Depth } from 'lamina'
import * as THREE from 'three'
 
function App() {
  return (
    <>
        <div style = {{height:"100vh", background: "#474746" } }> 

        <Canvas shadows camera={{ position: [0, 0, 17], fov: 30 }}>
        <Environment preset="night" background />
        <hemisphereLight intensity={0.5} color="white" groundColor="black" />
        <Sphere3d color="white" amount={50} emissive="black" position={[0, 0, -1]} />
        <ContactShadows renderOrder={2} color="black" resolution={1024} frames={1} scale={10} blur={1.5} opacity={0.65} far={0.5} />
        <BakeShadows />
        <OrbitControls autoRotateSpeed={0.85} zoomSpeed={0.75} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.55} />
        </Canvas>
        </div>
        </>
  );
}
 
export default App;