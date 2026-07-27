"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  Check,
  FileCheck2,
  MessageCircle,
  SearchCheck,
} from "lucide-react";
import { DetailHero, Reveal } from "@/components/one/detail";
import { TextParallaxContent } from "@/components/ui/text-parallax-content-scroll";
import { whatsappLink } from "@/lib/site";

const servicios = [
  {
    img: "/img/tax.webp",
    nombre: "Impuestos y SRI",
    desc: "Preparamos y presentamos tus obligaciones tributarias con revisión previa y criterio técnico. También identificamos oportunidades legales para ordenar tu carga fiscal y prevenir diferencias con el SRI.",
    features: [
      "Impuesto a la Renta",
      "IVA mensual y semestral",
      "Anexos transaccionales (ATS)",
      "Planificación tributaria",
      "Revisión de notificaciones del SRI",
    ],
  },
  {
    img: "/img/ledger.webp",
    nombre: "Contabilidad mensual",
    desc: "Llevamos tu contabilidad completa y conectamos cada comprobante con reportes que sí sirven para gestionar. Al cierre del mes conoces tus resultados, obligaciones y posición financiera.",
    features: [
      "Registro contable mensual",
      "Conciliaciones bancarias",
      "Roles de pago e IESS",
      "Reportes gerenciales",
      "Cierres y control documental",
    ],
  },
  {
    img: "/img/documents.webp",
    nombre: "Auditoría financiera",
    desc: "Realizamos auditorías independientes basadas en evidencia, riesgos y materialidad. El resultado es un informe claro que fortalece la confianza de socios, bancos y organismos de control.",
    features: [
      "Auditoría de estados financieros",
      "Auditoría tributaria",
      "Informes para entes de control",
      "Revisión de control interno",
      "Matrices de hallazgos y mejoras",
    ],
  },
  {
    img: "/img/analysis.webp",
    nombre: "Estados financieros",
    desc: "Elaboramos y revisamos estados financieros bajo NIIF, con notas y soportes consistentes. Quedan listos para Supercias, entidades financieras, socios o potenciales inversionistas.",
    features: [
      "Balance general",
      "Estado de resultados",
      "Flujo de efectivo",
      "Notas a los estados financieros",
      "Análisis de indicadores financieros",
    ],
  },
  {
    img: "/img/consulting.webp",
    nombre: "Consultoría y peritajes",
    desc: "Acompañamos decisiones que requieren una mirada especializada: reorganización financiera, peritajes contables y análisis para procesos legales. Traducimos la complejidad en criterios accionables.",
    features: [
      "Peritajes contables",
      "Reingeniería financiera",
      "Implementación de sistemas contables",
      "Capacitaciones y asesorías",
      "Diagnóstico financiero y tributario",
    ],
  },
];

const alcances = [
  {
    icon: FileCheck2,
    title: "Cumplimiento tributario",
    detail:
      "Calendario, declaraciones, anexos y revisión de soportes para reducir errores antes de presentar.",
    iconTone: "bg-brand-50/70 text-brand-600",
    wash: "bg-brand-400",
  },
  {
    icon: SearchCheck,
    title: "Control y auditoría",
    detail:
      "Pruebas, evidencia y hallazgos explicados con claridad para fortalecer procesos y decisiones.",
    iconTone: "bg-[#edf9f7]/70 text-[#0b716d]",
    wash: "bg-[#0f918a]",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Información para crecer",
    detail:
      "Reportes financieros comprensibles para conocer márgenes, flujo de caja y próximos pasos.",
    iconTone: "bg-[#fbf6e9]/70 text-[#806225]",
    wash: "bg-[#c79a3a]",
  },
];

export default function ServiciosPage() {
  return (
    <main className="bg-papel pb-24">
      <DetailHero
        eyebrow="Servicios"
        title="Cinco frentes,"
        accent="un solo equipo."
        sub="Tributación, auditoría y contabilidad conectadas para que tu empresa cumpla, entienda sus números y crezca con tranquilidad."
        backgroundImage="/img/arch-financiera-noche.webp"
        dark
      />

      <section className="mx-auto grid max-w-5xl gap-4 px-6 pt-14 sm:grid-cols-3 sm:px-8">
        {alcances.map(({ icon: Icon, title, detail, iconTone, wash }) => (
          <Reveal key={title}>
            <article className="relative h-full overflow-hidden rounded-2xl border border-white/55 bg-white/25 p-5 shadow-[0_18px_48px_-22px_rgba(10,15,28,0.42),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(10,15,28,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:bg-white/35">
              {/* tinte de color propio de cada frente (mismo lenguaje
                  liquid-glass que las tarjetas del home) */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl ${wash}`}
              />
              <span
                className={`relative grid h-10 w-10 place-items-center rounded-xl border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md ${iconTone}`}
              >
                <Icon size={19} />
              </span>
              <h2 className="relative mt-5 text-base font-semibold text-tinta-900">
                {title}
              </h2>
              <p className="relative mt-2 text-sm leading-relaxed text-tinta-600">
                {detail}
              </p>
            </article>
          </Reveal>
        ))}
      </section>

      <TextParallaxContent
        className="mt-16 sm:mt-20"
        image="/img/consulting.webp"
        alt="Acuerdo profesional entre un cliente y el equipo de AWCA"
        eyebrow="Una lectura completa"
        heading="Cinco servicios."
        accent="Un solo criterio."
      >
        <div className="grid gap-7 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
          <h2 className="text-2xl font-medium leading-tight text-tinta-900 sm:text-3xl">
            Tus obligaciones no existen por separado. Tus decisiones tampoco.
          </h2>
          <div>
            <p className="text-base leading-relaxed text-tinta-600 sm:text-lg">
              Una declaración afecta la contabilidad; la contabilidad sostiene
              los estados financieros; y esos estados son la base de una
              auditoría confiable. Por eso conectamos cada frente y evitamos que
              tu caso pase de mano en mano.
            </p>
            <a
              href="#impuestos-y-sri"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-noche-950 px-6 text-sm font-medium text-blanco transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Explorar cada servicio <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </TextParallaxContent>

      <div className="mx-auto mt-16 max-w-5xl space-y-20 px-6 sm:px-8">
        {servicios.map((s, i) => (
          <Reveal key={s.nombre}>
            <article
              id={s.nombre.toLowerCase().replace(/\s+/g, "-")}
              className="grid items-center gap-8 lg:grid-cols-2"
            >
              <div className={i % 2 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={s.img}
                    alt={s.nombre}
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className={i % 2 ? "lg:order-1" : ""}>
                <h2 className="text-2xl font-medium text-tinta-900 sm:text-3xl">
                  {s.nombre}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-tinta-600">
                  {s.desc}
                </p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-tinta-900/80"
                    >
                      <Check size={16} className="shrink-0 text-brand-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <div className="mx-auto mt-20 max-w-5xl px-6 sm:px-8">
        <div className="flex flex-col items-center gap-5 rounded-lg bg-noche-950 px-8 py-14 text-center">
          <h2 className="max-w-xl text-2xl font-light text-blanco sm:text-3xl">
            ¿No sabes cuál necesitas?{" "}
            <em className="accent-serif text-brand-300">Te lo decimos.</em>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-niebla-400 sm:text-base">
            Cuéntanos qué está pasando en tu empresa y revisamos si necesitas
            cumplimiento mensual, una auditoría puntual o un diagnóstico más
            completo.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center gap-2 rounded-full bg-brand-600 px-8 text-base font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-brand-500"
          >
            <MessageCircle size={18} />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
