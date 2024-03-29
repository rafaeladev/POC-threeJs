import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const Experience = () => {
  // These refs will give us direct access to the THREE.Mesh object
  const rectOneRef = useRef();
  const rectTwoRef = useRef();
  const rectThreeRef = useRef();

  // Use TextureLoader to load button textures
  const buttonTexture1 = useLoader(TextureLoader, "/texture/8139482.jpg");
  const buttonTexture2 = useLoader(TextureLoader, "/texture/8139482.jpg");
  const buttonTexture3 = useLoader(TextureLoader, "/texture/8139482.jpg");

  // Create a mesh for each rectangle with a MeshBasicMaterial
  // Position them according to your needs to match the image layout

  return (
    <>
      <RoundedBox
        ref={rectOneRef}
        radius={0.2}
        smoothness={4}
        args={[5.5, 8, 0]}
        position={[-6, 0, 0]}
      >
        {/* You can use a mesh basic material and map a texture to it */}
        <meshBasicMaterial attach="material" map={buttonTexture1} />
        <meshStandardMaterial color="skyBlue" />
      </RoundedBox>

      <RoundedBox
        ref={rectTwoRef}
        radius={0.2}
        smoothness={4}
        args={[5, 12]}
        position={[0, 3, 0]}
      >
        {/* <meshBasicMaterial attach="material" map={buttonTexture2} /> */}
        <meshStandardMaterial color="skyBlue" />
      </RoundedBox>

      <RoundedBox
        ref={rectThreeRef}
        radius={0.2}
        smoothness={4}
        args={[5, 12]}
        position={[6, 3, 0]}
      >
        {/*  <meshBasicMaterial attach="material" map={buttonTexture3} /> */}
        <meshStandardMaterial color="skyBlue" />
      </RoundedBox>

      {/* Similarly add interactive buttons using mesh with onClick handlers if needed */}
    </>
  );
};

export default Experience;
