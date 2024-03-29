import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";

import * as THREE from "three";
window.THREE = THREE;

import Experience from "./Experience.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas
      flat // stop the use of the tone mapping => colors became ok as the one we have in blender
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0.83, 0.77, 27],
      }}
    >
      <Experience />
    </Canvas>
  </>
);
