"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type TextParallaxContentProps = {
  image: string;
  alt: string;
  eyebrow: string;
  heading: string;
  accent: string;
  children?: React.ReactNode;
  className?: string;
};

export function TextParallaxContent({
  image,
  alt,
  eyebrow,
  heading,
  accent,
  children,
  className,
}: TextParallaxContentProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.12, 0.88], [1, 0.91]);
  const copyY = useTransform(scrollYProgress, [0.18, 0.82], [96, -96]);
  const copyOpacity = useTransform(
    scrollYProgress,
    [0.16, 0.32, 0.68, 0.84],
    [0, 1, 1, 0]
  );

  return (
    <section className={cn("relative bg-papel py-4", className)}>
      <div
        ref={targetRef}
        data-header-theme="dark"
        className="relative h-[135svh] px-3 sm:px-6"
      >
        <motion.div
          style={{ scale: reduceMotion ? 1 : scale }}
          className="sticky top-3 h-[calc(100svh-24px)] origin-center overflow-hidden rounded-lg bg-noche-950 shadow-[0_40px_100px_-46px_rgba(7,11,20,0.72)] will-change-transform"
        >
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.38)_0%,rgba(7,11,20,0.68)_58%,rgba(7,11,20,0.82)_100%)]" />

          <motion.div
            style={{
              y: reduceMotion ? 0 : copyY,
              opacity: reduceMotion ? 1 : copyOpacity,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-change-transform"
          >
            <p className="tech-label text-brand-200">{eyebrow}</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-light leading-[1.05] text-blanco sm:text-6xl lg:text-7xl">
              {heading}{" "}
              <em className="accent-serif text-brand-200">{accent}</em>
            </h2>
          </motion.div>
        </motion.div>
      </div>

      {children && (
        <div className="mx-auto max-w-5xl px-6 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
          {children}
        </div>
      )}
    </section>
  );
}
