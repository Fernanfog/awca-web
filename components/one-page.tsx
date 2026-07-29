"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Check,
  Bell,
  FileCheck2,
  Sparkles,
  ChevronDown,
  Award,
  Users,
  BadgeCheck,
  MapPin,
  SearchCheck,
  ChartNoAxesCombined,
} from "lucide-react";
import { TitleReveal, Counter, ParallaxVideo } from "@/components/one/motion-bits";
import { LampGlow } from "@/components/ui/lamp";
import { TiltReveal } from "@/components/one/tilt-reveal";
import { LogoEmblem } from "@/components/one/logo-emblem";
import { Aurora } from "@/components/one/aurora";
import { CasosGanados } from "@/components/one/casos-ganados";
import { TestimonialsReel } from "@/components/one/testimonials-reel";
import { site, whatsappLink } from "@/lib/site";

const LogoSphere = dynamic(() => import("@/components/three/logo-sphere"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-full bg-brand-500/15 blur-3xl" />
  ),
});

/* ===========================================================================
   AWCA — una sola página. Hero con la esfera de nodos del logo (firma),
   ritmo claro ↔ noche, tarjetas uniformes, dashboard propio. Mobile-first.
   =========================================================================== */

function Rise({
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

function Video({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.01, rootMargin: "120px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    />
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-600">
      {children}
    </span>
  );
}

/* Carrusel de servicios: las tarjetas se deslizan horizontalmente (scroll
   nativo + snap), con flechas y puntos — igual mecánica que un carrusel
   premium, sin dependencias nuevas (nada de shadcn/Embla). */
function ServicesCarousel({
  items,
  wa,
}: {
  items: typeof servicios;
  wa: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [active, setActive] = useState(0);
  const total = items.length + 1; // + celda de CTA

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = (card?.offsetWidth ?? 320) + 16;
    setActive(Math.round(el.scrollLeft / step));
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = (card?.offsetWidth ?? 320) + 16;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollToCard = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = (card?.offsetWidth ?? 320) + 16;
    el.scrollTo({ left: i * step, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div className="hidden sm:block" />
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Anterior"
            className="grid h-10 w-10 place-items-center rounded-full border border-tinta-900/12 text-tinta-600 transition-colors hover:border-tinta-900/25 hover:text-tinta-900 disabled:opacity-30"
          >
            <ArrowLeft size={17} />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Siguiente"
            className="grid h-10 w-10 place-items-center rounded-full border border-tinta-900/12 text-tinta-600 transition-colors hover:border-tinta-900/25 hover:text-tinta-900 disabled:opacity-30"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:-mx-8 sm:px-8"
        /* El borde DERECHO del carrusel se funde con el fondo (nada de corte
           recto sobre la tarjeta que asoma); al llegar al final, vuelve a ser
           nítido. El izquierdo queda firme a propósito: ahí la tarjeta activa
           está alineada al margen y el velo se sentía sucio. */
        style={{
          maskImage: `linear-gradient(to right, black 0, ${
            canNext ? "black calc(100% - 4rem), transparent 100%" : "black 100%"
          })`,
          WebkitMaskImage: `linear-gradient(to right, black 0, ${
            canNext ? "black calc(100% - 4rem), transparent 100%" : "black 100%"
          })`,
        }}
      >
        {items.map((s) => (
          <Link
            key={s.nombre}
            data-card
            href={`/servicios#${s.nombre.toLowerCase().replace(/\s+/g, "-")}`}
            className="group relative flex h-[23rem] w-[270px] shrink-0 snap-start overflow-hidden rounded-lg shadow-[0_24px_60px_-30px_rgba(10,15,28,0.5)] sm:w-[300px]"
          >
            {/* Imagen a página completa, con zoom suave al pasar el mouse */}
            <Image
              src={s.img}
              alt={s.nombre}
              fill
              sizes="300px"
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noche-950 via-noche-950/60 to-noche-950/10 transition-opacity duration-300 group-hover:from-noche-950 group-hover:via-noche-950/50" />
            <div className="relative mt-auto flex flex-col p-6">
              <h3 className="text-lg font-medium text-blanco">{s.nombre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-blanco/75">
                {s.detalle}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300">
                Ver más
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        ))}

        {/* Última tarjeta: CTA, mismo tamaño que las demás */}
        <a
          data-card
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[23rem] w-[270px] shrink-0 snap-start flex-col justify-between rounded-lg bg-brand-600 p-6 text-white shadow-[0_24px_60px_-30px_rgba(58,68,255,0.55)] sm:w-[300px]"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">
            <Sparkles size={20} />
          </span>
          <div className="mt-5">
            <h3 className="text-lg font-medium">¿No sabes cuál necesitas?</h3>
            <p className="mt-2 text-sm text-white/80">
              Cuéntanos tu caso y te decimos qué te conviene.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
              Escríbenos <ArrowUpRight size={15} />
            </span>
          </div>
        </a>
      </div>

      {/* Puntos minimalistas: indican posición, sin barra de scroll visible */}
      <div className="mt-5 flex justify-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Ir a la tarjeta ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? "w-5 bg-brand-600" : "w-1.5 bg-tinta-900/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const servicios = [
  {
    img: "/img/tax.webp",
    nombre: "Impuestos y SRI",
    detalle: "Declaraciones, anexos y planificación tributaria para cumplir a tiempo y pagar lo justo.",
    chips: ["IVA", "Renta", "ATS"],
  },
  {
    img: "/img/ledger.webp",
    nombre: "Contabilidad mensual",
    detalle: "Registro, conciliaciones, nómina y reportes mensuales que explican cómo avanza tu empresa.",
    chips: ["NIIF", "IESS"],
  },
  {
    img: "/img/documents.webp",
    nombre: "Auditoría financiera",
    detalle: "Revisión independiente, control interno e informes sólidos para socios, bancos y organismos de control.",
    chips: ["Estados", "Control"],
  },
  {
    img: "/img/analysis.webp",
    nombre: "Estados financieros",
    detalle: "Balances y notas bajo NIIF, preparados para Supercias, financiamiento e inversionistas.",
    chips: ["Balance", "Flujo"],
  },
  {
    img: "/img/consulting.webp",
    nombre: "Consultoría y peritajes",
    detalle: "Criterio técnico para planificación tributaria, peritajes contables y decisiones financieras complejas.",
    chips: ["Peritajes", "Plan."],
  },
];

const serviceHighlights = [
  {
    icon: FileCheck2,
    title: "Tributación",
    detail: "SRI, IVA, Renta y anexos",
    iconTone: "bg-brand-50/70 text-brand-600",
    wash: "bg-brand-400",
  },
  {
    icon: BadgeCheck,
    title: "Auditoría",
    detail: "Control, evidencia e informes",
    iconTone: "bg-[#edf9f7]/70 text-[#0b716d]",
    wash: "bg-[#0f918a]",
  },
  {
    icon: Award,
    title: "Contabilidad",
    detail: "NIIF, reportes y decisiones",
    iconTone: "bg-[#fbf6e9]/70 text-[#806225]",
    wash: "bg-[#c79a3a]",
  },
];

const pasos = [
  {
    n: "01",
    icon: SearchCheck,
    t: "Diagnóstico integral",
    d: "Revisamos obligaciones, declaraciones, comprobantes y registros contables para entender el estado real de tu empresa.",
    result: "Mapa de riesgos, pendientes y prioridades",
    iconTone: "bg-brand-50/80 text-brand-600",
    wash: "bg-brand-400",
  },
  {
    n: "02",
    icon: FileCheck2,
    t: "Plan y puesta al día",
    d: "Ordenamos documentos, corregimos diferencias y definimos un calendario claro para resolver lo urgente sin improvisaciones.",
    result: "Plan de acción con responsables y fechas",
    iconTone: "bg-white/70 text-[#0b716d]",
    wash: "bg-[#0f918a]",
  },
  {
    n: "03",
    icon: Bell,
    t: "Operación mensual",
    d: "Registramos, conciliamos y presentamos cada obligación a tiempo. También anticipamos vencimientos y solicitudes del SRI.",
    result: "Cumplimiento continuo y documentación ordenada",
    iconTone: "bg-white/70 text-[#806225]",
    wash: "bg-[#c79a3a]",
  },
  {
    n: "04",
    icon: ChartNoAxesCombined,
    t: "Reportes y acompañamiento",
    d: "Convertimos los movimientos del mes en reportes comprensibles para decidir con datos y detectar oportunidades a tiempo.",
    result: "Indicadores claros y asesoría para el siguiente paso",
    iconTone: "bg-white/70 text-[#315a86]",
    wash: "bg-[#5276a7]",
  },
];

const sectores = ["Comercio", "Construcción", "Importadoras", "Servicios", "ONG", "Emprendedores"];
const entidades = ["SRI", "Superintendencia de Compañías", "IESS", "Ministerio del Trabajo"];
const control = [
  { icon: FileCheck2, t: "Estados al día", d: "Cierres mensuales sin atrasos." },
  { icon: Bell, t: "Alertas del SRI", d: "Te avisamos antes de cada vencimiento." },
  { icon: Check, t: "Todo respaldado", d: "Tu información, disponible cuando la pidas." },
];

// Íconos de las tarjetas de estadísticas de "La firma" (mismo orden que site.stats)
const statIcons = [Award, Users, BadgeCheck, MapPin];

// Testimonios y fotografías publicados con autorización de cada cliente.
const testimonios = [
  {
    quote:
      "Llegamos a AWCA con dos años de declaraciones atrasadas y multas que ya sumaban más de $3.000. En tres meses nos pusieron al día con el SRI, negociaron las facilidades de pago y desde entonces no hemos vuelto a pagar un solo recargo.",
    nombre: "Jorge Andrade",
    cargo: "Gerente general",
    empresa: "Constructora · Quito",
    foto: "/jorge.jpeg",
  },
  {
    quote:
      "Antes cerraba el mes sin saber si había ganado o perdido. Ahora cada día 5 tengo mi reporte con ventas, gastos y lo que debo apartar para el SRI. Escribo por WhatsApp y me contestan el mismo día, hasta un sábado.",
    nombre: "María Fernanda Cevallos",
    cargo: "Propietaria",
    empresa: "Comercial · Riobamba",
    foto: "/Maria.jpeg",
  },
  {
    quote:
      "El banco nos pidió una auditoría de estados financieros en tres semanas para aprobar el crédito. AWCA la entregó en 18 días, sin observaciones, y nos aprobaron $80.000 de línea de crédito con ese informe.",
    nombre: "Andrés Bravo",
    cargo: "Director financiero",
    empresa: "Importadora · Guayaquil",
    foto: "/Andres.jpeg",
  },
];

const faqs = [
  {
    q: "¿Cuánto cuesta llevar mi contabilidad con AWCA?",
    a: "Depende del tamaño y movimiento de tu empresa. Cuéntanos tu caso por WhatsApp y te damos una cotización clara el mismo día — sin costos escondidos ni letra pequeña.",
  },
  {
    q: "Estoy atrasado con el SRI, ¿me pueden ayudar?",
    a: "Sí, es de lo que más resolvemos. Revisamos tu estado en el SRI, calculamos lo pendiente, presentamos las declaraciones atrasadas y negociamos la mejor salida posible. Mientras antes empecemos, menos intereses pagas.",
  },
  {
    q: "¿Trabajan con empresas de mi ciudad?",
    a: "Atendemos en Riobamba, Quito, Guayaquil, Manta, Ambato y Santo Domingo, y trabajamos a distancia con clientes de todo el país. La mayoría de trámites hoy son 100% digitales.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Tu RUC y acceso a tus comprobantes electrónicos. Con eso hacemos un diagnóstico gratuito de cómo está tu empresa y te decimos qué falta. Nada más.",
  },
  {
    q: "¿Atienden a personas naturales o solo empresas?",
    a: "Ambas. Llevamos la contabilidad de personas naturales obligadas, profesionales independientes, emprendimientos y compañías constituidas.",
  },
];

export function OnePage() {
  const wa = whatsappLink();

  return (
    <div className="relative overflow-x-clip bg-papel">
      {/* ============ HERO — noche, esfera del logo a la derecha ============ */}
      <section
        data-header-theme="dark"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-noche-950"
      >
        <div className="absolute inset-0 opacity-40">
          <Video
            src="/escenas/ext-2-frente.mp4"
            className="h-full w-full scale-110 object-cover blur-[2px]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-noche-950/70 via-noche-950/55 to-noche-950" />
        {/* Luz de techo sutil sobre el escenario — versión discreta de la
            lámpara (la completa vive en "La firma"); no compite con la esfera */}
        <LampGlow className="opacity-80" width={38} />

        <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-8 px-6 pt-24 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Esfera del logo (arriba en móvil, derecha en desktop) */}
          <div className="relative order-1 mx-auto aspect-square w-full max-w-[300px] lg:order-2 lg:max-w-[440px]">
            <div className="neon-glow absolute inset-10" />
            <LogoSphere />
            {/* Logo real crisp en el centro (núcleo dentro de la órbita) */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-brand-500/25 blur-2xl" />
                <Image
                  src="/logo-mark.png"
                  alt="AWCA"
                  width={228}
                  height={92}
                  priority
                  className="relative w-24 drop-shadow-[0_0_18px_rgba(90,107,255,0.8)] sm:w-28 lg:w-36"
                />
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.42, delay: 0.05 }}
              className="tech-label text-brand-300"
            >
              {site.name} — Especialistas tributarios
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-5 max-w-xl text-balance text-[2.4rem] font-light leading-[1.06] tracking-[-0.02em] text-blanco sm:text-5xl lg:mx-0"
            >
              Pagar impuestos está bien. Pagar de más,{" "}
              <em className="accent-serif text-brand-300">no</em>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.46, delay: 0.18 }}
              className="mx-auto mt-5 max-w-md text-base leading-relaxed text-niebla-400 lg:mx-0"
            >
              Firma ecuatoriana de auditoría, contabilidad y tributación. Cumples
              con el SRI y decides con datos.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.25 }}
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-7 text-sm font-medium text-white shadow-[0_0_32px_-6px_rgba(58,68,255,0.7)] transition-all hover:-translate-y-0.5 hover:bg-brand-500"
              >
                <MessageCircle size={17} />
                Escríbenos por WhatsApp
              </a>
              <a
                href="#servicios"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-niebla-400/25 px-7 text-sm font-medium text-blanco/85 transition-colors hover:border-niebla-400/50 hover:text-blanco"
              >
                Ver servicios <ArrowDown size={15} />
              </a>
            </motion.div>
          </div>
        </div>
        <div data-hilo="inicio" className="absolute bottom-4 left-1/2 h-2 w-2" />
      </section>

      {/* ============ SERVICIOS — arquitectura financiera + carrusel ============ */}
      <section
        id="servicios"
        data-header-theme="light"
        className="relative z-10 scroll-mt-24 overflow-hidden bg-papel-100 px-6 py-14 sm:px-8 sm:py-24"
      >
        <Image
          src="/img/services-financial-architecture.webp"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-[68%_center] contrast-[1.06] saturate-[1.14]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,254,0.98)_0%,rgba(248,250,254,0.88)_36%,rgba(248,250,254,0.32)_56%,rgba(248,250,254,0.05)_76%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(238,241,247,0.22)_0%,transparent_28%,transparent_76%,rgba(238,241,247,0.28)_100%)]" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <Rise className="max-w-3xl">
            <p data-hilo="servicios" className="tech-label text-brand-600">
              Servicios
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-light leading-[1.1] text-tinta-900 sm:text-4xl">
              <TitleReveal
                segments={[
                  { t: "Todo lo que tu empresa necesita," },
                  { t: " sin sustos", em: true },
                  { t: "." },
                ]}
              />
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-tinta-600">
              Un mismo equipo conecta tributación, auditoría y contabilidad para
              que cada declaración, informe y decisión parta de la misma
              información. Sin pasar tu caso de mano en mano.
            </p>

            <div className="mt-7 grid max-w-3xl gap-3 sm:grid-cols-3">
              {serviceHighlights.map(
                ({ icon: Icon, title, detail, iconTone, wash }) => (
                  <div
                    key={title}
                    className="relative flex min-h-20 items-center gap-3 overflow-hidden rounded-xl border border-white/55 bg-white/25 px-4 py-3 shadow-[0_18px_48px_-22px_rgba(10,15,28,0.42),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(10,15,28,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/35"
                  >
                    {/* tinte de color propio de cada frente (mismo lenguaje
                        liquid-glass que las tarjetas de "Cómo trabajamos") */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-40 blur-2xl ${wash}`}
                    />
                    <span
                      className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md ${iconTone}`}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="relative">
                      <span className="block text-sm font-semibold text-tinta-900">
                        {title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-snug text-tinta-600">
                        {detail}
                      </span>
                    </span>
                  </div>
                )
              )}
            </div>
          </Rise>

          <Rise delay={0.08} className="mt-9">
            <ServicesCarousel items={servicios} wa={wa} />
          </Rise>
        </div>
      </section>

      {/* ============ LA FIRMA — el equipo real (tilt reveal) ============ */}
      <section
        id="firma"
        data-header-theme="dark"
        className="relative scroll-mt-24 overflow-hidden bg-noche-950 py-16 sm:py-28"
      >
        <Image
          src="/img/office.webp"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-20"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.9)_0%,rgba(7,11,20,0.72)_48%,rgba(7,11,20,0.96)_100%)]" />
        {/* Lámpara completa: la línea de neón se enciende sobre el título */}
        <LampGlow />
        <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8">
          <Rise className="mx-auto max-w-2xl text-center">
            <p data-hilo="firma" className="tech-label text-brand-300">
              La firma
            </p>
            <h2 className="mt-4 text-3xl font-light leading-[1.1] tracking-[-0.02em] text-blanco sm:text-5xl">
              <TitleReveal
                emClass="accent-serif text-brand-300"
                segments={[
                  { t: "Las personas detrás de" },
                  { t: " tus números", em: true },
                  { t: "." },
                ]}
              />
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-niebla-400">
              Un equipo ecuatoriano que conoce tu caso por su nombre. Riobamba ·
              Quito · Guayaquil · Manta · Ambato · Santo Domingo.
            </p>
          </Rise>

          <TiltReveal className="mt-12">
            <div className="rounded-lg border border-white/10 bg-noche-900 p-2 shadow-[0_40px_90px_-48px_rgba(0,0,0,0.9)] sm:p-3">
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image
                  src="/img/equipo-firma.webp"
                  alt="El equipo de AWCA en su sala de reuniones"
                  fill
                  sizes="(max-width:1024px) 100vw, 1024px"
                  className="object-cover"
                />
                {/* Oscurecido premium + viñeta: da profundidad, hace resaltar
                    el emblema y difumina cualquier detalle de la imagen IA. */}
                <div className="pointer-events-none absolute inset-0 bg-noche-950/35" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_95%_at_50%_38%,transparent_28%,rgba(7,11,20,0.6)_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noche-950/95 via-noche-950/35 to-noche-950/10" />

                {/* Emblema premium: el logo de AWCA CONSTRUIDO con nodos
                    iluminados — sello de marca grande sobre el equipo. */}
                <LogoEmblem className="absolute left-1/2 top-[11%] w-[46%] max-w-[300px] -translate-x-1/2 sm:top-[13%] sm:w-[38%]" />

                {/* Frase editorial sobre la foto: le da caché premium y lleva
                    la mirada al mensaje (no a los detalles de la imagen). */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                  <p className="tech-label text-brand-300">El equipo AWCA</p>
                  <p className="mt-2 max-w-xl text-xl font-light leading-snug text-blanco sm:text-[1.9rem]">
                    Rigor de auditores,{" "}
                    <em className="accent-serif text-brand-200">
                      cercanía de siempre
                    </em>
                    .
                  </p>
                </div>
              </div>
            </div>
          </TiltReveal>

          <Rise delay={0.1}>
            <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {site.stats.map((s, i) => {
                const Icon = statIcons[i] ?? Award;
                return (
                  <div
                    key={s.label}
                    className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.05] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/[0.08]"
                  >
                    {/* brillo superior sutil tipo vidrio */}
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    <span className="relative mx-auto grid h-11 w-11 place-items-center rounded-md bg-brand-600/15 text-brand-300 ring-1 ring-white/10">
                      <Icon size={18} />
                    </span>
                    <p className="relative mt-4 text-3xl font-light tracking-tight text-blanco sm:text-4xl">
                      <Counter to={s.to} suffix={s.suffix} thousands={"thousands" in s ? s.thousands : false} />
                    </p>
                    <p className="tech-label relative mt-2 text-niebla-400">
                      {s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </Rise>
        </div>
      </section>

      {/* ============ CONTROL FINANCIERO — recepción real de fondo ============ */}
      <section
        data-header-theme="dark"
        className="relative isolate overflow-hidden bg-noche-950"
      >
        {/* Fondo: nuestra recepción, con el logo AWCA en la pared */}
        <Image
          src="/img/oficina.webp"
          alt="Recepción de AWCA"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Velo: oscuro solo en el tercio izquierdo (texto), el resto de la
            recepción y el logo quedan visibles y nítidos */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,11,20,0.92) 0%, rgba(7,11,20,0.82) 30%, rgba(7,11,20,0.4) 52%, rgba(7,11,20,0.12) 70%, rgba(7,11,20,0.32) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noche-950 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-36">
          <Rise className="max-w-sm">
            <p data-hilo="red" className="tech-label text-brand-300">
              Control financiero
            </p>
            <h2 className="mt-4 text-3xl font-light leading-[1.1] tracking-[-0.02em] text-blanco sm:text-4xl">
              Tus números, claros como{" "}
              <em className="accent-serif text-brand-300">el agua</em>.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-niebla-400">
              Un tablero mensual que entiendes sin ser contador: qué debes al SRI,
              qué te queda y cómo vas.
            </p>
            <ul className="mt-8 space-y-4">
              {control.map((c) => (
                <li key={c.t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-600/25 text-brand-300 ring-1 ring-white/10">
                    <c.icon size={16} />
                  </span>
                  <span>
                    <span className="block font-medium text-blanco">{c.t}</span>
                    <span className="block text-sm text-niebla-400">{c.d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </section>

      {/* ============ PROCESO — del desorden a la claridad ============ */}
      <section
        id="proceso"
        data-header-theme="light"
        className="relative z-10 overflow-hidden border-y border-tinta-900/8 bg-papel-100 px-6 py-16 sm:px-8 sm:py-28"
      >
        <Image
          src="/img/process-tax-workflow-v2.webp"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-center contrast-[1.06] saturate-[1.12]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,254,0.95)_0%,rgba(248,250,254,0.86)_27%,rgba(248,250,254,0.24)_48%,rgba(238,241,247,0.06)_72%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(238,241,247,0.16)_0%,transparent_28%,transparent_78%,rgba(238,241,247,0.24)_100%)]" />

        <div className="relative mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-14">
          <Rise className="max-w-xl lg:sticky lg:top-28">
            <p className="tech-label text-brand-600">Cómo trabajamos</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.1] text-tinta-900 sm:text-4xl">
              De un desorden contable a{" "}
              <em className="accent-serif text-brand-600">dormir tranquilo</em>.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-tinta-600">
              No empezamos llenando formularios. Primero entendemos qué ocurre,
              ordenamos lo pendiente y construimos una rutina tributaria y
              contable que puedas seguir sin sorpresas.
            </p>
            <div className="mt-7 inline-flex items-center gap-3 rounded-lg border border-brand-500/15 bg-white/90 px-4 py-3 shadow-[0_14px_34px_-26px_rgba(10,15,28,0.45)]">
              <BadgeCheck size={18} className="text-brand-600" />
              <span className="text-sm font-medium text-tinta-900">
                Cuatro etapas, un equipo responsable
              </span>
            </div>
          </Rise>

          <div className="grid gap-4 sm:grid-cols-2">
            {pasos.map((p, i) => (
              <Rise key={p.n} delay={i * 0.07}>
                <article
                  className="group relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-2xl border border-white/55 bg-white/25 p-6 shadow-[0_18px_48px_-22px_rgba(10,15,28,0.42),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(10,15,28,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:bg-white/35"
                >
                  {/* tinte de color muy sutil, propio de cada etapa */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl ${p.wash}`}
                  />
                  <div className="relative flex items-center justify-between gap-4">
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-xl border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md ${p.iconTone}`}
                    >
                      <p.icon size={20} />
                    </span>
                    <span className="tech-label text-tinta-400">{p.n}</span>
                  </div>
                  <h3 className="relative mt-6 text-lg font-semibold text-tinta-900">
                    {p.t}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-tinta-600">
                    {p.d}
                  </p>
                  <div className="relative mt-auto border-t border-tinta-900/10 pt-4">
                    <span className="tech-label text-tinta-400">Resultado</span>
                    <p className="mt-2 flex items-start gap-2 text-sm font-medium leading-snug text-tinta-900">
                      <Check size={15} className="mt-0.5 shrink-0 text-brand-600" />
                      {p.result}
                    </p>
                  </div>
                </article>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTORES + CONFÍAN — claro, con foto ============ */}
      <section
        data-header-theme="light"
        className="relative z-10 px-6 pb-16 pt-12 sm:px-8 sm:pb-28 sm:pt-20"
      >
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Rise>
            <p className="tech-label text-brand-600">A quién ayudamos</p>
            <h2 className="mt-4 max-w-md text-3xl font-light leading-[1.1] tracking-[-0.02em] text-tinta-900 sm:text-4xl">
              Del negocio de barrio a la{" "}
              <em className="accent-serif text-brand-600">constructora</em>.
            </h2>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {sectores.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-tinta-900/12 bg-papel-100 px-4 py-2 text-sm font-medium text-tinta-600"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-9 border-t border-tinta-900/10 pt-6">
              <p className="tech-label text-tinta-400">Te mantenemos al día ante</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {entidades.map((e) => (
                  <span key={e} className="text-sm font-semibold text-tinta-900/70">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </Rise>

          <Rise delay={0.15}>
            <div className="relative pb-10">
              {/* halos LED azules de ambiente, detrás de la foto */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 -z-10"
              >
                <div className="absolute left-6 top-2 h-36 w-36 rounded-full bg-brand-500/45 blur-3xl" />
                <div className="absolute right-2 bottom-16 h-40 w-40 rounded-full bg-brand-400/35 blur-3xl" />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_36px_80px_-32px_rgba(27,32,232,0.4)]">
                <Image
                  src="/img/awca-fachada.webp"
                  alt="Fachada de AWCA de noche, con el letrero iluminado"
                  fill
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noche-950/70 to-transparent" />
                {/* reflejo lateral tipo vidrio, sutil */}
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent" />
                <p className="absolute inset-x-6 bottom-6 text-lg font-light leading-snug text-white">
                  &ldquo;¿Multas fiscales? Las convertimos en{" "}
                  <em className="accent-serif">anécdotas</em>.&rdquo;
                </p>
              </div>

              {/* reflejo de piso: la misma foto invertida, desvanecida */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-full aspect-[4/3] -scale-y-100 overflow-hidden rounded-2xl opacity-20"
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent 22%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black, transparent 22%)",
                }}
              >
                <Image
                  src="/img/awca-fachada.webp"
                  alt=""
                  fill
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Rise>
        </div>
      </section>

      {/* ============ TESTIMONIOS — claro, en pila (sticky stack) ============ */}
      <TestimonialsReel items={testimonios} />

      {/* ============ CASOS GANADOS — prueba real ante el SRI ============ */}
      <CasosGanados />

      {/* ============ PREGUNTAS FRECUENTES — claro, ambiente Aurora ============ */}
      <section
        data-header-theme="light"
        className="relative isolate z-10 overflow-hidden bg-papel px-6 py-16 sm:px-8 sm:py-24"
      >
        {/* Fondo ambiental premium (CSS puro, sin errores ni costo de GPU) */}
        <Aurora />

        <div className="relative z-10 mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
          <Rise className="lg:sticky lg:top-28">
            <p className="tech-label text-brand-600">Preguntas frecuentes</p>
            <h2 className="mt-4 max-w-sm text-3xl font-light leading-[1.1] tracking-[-0.02em] text-tinta-900 sm:text-4xl lg:text-5xl">
              Lo que todos preguntan{" "}
              <em className="accent-serif text-brand-600">antes de empezar</em>.
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-tinta-600 sm:text-lg">
              ¿Tu duda no está aquí? Escríbenos por WhatsApp y te respondemos el
              mismo día.
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-brand-600 px-6 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-brand-500"
            >
              <MessageCircle size={16} />
              Escríbenos por WhatsApp
            </a>
          </Rise>
          <Rise delay={0.1}>
            {/* Cada pregunta es su propia tarjeta liquid-glass (mismo lenguaje
                que "Cómo trabajamos"): wash de color, brillo interior y hover
                que se levanta. */}
            <div className="space-y-3">
              {faqs.map((f, i) => {
                const wash = [
                  "bg-brand-400",
                  "bg-[#0f918a]",
                  "bg-[#c79a3a]",
                  "bg-[#5276a7]",
                  "bg-brand-500",
                ][i % 5];
                return (
                  <details
                    key={f.q}
                    className="group relative overflow-hidden rounded-2xl border border-white/55 bg-white/25 px-5 shadow-[0_18px_48px_-22px_rgba(10,15,28,0.42),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(10,15,28,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/35 open:bg-white/40 sm:px-6"
                  >
                    {/* wash de color propio de cada tarjeta */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-40 blur-2xl ${wash}`}
                    />
                    <summary className="relative flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-tinta-900 [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/60 bg-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md">
                        <ChevronDown
                          size={16}
                          className="text-brand-600 transition-transform duration-300 group-open:rotate-180"
                        />
                      </span>
                    </summary>
                    <p className="relative -mt-1 max-w-xl pb-5 text-sm leading-relaxed text-tinta-600">
                      {f.a}
                    </p>
                  </details>
                );
              })}
            </div>
          </Rise>
        </div>
      </section>

      {/* ============ CONTACTO — noche ============ */}
      <section
        id="contacto"
        data-header-theme="dark"
        className="relative scroll-mt-24"
      >
        <div className="relative overflow-hidden">
          <ParallaxVideo src="/escenas/ext-3-entrada.mp4" />
          <div className="absolute inset-0 bg-noche-950/62" />
          <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-5xl flex-col items-center justify-center px-6 py-28 text-center sm:px-8">
            <Rise>
              <p className="tech-label text-brand-300">Empecemos</p>
              <h2 className="mx-auto mt-4 max-w-2xl text-balance text-4xl font-light leading-[1.08] tracking-[-0.02em] text-blanco sm:text-6xl">
                <TitleReveal
                  emClass="accent-serif text-brand-300"
                  segments={[
                    { t: "Hablemos de tu" },
                    { t: " empresa", em: true },
                    { t: "." },
                  ]}
                />
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-niebla-400">
                Cuéntanos en qué anda tu empresa y te decimos, sin rodeos, cómo
                ponerte al día con el SRI y cuánto costaría. La primera
                conversación no cuesta nada y no te compromete a nada.
              </p>
              <div className="mx-auto mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {["Respuesta el mismo día", "Sin compromiso", "Primera asesoría gratis"].map(
                  (t) => (
                    <span
                      key={t}
                      className="tech-label flex items-center gap-2 text-niebla-400"
                    >
                      <Check size={13} className="text-brand-300" />
                      {t}
                    </span>
                  )
                )}
              </div>
            </Rise>
            <Rise delay={0.15}>
              <div className="mt-10 flex flex-col items-center gap-4">
                <a
                  href={wa}
                  data-hilo="cierre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-brand-600 px-10 text-base font-medium text-white shadow-[0_0_46px_-8px_rgba(58,68,255,0.9)] transition-all hover:-translate-y-0.5 hover:bg-brand-500"
                >
                  <MessageCircle size={19} />
                  Escríbenos por WhatsApp
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-niebla-400 transition-colors hover:text-blanco"
                >
                  {site.contact.email}
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </Rise>
          </div>
        </div>
      </section>
    </div>
  );
}
