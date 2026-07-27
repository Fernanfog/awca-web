"use client";

import { MessageCircle, Mail, MapPin, Clock, ShieldCheck, HandHeart } from "lucide-react";
import { DetailHero, Reveal } from "@/components/one/detail";
import { Aurora } from "@/components/one/aurora";
import { Beams } from "@/components/one/beams";
import { site, whatsappLink } from "@/lib/site";

const canales = [
  {
    icon: MessageCircle,
    t: "WhatsApp",
    d: "Cuéntanos qué está pasando y recibe una primera orientación el mismo día.",
    valor: "Abrir conversación",
    href: whatsappLink(),
    external: true,
    iconTone: "bg-brand-50/70 text-brand-600",
    wash: "bg-brand-400",
  },
  {
    icon: Mail,
    t: "Correo",
    d: "Ideal para enviar documentos o explicar un caso con más detalle.",
    valor: site.contact.email,
    href: `mailto:${site.contact.email}`,
    external: false,
    iconTone: "bg-[#edf9f7]/70 text-[#0b716d]",
    wash: "bg-[#0f918a]",
  },
  {
    icon: MapPin,
    t: "Encuéntranos",
    d: "Matriz en Riobamba y atención virtual coordinada en todo Ecuador.",
    valor: "Ver ubicación",
    href: "/ubicacion",
    external: false,
    iconTone: "bg-[#fbf6e9]/70 text-[#806225]",
    wash: "bg-[#c79a3a]",
  },
];

const pasos = [
  {
    n: "01",
    t: "Nos cuentas",
    d: "Nos escribes por WhatsApp o correo y explicas tu situación tributaria, contable o de auditoría.",
  },
  {
    n: "02",
    t: "Diagnóstico sin costo",
    d: "Revisamos tu caso y te decimos exactamente qué necesitas. Sin compromiso.",
  },
  {
    n: "03",
    t: "Propuesta clara",
    d: "Recibes una propuesta con alcance y precio definidos. Sin letra pequeña ni sorpresas.",
  },
];

const promesas = [
  { icon: Clock, t: "Respuesta el mismo día" },
  { icon: ShieldCheck, t: "Tu información, confidencial" },
  { icon: HandHeart, t: "La primera charla es gratis" },
];

export default function ContactoPage() {
  return (
    <main className="bg-papel pb-24">
      <DetailHero
        eyebrow="Contacto"
        title="Hablemos de"
        accent="tu empresa."
        sub="Estamos a un mensaje de distancia. Cuéntanos qué necesitas y te asesoramos sin compromiso — sin tecnicismos y sin rodeos."
        backgroundImage="/img/reception-v6.webp"
        dark
      />

      {/* Canales de contacto */}
      <section className="relative isolate overflow-hidden">
        <Aurora />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-14 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {canales.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.07}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/55 bg-white/25 p-7 shadow-[0_18px_48px_-22px_rgba(10,15,28,0.42),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(10,15,28,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:bg-white/35"
                >
                  {/* tinte de color propio de cada canal (mismo lenguaje
                      liquid-glass del resto del sitio) */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl ${c.wash}`}
                  />
                  <span
                    className={`relative grid h-11 w-11 place-items-center rounded-xl border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md ${c.iconTone}`}
                  >
                    <c.icon size={20} />
                  </span>
                  <h2 className="relative mt-5 text-lg font-medium text-tinta-900">
                    {c.t}
                  </h2>
                  <p className="relative mt-1 flex-1 text-sm text-tinta-400">{c.d}</p>
                  <p className="relative mt-3 break-words font-medium text-brand-600">
                    {c.valor}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo empezamos — 3 pasos */}
      <section className="relative isolate overflow-hidden">
        <Aurora />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-14 sm:px-8 sm:py-24">
          <Reveal className="max-w-2xl">
            <p className="tech-label text-brand-600">Cómo empezamos</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.1] tracking-[-0.02em] text-tinta-900 sm:text-4xl">
              Del primer mensaje a una{" "}
              <em className="accent-serif text-brand-600">propuesta clara</em>.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-tinta-600 sm:text-lg">
              Escribirnos no te obliga a nada. Así de simple es dar el primer
              paso hacia tener tus números en orden.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {pasos.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="border-t border-tinta-900/12 pt-5">
                  <span className="accent-serif text-4xl text-brand-500/70">
                    {p.n}
                  </span>
                  <h3 className="mt-3 text-lg font-medium text-tinta-900">
                    {p.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tinta-600">
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final — llamativo, con beams */}
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-noche-950 px-6 py-16 text-center sm:px-10 sm:py-20">
            <Beams className="opacity-70" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,11,20,0.6)_100%)]" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="tech-label text-brand-300">Hablemos</p>
              <h2 className="mt-4 text-3xl font-light leading-[1.1] tracking-[-0.02em] text-blanco sm:text-5xl">
                La primera conversación{" "}
                <em className="accent-serif text-brand-300">no cuesta nada</em>.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-niebla-400 sm:text-lg">
                Explícanos tu situación y te ayudamos a identificar el siguiente
                paso antes de preparar cualquier propuesta.
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-13 items-center gap-2 rounded-full bg-brand-600 px-8 text-base font-medium text-white shadow-[0_0_30px_-6px_rgba(58,68,255,0.8)] transition-all hover:-translate-y-0.5 hover:bg-brand-500"
              >
                <MessageCircle size={18} />
                Escríbenos por WhatsApp
              </a>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {promesas.map((p) => (
                  <span
                    key={p.t}
                    className="inline-flex items-center gap-2 text-sm text-niebla-400"
                  >
                    <p.icon size={16} className="text-brand-300" />
                    {p.t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
