import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, LinkedinIcon, XIcon } from "@/components/social-icons";
import { navLinks, site, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-blanco/[0.06] bg-noche-950">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Marca */}
          <div>
            <p className="text-xl font-semibold tracking-[0.08em] text-blanco">
              {site.name}
            </p>
            <p className="tech-label mt-2 text-niebla-500">{site.tagline}</p>
            <div className="mt-6 flex gap-3">
              <SocialIcon href={site.social.facebook} label="Facebook">
                <FacebookIcon size={17} />
              </SocialIcon>
              <SocialIcon href={site.social.linkedin} label="LinkedIn">
                <LinkedinIcon size={17} />
              </SocialIcon>
              <SocialIcon href={site.social.twitter} label="X">
                <XIcon size={17} />
              </SocialIcon>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="tech-label text-niebla-500">Secciones</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-niebla-400 transition-colors hover:text-blanco"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="tech-label text-niebla-500">Contacto</h4>
            <ul className="mt-4 space-y-3 text-sm text-niebla-400">
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-brand-400" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="min-w-0 break-words transition-colors hover:text-blanco"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-brand-400" />
                <a
                  href={whatsappLink()}
                  className="transition-colors hover:text-blanco"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={15} className="text-brand-400" />
                {site.contact.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-blanco/[0.06] pt-6 sm:flex-row">
          <p className="font-mono text-[0.68rem] tracking-wider text-niebla-500">
            © {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </p>
          <p className="font-mono text-[0.68rem] tracking-wider text-niebla-500">
            Ecuador
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-blanco/10 text-niebla-400 transition-all hover:border-brand-400/50 hover:text-brand-300"
    >
      {children}
    </a>
  );
}
