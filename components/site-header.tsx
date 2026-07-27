"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { AwcaLogo } from "@/components/one/logo";

/* Pestañas con "pill que persigue" (spec premium): una pastilla de vidrio se
   desliza entre pestañas al pasar el mouse y regresa a la pestaña activa al
   salir; la activa lleva además un punto azul persistente. */
const navSpring = { type: "spring", stiffness: 380, damping: 32 } as const;

function NavTabs({ dark, pathname }: { dark: boolean; pathname: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const activeHref =
    navLinks.find((l) => pathname.startsWith(l.href))?.href ?? null;
  const highlighted = hovered ?? activeHref;

  return (
    <nav
      onMouseLeave={() => setHovered(null)}
      className="relative hidden items-center gap-1 lg:flex"
    >
      {navLinks.map(({ href, label }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onMouseEnter={() => setHovered(href)}
            onFocus={() => setHovered(href)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-500/60",
              dark
                ? active
                  ? "text-blanco"
                  : "text-blanco/70 hover:text-blanco"
                : active
                  ? "text-tinta-900"
                  : "text-tinta-600 hover:text-tinta-900"
            )}
          >
            {highlighted === href && (
              <motion.span
                layoutId="nav-pill"
                transition={navSpring}
                className="absolute inset-0 -z-10 overflow-hidden rounded-full"
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-full",
                    dark
                      ? "bg-white/10 shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]"
                      : "bg-white/70 shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]"
                  )}
                />
              </motion.span>
            )}
            {label}
            {active && (
              <motion.span
                layoutId="nav-dot"
                transition={navSpring}
                className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-brand-500"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [darkSurface, setDarkSurface] = useState(pathname === "/");
  const [open, setOpen] = useState(false);
  // Smart header: se esconde al bajar y asoma al subir (patrón premium).
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - lastY.current;
      // histéresis: ignora micro-movimientos para que no parpadee
      if (Math.abs(dy) < 6) return;
      lastY.current = y;
      if (y < 96) {
        // cerca del tope siempre visible
        setHidden(false);
      } else {
        setHidden(dy > 0);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let current: boolean | null = null;

    const updateTheme = () => {
      raf = 0;
      const section = document
        .elementsFromPoint(2, 48)
        .map((element) =>
          element.closest<HTMLElement>("[data-header-theme]")
        )
        .find(Boolean);
      const next = section?.dataset.headerTheme === "dark";
      if (next === current) return;
      current = next;
      setDarkSurface(next);
    };

    const scheduleTheme = () => {
      if (raf) return;
      raf = requestAnimationFrame(updateTheme);
    };

    // Síncrono en el montaje: así el tema correcto (p. ej. hero oscuro de una
    // página interna) se aplica en el primer paint, sin un frame de texto
    // oscuro sobre fondo oscuro.
    updateTheme();
    window.addEventListener("scroll", scheduleTheme, { passive: true });
    window.addEventListener("resize", scheduleTheme);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scheduleTheme);
      window.removeEventListener("resize", scheduleTheme);
    };
  }, [pathname]);

  // Bloquea el scroll del fondo mientras el menú a pantalla completa está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const dark = darkSurface;
  const reduced = useReducedMotion();

  return (
    <>
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 py-3 transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none"
      /* -100% - 28px: el velo degradado sobresale 28px del header, hay que
         llevárselo entero al esconderse. Con el menú móvil abierto no se
         esconde nunca. */
      style={{
        transform:
          hidden && !open ? "translateY(calc(-100% - 28px))" : "translateY(0)",
      }}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-[calc(100%+28px)] bg-[linear-gradient(180deg,rgba(7,11,20,0.96)_0%,rgba(7,11,20,0.78)_58%,rgba(7,11,20,0)_100%)] transition-opacity duration-500",
          dark ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-[calc(100%+28px)] bg-[linear-gradient(180deg,rgba(238,241,247,0.96)_0%,rgba(238,241,247,0.78)_58%,rgba(238,241,247,0)_100%)] transition-opacity duration-500",
          dark ? "opacity-0" : "opacity-100"
        )}
      />

      <div className="pointer-events-auto relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 sm:px-10">
        <Link href="/" aria-label="AWCA — inicio" onClick={() => setOpen(false)}>
          <AwcaLogo tone={dark ? "dark" : "light"} />
        </Link>

        <NavTabs dark={dark} pathname={pathname} />

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-10 items-center rounded-full bg-brand-600 px-5 text-sm font-medium text-white shadow-[0_0_24px_-8px_rgba(58,68,255,0.7)] transition-all hover:-translate-y-0.5 hover:bg-brand-500 lg:inline-flex"
        >
          Escríbenos
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg lg:hidden",
            dark
              ? "text-blanco hover:bg-white/10"
              : "text-tinta-900 hover:bg-tinta-900/5"
          )}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

    </header>

      {/* ===== Menú móvil — overlay premium liquid glass a pantalla completa.
          Va FUERA del <header> a propósito: el header tiene transform (smart
          hide), y cualquier transform en un ancestro rompe el position:fixed
          de sus hijos. Como hermano, el fixed cubre toda la pantalla. ===== */}
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        reduced={!!reduced}
      />
    </>
  );
}

/* Easing de la marca y variantes de entrada en cascada (skill: 30–50ms/item,
   salida más rápida que la entrada, respeta reduced-motion). */
const MENU_EASE = [0.16, 1, 0.3, 1] as const;

function MobileMenu({
  open,
  onClose,
  reduced,
}: {
  open: boolean;
  onClose: () => void;
  reduced: boolean;
}) {
  const pathname = usePathname();
  const t = (d: number) => (reduced ? 0 : d);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ pointerEvents: "auto" }}
        >
          {/* Scrim + blur del fondo: comunica que la página queda en pausa */}
          <motion.button
            type="button"
            aria-label="Cerrar menú"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-noche-950/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: t(0.25) } }}
            transition={{ duration: t(0.35), ease: MENU_EASE }}
          />

          {/* Panel de vidrio */}
          <motion.div
            className="absolute inset-0 flex flex-col overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,rgba(9,12,22,0.82)_0%,rgba(6,8,16,0.92)_100%)] backdrop-blur-2xl backdrop-saturate-150"
            initial={{ opacity: 0, y: reduced ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: reduced ? 0 : -12,
              transition: { duration: t(0.24), ease: MENU_EASE },
            }}
            transition={{ duration: t(0.42), ease: MENU_EASE }}
          >
            {/* resplandores de marca de ambiente, detrás de todo */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-600/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-brand-500/15 blur-3xl"
            />

            {/* Barra superior: logo + cerrar */}
            <div className="relative flex items-center justify-between px-6 py-3 sm:px-8">
              <Link href="/" aria-label="AWCA — inicio" onClick={onClose}>
                <AwcaLogo tone="dark" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blanco transition-colors hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Enlaces grandes, en cascada */}
            <motion.nav
              className="relative flex flex-1 flex-col justify-center gap-1 px-6 sm:px-8"
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: reduced ? 0 : 0.08 } },
              }}
            >
              {navLinks.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: reduced ? 0 : 18 },
                      show: { opacity: 1, y: 0, transition: { duration: t(0.5), ease: MENU_EASE } },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group flex items-center justify-between border-b border-white/8 py-4"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full transition-all duration-300",
                            active
                              ? "bg-brand-400 shadow-[0_0_10px_2px_rgba(90,107,255,0.8)]"
                              : "bg-white/0 group-hover:bg-white/40"
                          )}
                        />
                        <span
                          className={cn(
                            "text-[1.9rem] font-light leading-none tracking-[-0.01em] transition-colors",
                            active
                              ? "text-blanco"
                              : "text-blanco/70 group-hover:text-blanco"
                          )}
                        >
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={22}
                        className={cn(
                          "shrink-0 transition-all duration-300",
                          active
                            ? "text-brand-300"
                            : "text-white/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/60"
                        )}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Pie: CTA + contacto */}
            <motion.div
              className="relative px-6 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] pt-4 sm:px-8"
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: t(0.5), delay: reduced ? 0 : 0.34, ease: MENU_EASE }}
            >
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="relative inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-brand-600 text-base font-medium text-white shadow-[0_0_36px_-6px_rgba(58,68,255,0.8)] transition-all hover:-translate-y-0.5 hover:bg-brand-500"
              >
                <MessageCircle size={18} />
                Escríbenos por WhatsApp
              </a>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-niebla-400">
                <a
                  href={`tel:+${site.contact.whatsapp}`}
                  className="flex items-center gap-2 transition-colors hover:text-blanco"
                >
                  <Phone size={14} className="text-brand-400" />
                  {site.contact.phone}
                </a>
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-brand-400" />
                  {site.contact.city}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
