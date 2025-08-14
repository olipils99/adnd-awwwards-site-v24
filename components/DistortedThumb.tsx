"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, Suspense, useMemo, useState } from "react";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

// GLSL
const vert = /* glsl */`
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float w = sin((pos.y + uTime*0.002)*6.2831)*0.02 * uHover;
    pos.z += w;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;
const frag = /* glsl */`
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uHover;
  void main() {
    vec2 uv = vUv;
    vec2 wave = vec2(
      sin(uv.y*10.0 + uTime*0.003),
      cos(uv.x*8.0 + uTime*0.0035)
    ) * 0.01 * uHover;
    vec4 color = texture2D(uTex, uv + wave);
    gl_FragColor = color;
  }
`;

const DistortMat = shaderMaterial(
  { uTime: 0, uHover: 0, uTex: null },
  vert,
  frag
);
extend({ DistortMat });

function Plane({ url }: { url: string }){
  const ref = useRef<any>(null);
  const tex = useLoader(THREE.TextureLoader, url);
  const [hover, setHover] = useState(0);
  useFrame((_, delta)=> {
    if(!ref.current) return;
    ref.current.uTime += delta*1000;
    // ease hover toward target (0 or 1)
    const target = (ref.current.__hoverTarget || 0) as number;
    ref.current.uHover += (target - ref.current.uHover) * 0.1;
  });
  const onEnter = () => { if(ref.current) ref.current.__hoverTarget = 1; };
  const onLeave = () => { if(ref.current) ref.current.__hoverTarget = 0; };
  return (
    <mesh onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <planeGeometry args={[2, 1.5, 64, 64]} />
      {/* @ts-ignore */}
      <distortMat ref={ref} uTex={tex} />
    </mesh>
  );
}

export default function DistortedThumb({ src, alt }: { src: string; alt: string; }){
  return (
    <div className="w-full h-full">
      <Canvas
        orthographic
        camera={{ position: [0,0,5], zoom: 180 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Slight light tint */}
          <ambientLight intensity={0.9} />
          <Plane url={src} />
        </Suspense>
      </Canvas>
      <span className="sr-only">{alt}</span>
    </div>
  );
}
