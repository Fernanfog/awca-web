"use client";

import Image from "next/image";
import { MessageCircle, ShieldCheck, ScrollText, Handshake } from "lucide-react";
import { Reveal } from "@/components/one/detail";
import { Aurora } from "@/components/one/aurora";
import { whatsappLink } from "@/lib/site";

/* Casos reales ganados ante el SRI — prueba dura de resultados. Reutilizable
   en el home y en la página "La firma". */
const casos = [
  {
    img: "/img/caso-audiencia.webp",
    alt: "Audiencia ante el SRI: deuda impugnada de USD 488.677 defendida por AWCA",
    cifra: "$488.677",
    desc: "en deuda tributaria impugnada, defendida en audiencia ante el SRI.",
  },
  {
    img: "/img/caso-macas.webp",
    alt: "Caso ganado en Macas: acción de protección, obligación de 160.000 dejada en cero",
    cifra: "$160.000 → $0",
    desc: "Acción de protección ganada. Liquidación de Renta 2018 dejada sin efecto.",
  },
];

const razones = [
  {
    icon: ScrollText,
    t: "Conocemos el proceso",
    d: "Plazos, recursos y tribunales. Sabemos exactamente qué se puede impugnar y cómo.",
  },
  {
    icon: ShieldCheck,
    t: "Argumento técnico, no promesas",
    d: "Cada impugnación se arma con evidencia contable y respaldo legal, no con buena voluntad.",
  },
  {
    icon: Handshake,
    t: "Te acompañamos hasta el final",
    d: "Desde la notificación del SRI hasta la resolución. No te dejamos a medio proceso.",
  },
];

export function CasosGanados() {
  return (
    <section
      id="casos"
      data-header-theme="light"
      className="relative z-10 overflow-hidden bg-papel px-6 py-16 sm:px-8 sm:py-28"
    >
      <Aurora />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="tech-label text-brand-600">Casos ganados</p>
          <h2 className="mt-4 text-3xl font-light leading-[1.1] tracking-[-0.02em] text-tinta-900 sm:text-4xl">
            No prometemos.{" "}
            <em className="accent-serif text-brand-600">Cumplimos.</em>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-tinta-600">
            Cuando el SRI notifica un valor a pagar, no siempre tiene la razón.
            Estos son casos reales, con cifras reales, donde impugnamos y
            ganamos — y son solo los que podemos hacer públicos.
          </p>
        </Reveal>

        {/* Razones + tarjetas de evidencia, lado a lado */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <Reveal>
            <ul className="space-y-6">
              {razones.map((r) => (
                <li key={r.t} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <r.icon size={20} />
                  </span>
                  <div>
                    <p className="font-medium text-tinta-900">{r.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-tinta-600">
                      {r.d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Móvil: usa todo el ancho para que las cifras respiren (a 152px
                se apretaban). Desktop: colage compacto de 2 columnas. */}
            <div className="grid grid-cols-2 gap-4 sm:mx-auto sm:max-w-sm">
              {casos.map((c) => (
                <figure
                  key={c.img}
                  className="overflow-hidden rounded-2xl border border-tinta-900/8 bg-noche-950 shadow-[0_20px_50px_-28px_rgba(10,15,28,0.55)]"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={c.img}
                      alt={c.alt}
                      fill
                      sizes="(max-width:640px) 45vw, 200px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-white/10 p-3.5 sm:p-4">
                    <p className="accent-serif text-base text-brand-300 sm:text-lg">
                      {c.cifra}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-niebla-400">
                      {c.desc}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Cierre — invitación directa, en franja horizontal compacta */}
        <Reveal delay={0.15}>
          <div className="mt-16 rounded-2xl bg-noche-950 px-6 py-8 sm:px-10 sm:py-9">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <h3 className="text-xl font-light leading-snug text-blanco sm:text-2xl">
                  ¿Tienes una notificación del SRI que{" "}
                  <em className="accent-serif text-brand-300">no te cuadra</em>?
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-niebla-400">
                  Cuéntanos tu caso. Te decimos, sin compromiso, si se puede
                  impugnar.
                </p>
              </div>
              <a
                href={whatsappLink(
                  "Hola, tengo una notificación del SRI y quiero saber si se puede impugnar."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-brand-600 px-7 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-brand-500 sm:text-base"
              >
                <MessageCircle size={17} />
                Cuéntanos tu caso
              </a>
            </div>
            <p className="mt-5 text-center text-xs text-niebla-500 sm:text-left">
              Tenemos más casos resueltos que, por confidencialidad, no
              publicamos.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
