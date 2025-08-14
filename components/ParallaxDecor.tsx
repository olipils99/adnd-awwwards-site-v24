"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type Item = { src: string; top: string; left: string; size: number; speed: number; rotate?: number };

const ITEMS: Item[] = [
  { src: "/flowers/leaf-1.svg", top: "5%", left: "8%", size: 120, speed: -20, rotate: -10 },
  { src: "/flowers/flower-1.svg", top: "12%", left: "72%", size: 150, speed: -30, rotate: 5 },
  { src: "/flowers/leaf-2.svg", top: "58%", left: "16%", size: 140, speed: -10, rotate: 6 },
  { src: "/flowers/flower-2.svg", top: "60%", left: "66%", size: 150, speed: -18, rotate: -4 },
  { src: "/flowers/leaf-3.svg", top: "30%", left: "40%", size: 110, speed: -24, rotate: 0 },
];

export default function ParallaxDecor(){
  const { scrollY } = useScroll();
  return (
    <div className="absolute inset-0 pointer-events-none">
      {ITEMS.map((it, i) => {
        const y = useTransform(scrollY, [0, 800], [0, it.speed]);
        return (
          <motion.div
            key={i}
            className="absolute drop-shadow-md"
            style={{ top: it.top as any, left: it.left as any, y, rotate: it.rotate }}
            aria-hidden
          >
            <Image src={it.src} alt="" width={it.size} height={it.size} className="select-none pointer-events-none"/>
          </motion.div>
        );
      })}
    </div>
  );
}
