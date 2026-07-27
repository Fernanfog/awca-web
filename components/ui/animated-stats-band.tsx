"use client";

import { Award, BadgeCheck, MapPin, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type Stat = {
  to: number;
  suffix: string;
  label: string;
  thousands?: boolean;
};

const icons = [Award, Users, BadgeCheck, MapPin];
const iconTones = [
  "border-brand-400/35 bg-brand-500/12 text-brand-300",
  "border-aqua-600/35 bg-aqua-600/12 text-[#74ddd6]",
  "border-gold-600/35 bg-gold-600/12 text-[#e0c477]",
  "border-brand-400/35 bg-brand-500/12 text-brand-300",
];

export function AnimatedStatsBand({ stats }: { stats: readonly Stat[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-y border-white/12 bg-white/[0.015]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-brand-300/65 to-transparent" />
      </div>

      <div className="relative grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = icons[index] ?? Award;
          const shown =
            (stat.thousands
              ? stat.to.toLocaleString("es-EC")
              : String(stat.to)) + stat.suffix;

          return (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.58,
                delay: reduceMotion ? 0 : index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex min-h-40 flex-col justify-between px-5 py-6 sm:min-h-48 sm:px-7 sm:py-8 lg:px-8"
            >
              <span
                className={`absolute bottom-5 right-0 top-5 w-px bg-white/10 ${
                  index % 2 === 0 ? "" : "max-lg:hidden"
                } ${index === 3 ? "lg:hidden" : ""}`}
              />
              <span
                className={`absolute inset-x-5 bottom-0 h-px bg-white/10 lg:hidden ${
                  index >= 2 ? "hidden" : ""
                }`}
              />

              <div className="flex items-center justify-between">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-md border backdrop-blur-sm ${iconTones[index]}`}
                >
                  <Icon aria-hidden size={17} strokeWidth={1.8} />
                </span>
                <span className="font-mono text-[0.65rem] text-niebla-500">
                  0{index + 1}
                </span>
              </div>

              <div className="mt-5">
                <p className="font-sans text-3xl font-light tabular-nums text-blanco sm:text-[2.75rem] sm:leading-none">
                  {shown}
                </p>
                <p className="tech-label mt-3 leading-relaxed text-niebla-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
