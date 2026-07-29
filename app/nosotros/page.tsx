"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Target, Eye, Gem } from "lucide-react";
import { DetailHero, Reveal } from "@/components/one/detail";
import { TextParallaxContent } from "@/components/ui/text-parallax-content-scroll";
import { AnimatedStatsBand } from "@/components/ui/animated-stats-band";
import { Aurora } from "@/components/one/aurora";
import { CasosGanados } from "@/components/one/casos-ganados";
import { site } from "@/lib/site";

/* Asesores reales atendiendo clientes — el lado humano de "La firma". */
const atencion = [
  {
    src: "/img/equipo-trabajo.webp",
    alt: "El equipo de AWCA trabajando en su oficina de Riobamba",
    caption: "Tu caso, siempre en las mismas manos.",
    span: "lg:col-span-2 lg:row-span-2",
    ratio: "aspect-[16/11]",
    big: true,
  },
  {
    src: "/img/asesor-familia.webp",
    alt: "Asesor de AWCA explicando a una pareja adulta",
    caption: "Acompañamos a familias y patrimonios.",
    span: "lg:col-span-2",
    ratio: "aspect-[16/10]",
  },
  {
    src: "/img/asesora-pareja.webp",
    alt: "Asesora de AWCA reunida con una pareja joven",
    caption: "Explicamos claro. No complicamos.",
    span: "",
    ratio: "aspect-[16/11]",
  },
  {
    src: "/img/asesor-cliente-2.webp",
    alt: "Asesor de AWCA en reunión junto a una ventana con vista a la ciudad",
    caption: "Cerca, estés donde estés.",
    span: "",
    ratio: "aspect-[16/11]",
  },
];

/* Misión / Visión / Valores — tarjetas premium con foto de fondo. */
const valores = [
  {
    icon: Target,
    t: "Misión",
    d: "Brindar servicios contables, tributarios y de auditoría respaldados por conocimiento y experiencia, ayudando a cada cliente a cumplir y decidir con seguridad.",
    img: "/img/arch-financiera-noche.webp",
  },
  {
    icon: Eye,
    t: "Visión",
    d: "Ser la firma contable y tributaria de referencia en Ecuador, reconocida por su cercanía, ética y excelencia profesional.",
    img: "/img/oficina.webp",
  },
  {
    icon: Gem,
    t: "Valores",
    d: "Integridad, confidencialidad y compromiso real con cada empresa que confía en nosotros.",
    img: "/img/equipo-firma.webp",
  },
];

export default function NosotrosPage() {
  return (
    <main className="bg-papel pb-24">
      <DetailHero
        eyebrow="La firma"
        title="Diez años cuadrando números"
        accent="en todo el país."
        sub="Somos una firma ecuatoriana de profesionales en contabilidad, tributación y auditoría, comprometidos con el crecimiento de cada cliente."
        backgroundImage="/img/oficina-entrada.webp"
        split
        dark
      />

      {/* Fundador — Ab. CPA Santiago Torres */}
      <section className="relative isolate overflow-hidden">
        <Aurora />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 sm:px-8 sm:pt-20">
          <Reveal className="max-w-2xl">
            <p className="tech-label text-brand-600">Nuestro fundador</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.1] tracking-[-0.02em] text-tinta-900 sm:text-4xl">
              Para nosotros, liderar es{" "}
              <em className="accent-serif text-brand-600">servir</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="mt-8 overflow-hidden rounded-2xl border border-tinta-900/8 shadow-[0_40px_100px_-40px_rgba(10,15,28,0.6)]">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/img/ceo-santiago.webp"
                  alt="Ab. CPA Santiago Torres, CEO y fundador de AWCA, en un escenario"
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
            </figure>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8 grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:gap-12">
              <div>
                <p className="text-lg font-semibold text-tinta-900">
                  Ab. CPA Santiago Torres
                </p>
                <p className="tech-label mt-1 text-brand-600">CEO &amp; Fundador</p>
                <p className="mt-2 text-sm leading-relaxed text-tinta-400">
                  Abogado y Contador Público Autorizado
                </p>
              </div>
              <p className="text-base leading-relaxed text-tinta-600 sm:text-lg">
                Santiago fundó <strong className="text-tinta-900">{site.name}</strong>{" "}
                con una convicción simple: que ninguna empresa deba elegir entre
                cumplir la ley y entender sus números. Al unir criterio jurídico,
                rigor contable y un trato cercano, la firma nació para acompañar —
                no solo para calcular. Ese sigue siendo el estándar con el que
                atendemos cada caso.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section
        data-header-theme="dark"
        className="relative isolate overflow-hidden bg-noche-950 py-14 sm:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="stats-current absolute inset-[-90%_-28%]" />
          <div className="stats-ledger absolute inset-0 opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.08)_0%,rgba(7,11,20,0.58)_68%,rgba(7,11,20,0.86)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/55 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
          <Reveal>
            <AnimatedStatsBand stats={site.stats} />
          </Reveal>
        </div>
      </section>

      <TextParallaxContent
        className="mt-0"
        image="/img/equipo-firma.webp"
        alt="El equipo de AWCA en su sala de reuniones"
        eyebrow="Experiencia que acompaña"
        heading="Rigor en los números."
        accent="Cercanía al decidir."
      >
        <div className="grid gap-7 md:grid-cols-[0.82fr_1.18fr] md:gap-12">
          <h2 className="text-2xl font-medium leading-tight text-tinta-900 sm:text-3xl">
            Conocemos las reglas de Ecuador y también la realidad de quien
            emprende aquí.
          </h2>
          <div>
            <p className="text-base leading-relaxed text-tinta-600 sm:text-lg">
              Trabajamos con SRI, Superintendencia de Compañías, IESS y
              Ministerio del Trabajo sin perder de vista lo esencial: explicar
              cada decisión con claridad y responder cuando tu empresa lo
              necesita.
            </p>
            <Link
              href="/servicios"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-noche-950 px-6 text-sm font-medium text-blanco transition-all hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Conocer nuestros servicios <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </TextParallaxContent>

      {/* Atención cercana — asesores reales con clientes */}
      <section className="relative isolate overflow-hidden">
        <Aurora />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-14 sm:px-8 sm:py-24">
          <Reveal className="max-w-2xl">
            <p className="tech-label text-brand-600">Atención cercana</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.1] tracking-[-0.02em] text-tinta-900 sm:text-4xl">
              No pasas de mano{" "}
              <em className="accent-serif text-brand-600">en mano</em>.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-tinta-600 sm:text-lg">
              Hablas siempre con la persona que lleva tu caso. Sin call centers y
              sin que tu información dé vueltas: un asesor que conoce tu empresa y
              responde cuando lo necesitas.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-4 lg:h-[34rem] lg:grid-cols-4 lg:grid-rows-2">
              {atencion.map((a) => (
                <figure
                  key={a.src}
                  className={`group relative overflow-hidden rounded-2xl shadow-[0_24px_60px_-30px_rgba(10,15,28,0.4)] lg:aspect-auto ${a.ratio} ${a.span}`}
                >
                  <Image
                    src={a.src}
                    alt={a.alt}
                    fill
                    sizes={a.big ? "(max-width:1024px) 100vw, 560px" : "(max-width:1024px) 100vw, 300px"}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noche-950/80 via-noche-950/10 to-transparent" />
                  <figcaption
                    className={`absolute inset-x-0 bottom-0 p-5 font-medium leading-snug text-blanco ${
                      a.big ? "text-lg sm:text-xl" : "text-sm"
                    }`}
                  >
                    {a.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Casos ganados ante el SRI */}
      <CasosGanados />

      {/* Valores */}
      <section className="relative isolate overflow-hidden">
        <Aurora />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-4 sm:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {valores.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.07}>
                <article className="group relative flex h-[22rem] flex-col justify-end overflow-hidden rounded-2xl shadow-[0_28px_70px_-34px_rgba(10,15,28,0.5)] sm:h-[24rem]">
                  <Image
                    src={v.img}
                    alt=""
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noche-950 via-noche-950/70 to-noche-950/25" />
                  <div className="relative p-7">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white shadow-[0_0_22px_-4px_rgba(58,68,255,0.9)]">
                      <v.icon size={20} />
                    </span>
                    <h2 className="mt-5 text-xl font-medium text-blanco">{v.t}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-blanco/75">
                      {v.d}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Cierre */}
          <Reveal>
            <p className="mx-auto mt-16 max-w-3xl text-center text-lg leading-relaxed text-tinta-600">
              En <strong className="text-tinta-900">{site.name}</strong> creemos
              que una contabilidad bien llevada es la base de toda empresa sólida.
              Por eso combinamos experiencia técnica, tecnología y un trato cercano
              para que tomes decisiones con total confianza.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
