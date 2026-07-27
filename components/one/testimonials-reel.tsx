"use client";

import * as React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/one/detail";
import { TitleReveal } from "@/components/one/motion-bits";

/* ===========================================================================
   TestimonialsReel — reel de retratos con columnas que se deslizan + texto que
   sube letra por letra. Adaptado del componente de referencia PERO:
   · Restilado a NUESTROS tokens (papel / tinta / brand), sin variables shadcn.
   · Fotos NATURALES (sin desaturar ni el brillo morado) — clientes reales.
   · Avanza con AUTOPLAY (ping-pong) + flechas; NO secuestra el scroll.
   · Se pausa al pasar el mouse / enfocar. Respeta reduced-motion.
   · Sin dependencias nuevas (cn propio; 2 keyframes en globals.css).
   =========================================================================== */

type Testimonio = {
  quote: string;
  nombre: string;
  cargo: string;
  empresa: string;
  foto?: string;
};

const CELL = 121.33;
const GAP = 8;
const STEP = 3 * (CELL + GAP);
const EXIT_MS = 240;
const SLIDE_MS = 800;
const AUTOPLAY_MS = 5200;
const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

const FEATURED_SHADOW =
  "0 1.008px 0.705px -0.563px rgba(10,15,28,0.14), 0 2.389px 1.672px -1.125px rgba(10,15,28,0.13), 0 4.357px 3.05px -1.688px rgba(10,15,28,0.13), 0 7.244px 5.07px -2.25px rgba(10,15,28,0.12), 0 11.698px 8.188px -2.813px rgba(10,15,28,0.11), 0 19.148px 13.404px -3.375px rgba(10,15,28,0.09), 0 32.972px 23.08px -3.938px rgba(10,15,28,0.06), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(10,15,28,0.25)";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-xl border border-tinta-900/8 bg-gradient-to-b from-papel-200 to-papel-100 blur-[1px] shadow-[0_1px_2px_rgba(10,15,28,0.05),inset_0_2px_0_rgba(255,255,255,0.9)]"
      style={{ width: CELL, height: CELL }}
    />
  );
}

function Featured({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-xl bg-papel-200 ring-1 ring-tinta-900/5"
      style={{ width: CELL, height: CELL, boxShadow: FEATURED_SHADOW }}
    >
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="122px"
        className="object-cover object-[center_28%]"
      />
    </div>
  );
}

function Chars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  let idx = startIndex;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span
                  key={ci}
                  className="scroll-reel-char"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

function Reel({
  items,
  charStaggerMs = 8,
}: {
  items: Testimonio[];
  charStaggerMs?: number;
}) {
  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const animating = React.useRef(false);
  const autoDir = React.useRef<1 | -1>(1);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const count = items.length;

  React.useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    );
    const t = timeouts.current;
    return () => {
      cancelAnimationFrame(raf);
      t.forEach(clearTimeout);
    };
  }, []);

  // El autoplay no debe seguir disparando la animación letra por letra
  // (cientos de <span> reflowing) mientras el carrusel está fuera de
  // pantalla — sin esto corría cada 5.2s para siempre, robando frames al
  // scroll en cualquier otra parte de la página.
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const transitionTo = React.useCallback(
    (next: number) => {
      if (animating.current || next === index || next < 0 || next >= count)
        return;
      animating.current = true;
      setIndex(next);
      setExiting(true);
      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS)
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS)
      );
    },
    [index, count]
  );

  // Autoplay ping-pong (sin salto brusco al final): al llegar al extremo,
  // invierte el sentido. Se pausa con `paused` y en reduced-motion.
  React.useEffect(() => {
    if (paused || !visible || count <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      let next = index + autoDir.current;
      if (next >= count) {
        autoDir.current = -1;
        next = index - 1;
      } else if (next < 0) {
        autoDir.current = 1;
        next = index + 1;
      }
      transitionTo(next);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, paused, visible, count, transitionTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      transitionTo(index + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      transitionTo(index - 1);
    }
  };

  const middleItems = React.useMemo(() => {
    const arr: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) arr.push({ type: "cell" });
    items.forEach((_, i) => {
      arr.push({ type: "featured", i });
      if (i < count - 1) arr.push({ type: "cell" }, { type: "cell" });
    });
    for (let i = 0; i < 3; i++) arr.push({ type: "cell" });
    return arr;
  }, [items, count]);

  const sideCellCount = 4 + 2 * count;
  const centerIdx = (count - 1) / 2;
  const middleY = (centerIdx - index) * STEP;
  const sideY = -middleY;

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });

  const current = items[displayIndex];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonios de clientes"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative flex w-full max-w-[1060px] flex-col items-stretch gap-2.5 overflow-hidden rounded-2xl border border-tinta-900/8 bg-papel-100 shadow-[0_30px_80px_-40px_rgba(10,15,28,0.35),inset_0_2px_0_rgba(255,255,255,0.9)] outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 md:min-h-[320px] md:flex-row"
    >
      {/* Reel de retratos */}
      <div
        aria-hidden="true"
        className="relative h-56 w-full shrink-0 self-stretch overflow-hidden md:h-auto md:w-[380px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform"
            style={colStyle(middleY)}
          >
            {middleItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured
                  key={i}
                  src={items[item.i].foto ?? ""}
                  alt={`Retrato de ${items[item.i].nombre}`}
                />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Contenido: cita + autor + controles */}
      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch px-6 py-7 md:py-10">
        <div className="flex flex-col gap-3">
          <Quote size={30} className="text-brand-600/35" />
          <div className="relative w-full overflow-hidden" aria-live="polite">
            {/* copia invisible que dimensiona el escenario al texto actual */}
            <div
              aria-hidden="true"
              className="invisible flex min-h-[150px] flex-col gap-4"
            >
              <p className="text-base font-normal leading-snug text-tinta-900 sm:text-[1.15rem]">
                {current.quote}
              </p>
              <div>
                <p className="text-sm font-semibold text-tinta-900">
                  {current.nombre}
                </p>
                <p className="text-xs text-tinta-400">
                  {current.cargo} · {current.empresa}
                </p>
              </div>
            </div>
            <div
              key={displayIndex}
              className={cn(
                "absolute inset-x-0 top-0 flex flex-col gap-4 will-change-[transform,opacity]",
                exiting && "scroll-reel-exit"
              )}
            >
              <p className="text-base font-normal leading-snug text-tinta-900 sm:text-[1.15rem]">
                <Chars text={current.quote} startIndex={0} staggerMs={charStaggerMs} />
              </p>
              <div>
                <p className="text-sm font-semibold text-tinta-900">
                  <Chars
                    text={current.nombre}
                    startIndex={current.quote.length + 6}
                    staggerMs={charStaggerMs}
                  />
                </p>
                <p className="text-xs text-tinta-400">
                  {current.cargo} · {current.empresa}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-1.5 md:mt-0">
          <button
            type="button"
            onClick={() => transitionTo(index - 1)}
            disabled={index === 0}
            aria-label="Testimonio anterior"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-tinta-900/15 bg-transparent text-tinta-900 transition-transform duration-200 hover:enabled:scale-110 active:enabled:scale-95 disabled:cursor-default disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
          >
            <svg className="h-3.5 w-3.5 opacity-70" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7.5 2.5 3.5 6l4 3.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => transitionTo(index + 1)}
            disabled={index === count - 1}
            aria-label="Siguiente testimonio"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-tinta-900/15 bg-transparent text-tinta-900 transition-transform duration-200 hover:enabled:scale-110 active:enabled:scale-95 disabled:cursor-default disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
          >
            <svg className="h-3.5 w-3.5 opacity-70" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m4.5 2.5 4 3.5-4 3.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsReel({ items }: { items: Testimonio[] }) {
  return (
    <section
      id="testimonios"
      className="relative z-10 overflow-hidden bg-papel px-6 py-16 sm:px-8 sm:py-28"
    >
      <Image
        src="/img/reception-v6.webp"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover object-center opacity-[0.22]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(238,241,247,0.82)_0%,rgba(238,241,247,0.72)_50%,rgba(238,241,247,0.86)_100%)]" />

      <div className="relative mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="tech-label text-brand-600">Lo que dicen</p>
          <h2 className="mt-4 text-3xl font-light leading-[1.1] text-tinta-900 sm:text-4xl">
            <TitleReveal
              segments={[
                { t: "Empresas que ya duermen" },
                { t: " tranquilas", em: true },
                { t: "." },
              ]}
            />
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-tinta-600">
            Casos reales donde el orden tributario y financiero se convirtió en
            tranquilidad.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 flex justify-center">
          <Reel items={items} />
        </Reveal>
      </div>
    </section>
  );
}
