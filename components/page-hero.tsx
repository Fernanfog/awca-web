import { Reveal } from "@/components/motion/reveal";

/** Encabezado estándar para páginas internas. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="soft-glow pointer-events-none absolute -top-20 right-[10%] h-72 w-96 opacity-40" />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        {eyebrow && (
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-ink-900 sm:text-6xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-500">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
