"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { DetailHero, Reveal } from "@/components/one/detail";
import { Aurora } from "@/components/one/aurora";
import { site, whatsappLink } from "@/lib/site";

const ciudades = ["Riobamba", "Quito", "Guayaquil", "Manta"];

export default function UbicacionPage() {
  return (
    <main className="bg-papel pb-24">
      <DetailHero
        eyebrow="Encuéntranos"
        title="Donde esté tu empresa,"
        accent="llegamos."
        sub="Atendemos empresas en las principales ciudades del país y acompañamos procesos de forma virtual en todo Ecuador."
        backgroundImage="/img/andes.webp"
        dark
      />

      <section className="relative isolate overflow-hidden">
        {/* Aurora de fondo: el vidrio necesita algo vivo detrás que difuminar */}
        <Aurora />
        <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8">
        {/* Ciudades */}
        <Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ciudades.map((c) => (
              <div
                key={c}
                className="relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/55 bg-white/25 px-5 py-5 shadow-[0_18px_48px_-22px_rgba(10,15,28,0.42),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(10,15,28,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/35"
              >
                {/* tinte azul de marca, mismo lenguaje liquid-glass del resto
                    del sitio (las 4 ciudades comparten un solo color: aquí el
                    color no codifica nada, la matriz se marca con texto) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-400 opacity-30 blur-2xl"
                />
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/60 bg-brand-50/70 text-brand-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md">
                  <MapPin size={18} />
                </span>
                <span className="relative text-base font-medium text-tinta-900">{c}</span>
                {c === "Riobamba" && (
                  <span className="tech-label relative ml-auto text-brand-600">
                    Matriz
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* La matriz — mapa real de la ficha de Google + datos de visita */}
        <Reveal delay={0.06}>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Mapa embebido de la ficha de Google Business */}
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/55 shadow-[0_18px_48px_-22px_rgba(10,15,28,0.42)]">
              <iframe
                src={site.contact.maps.embedUrl}
                title="Mapa de la matriz de AWCA en Riobamba"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            {/* Datos de visita, en el mismo vidrio del resto del sitio */}
            <div className="relative flex flex-col overflow-hidden rounded-2xl border border-white/55 bg-white/25 p-7 shadow-[0_18px_48px_-22px_rgba(10,15,28,0.42),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(10,15,28,0.06)] backdrop-blur-2xl backdrop-saturate-150">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-400 opacity-40 blur-2xl"
              />
              <p className="tech-label relative text-brand-600">Matriz Riobamba</p>
              <h2 className="relative mt-3 text-2xl font-light leading-snug text-tinta-900">
                Ven a conversar{" "}
                <em className="accent-serif text-brand-600">en persona</em>.
              </h2>

              <ul className="relative mt-6 flex-1 space-y-4 text-sm text-tinta-600">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-brand-600" />
                  {site.contact.address}
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0 text-brand-600" />
                  {site.contact.schedule}
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="mt-0.5 shrink-0 text-brand-600" />
                  <a
                    href={`tel:+${site.contact.whatsapp}`}
                    className="transition-colors hover:text-tinta-900"
                  >
                    {site.contact.phone}
                  </a>
                </li>
              </ul>

              <a
                href={site.contact.maps.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-noche-950 px-6 text-sm font-medium text-blanco transition-all hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Cómo llegar <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Cobertura nacional */}
        <Reveal delay={0.1}>
          <div className="relative mt-6 min-h-[360px] overflow-hidden rounded-lg bg-noche-950">
            <Image
              src="/img/city.webp"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,20,0.96)_0%,rgba(7,11,20,0.82)_55%,rgba(7,11,20,0.38)_100%)]" />
            <div className="relative flex min-h-[360px] max-w-2xl flex-col justify-center px-7 py-12 sm:px-12">
              <p className="tech-label text-brand-300">Cobertura nacional</p>
              <h2 className="mt-4 text-2xl font-light text-blanco sm:text-4xl">
                Cercanía cuando hace falta.{" "}
                <em className="accent-serif text-brand-300">Agilidad siempre.</em>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-niebla-400 sm:text-base">
                Coordinamos reuniones presenciales según el caso y resolvemos la
                mayoría de procesos tributarios, contables y de auditoría con un
                flujo documental seguro y remoto.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-blanco/85 sm:grid-cols-3">
                {["Visitas coordinadas", "Reuniones virtuales", "Gestión documental"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check size={15} className="shrink-0 text-brand-300" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-brand-600 px-7 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-brand-500"
              >
                <MessageCircle size={17} />
                Coordinar por WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
        </div>
      </section>
    </main>
  );
}
