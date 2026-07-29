"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

/* Utilidades compartidas por las páginas de detalle (Servicios, Nosotros,
   Ubicación, Contacto). Mismo lenguaje visual que el home. */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.52, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function DetailHero({
  eyebrow,
  title,
  accent,
  sub,
  backgroundImage,
  split = false,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: string;
  backgroundImage?: string;
  split?: boolean;
  /** Hero noche premium (fondo oscuro, imagen rica, texto blanco) — mismo
      lenguaje que el hero del home. La nav pasa a modo oscuro automáticamente
      vía data-header-theme. */
  dark?: boolean;
}) {
  if (dark) {
    return (
      <header
        data-header-theme="dark"
        className="relative flex min-h-[28rem] items-center overflow-hidden border-b border-white/8 bg-noche-950 px-6 pb-14 pt-28 sm:min-h-[34rem] sm:px-8 sm:pb-20 sm:pt-40"
      >
        {backgroundImage && (
          <>
            <div className="pointer-events-none absolute inset-0">
              <Image
                src={backgroundImage}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-[0.7] contrast-[1.05]"
              />
            </div>
            {/* Base de oscurecimiento tenue: solo un piso de contraste, sin
                apagar la imagen (antes quedaba casi negra). */}
            <div className="pointer-events-none absolute inset-0 bg-noche-950/12" />
            {/* degradado horizontal: oscuro donde va el texto (izquierda) y se
                ABRE bastante a la derecha para que se vea la foto. */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,20,0.92)_0%,rgba(7,11,20,0.78)_42%,rgba(7,11,20,0.4)_68%,rgba(7,11,20,0.12)_100%)]" />
            {/* viñeta arriba/abajo suave, para fundir con la nav y dar profundidad */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.5)_0%,transparent_34%,transparent_70%,rgba(7,11,20,0.72)_100%)]" />
            {/* resplandor azul de marca, sutil, saliendo del margen */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand-600/20 blur-3xl"
            />
          </>
        )}
        <div className="relative mx-auto w-full max-w-5xl">
          <div className={split ? "sm:max-w-[62%]" : "max-w-3xl"}>
            <p className="tech-label text-brand-300">
              {site.name} — {eyebrow}
            </p>
            <h1
              className={`mt-4 text-balance text-4xl font-light leading-[1.05] text-blanco ${
                split ? "sm:text-5xl lg:text-[3.45rem]" : "sm:text-6xl"
              }`}
            >
              {title}
              {accent && (
                <em className="accent-serif text-brand-300"> {accent}</em>
              )}
            </h1>
            {sub && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-blanco/85 [text-shadow:0_1px_16px_rgba(7,11,20,0.7)] sm:text-lg">
                {sub}
              </p>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative flex min-h-[28rem] items-center overflow-hidden border-b border-tinta-900/8 bg-papel-100 px-6 pb-14 pt-28 sm:min-h-[34rem] sm:px-8 sm:pb-20 sm:pt-40">
      {backgroundImage && (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-full ${
              split ? "sm:w-[58%]" : "sm:w-[64%]"
            }`}
          >
            <Image
              src={backgroundImage}
              alt=""
              fill
              loading="eager"
              sizes={`(max-width: 640px) 100vw, ${split ? "58vw" : "64vw"}`}
              className="object-cover object-center contrast-[1.06] saturate-[1.12]"
            />
          </div>
          <div
            className={`pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(238,241,247,0.96)_0%,rgba(238,241,247,0.88)_45%,rgba(238,241,247,0.66)_75%,rgba(238,241,247,0.52)_100%)] ${
              split
                ? "sm:bg-[linear-gradient(90deg,rgba(238,241,247,1)_0%,rgba(238,241,247,1)_40%,rgba(238,241,247,0.96)_49%,rgba(238,241,247,0.42)_61%,rgba(238,241,247,0.04)_76%,transparent_100%)]"
                : "sm:bg-[linear-gradient(90deg,rgba(238,241,247,0.97)_0%,rgba(238,241,247,0.92)_38%,rgba(238,241,247,0.46)_67%,rgba(238,241,247,0.05)_100%)]"
            }`}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(238,241,247,0.14)_0%,transparent_32%,transparent_78%,rgba(238,241,247,0.20)_100%)]" />
        </>
      )}
      <div className="relative mx-auto w-full max-w-5xl">
        <div className={split ? "sm:max-w-[58%]" : undefined}>
          <p className="tech-label text-brand-600">
            {site.name} — {eyebrow}
          </p>
          <h1
            className={`mt-4 text-balance text-4xl font-light leading-[1.05] text-tinta-900 ${
              split
                ? "max-w-2xl sm:text-5xl lg:text-[3.45rem]"
                : "max-w-3xl sm:text-6xl"
            }`}
          >
            {title}
            {accent && (
              <em className="accent-serif text-brand-600"> {accent}</em>
            )}
          </h1>
          {sub && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-tinta-700 sm:text-lg sm:text-tinta-600">
              {sub}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
