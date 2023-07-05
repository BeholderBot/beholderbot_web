import React from 'react';

import { Line } from '@react-three/drei';

const LineDrawing = (props) => {
    return (
        <>
          <Line
            points={props.points}
            color="red"
            lineWidth={5}
          />
          <mesh position={[1, 0, 0]}>
            <sphereBufferGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="white" />
          </mesh>
        </>
      );
  };

export default LineDrawing
