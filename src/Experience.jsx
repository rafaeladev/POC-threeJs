// Import pour l'animation
import { useRef } from "react";

// Helpers de Drei pour la scene
import {
  shaderMaterial,
  Sparkles,
  Center,
  useTexture,
  useGLTF,
  OrbitControls,
  Environment,
  Text,
  Box,
  Float,
} from "@react-three/drei";

import { useControls } from "leva";

// Import pour avoir les couleurs de THREE.js
import * as THREE from "three";
import { useState } from "react";

// import des fonctionnalités React pour Three (donc issues de react three fiber)
import { extend, useFrame } from "@react-three/fiber";

import Planes from "/Planes.jsx";

export default function Experience() {
  const [isMoving, setIsMoving] = useState(false);
  const [targetHeight, setTargetHeight] = useState(1);
  const model = useGLTF("./model/POC_Maquette.glb");
  // console.log(model);

  const eau_int = useRef();
  const buttonCube = useRef();
  const meshRef = useRef();
  const camera = useRef();

  const targetFile = import("/panda.jpg").then((module) => module.default);

  // Debug
  const { rotation } = useControls({
    rotation: {
      value: { x: 0, y: 10, z: 0 },
      step: 1,
    },
  });

  // Models
  const iphoneModel = useGLTF("/model/iphone.gltf");
  const nintendoModel = useGLTF("/model/nintendo.gltf");
  const pcModel = useGLTF("/model/pc.gltf");

  console.log(iphoneModel);

  const restart = () => {
    console.log("restart");
    setIsMoving(true);
    setTargetHeight(targetHeight === 1 ? 0 : 1);
  };

  useFrame((state) => {
    console.log(state.camera.position);
    if (isMoving) {
      const currentY = eau_int.current.position.y;
      const deltaY = (targetHeight - currentY) * 0.1; // Vitesse de déplacement

      if (Math.abs(deltaY) < 0.001) {
        setIsMoving(false);
      } else {
        eau_int.current.position.y += deltaY;
      }
    }
  });

  const handlePress = () => {
    buttonCube.current.position.y -= 0.1; // Déplace le bouton vers le bas lorsque pressé
  };

  const handleRelease = () => {
    buttonCube.current.position.y += 0.1; // Remet le bouton à sa position initiale lorsque relâché
    restart(); // Démarre l'animation lorsque le bouton est relâché
  };

  return (
    <>
      <Environment path="/envMap/" files="potsdamer_platz_256.hdr" />
      <color args={["#241B27"]} attach="background" />
      <OrbitControls makeDefault />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={0.2}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={0.1} />

      <Center>
        <Planes />

        {/* iphone model */}
        <Float rotationIntensity={1}>
          <primitive
            object={iphoneModel.scene}
            scale={2}
            position-x={-14}
            position-y={0.1}
            rotation-y={-1}
            rotation-x={0}
            receiveShadow
          ></primitive>
        </Float>

        {/*  Cube */}
        <mesh
          ref={buttonCube}
          position-x={-10}
          position-y={-1.5}
          position-z={1}
          rotation-y={rotation.y}
          rotation-x={rotation.x}
          scale={1}
          onClick={restart}
          onPointerDown={handlePress} // Appelé lorsque le bouton est pressé
          onPointerUp={handleRelease} // Appelé lorsque le bouton est relâché
          onPointerEnter={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            document.body.style.cursor = "default";
          }}
        >
          <boxGeometry args={[0.5, 2, 3]} />
          <meshStandardMaterial color="purple" />
        </mesh>
      </Center>
    </>
  );
}
