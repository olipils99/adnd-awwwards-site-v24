"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

function Knot() {
  return (
    <Float speed={1} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh>
        <torusKnotGeometry args={[1.1, 0.28, 200, 32]} />
        <meshStandardMaterial
          color={"#22c55e"}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const translate = useTransform(
    [springX, springY],
    ([sx, sy]) => `translate(${sx}px, ${sy}px)`,
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const k = 0.03;
      x.set((e.clientX - window.innerWidth / 2) * -k);
      y.set((e.clientY - window.innerHeight / 2) * -k);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 3, 3]} intensity={1.0} />
          <Knot />
          <OrbitControls
            enableZoom={false}
            enableRotate={false}
            enablePan={false}
          />
        </Canvas>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:py-36">
        <motion.h1
          style={{ transform: translate as any }}
          className="text-4xl md:text-6xl font-semibold leading-tight max-w-3xl text-gray-900"
        >
          Aménagement paysager <span className="text-brand-700">familial</span>{" "}
          et durable.
        </motion.h1>
        <p className="mt-6 max-w-2xl text-gray-700">
          Conception, réalisation et entretien d’espaces verts où il fait bon se
          réunir.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="/services"
            className="px-5 py-3 rounded-full bg-brand-600 text-white font-medium"
          >
            Découvrir nos services
          </a>
          <a
            href="#contact"
            className="px-5 py-3 rounded-full border border-black/10 hover:bg-black/5"
          >
            Obtenir une soumission
          </a>
        </div>
      </div>
    </section>
  );
}
