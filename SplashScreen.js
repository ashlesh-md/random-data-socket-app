import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { View } from 'react-native';

function RoundedBox({ position, color }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      position={position}
      ref={mesh}
      scale={1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
    </mesh>
  );
}

const SplashScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Canvas backgroundColor="white">
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

        <RoundedBox position={[0, 0, 0]} color={'#3498db'} />
      </Canvas>
    </View>
  );
};

export default SplashScreen;
