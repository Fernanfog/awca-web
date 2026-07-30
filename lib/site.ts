/* ===========================================================================
   Configuración central del sitio.
   👉 Edita aquí los datos de contacto, redes y navegación. Sin tocar diseño.
   =========================================================================== */

export const site = {
  name: "AWCA",
  tagline: "Auditoría · Contabilidad · Tributación",
  description:
    "Firma ecuatoriana de auditoría, contabilidad y tributación. Cumples con el SRI, entiendes tus estados financieros y decides con datos.",
  url: "https://www.auditwhole.com",

  // 📞 Contacto — datos de la ficha de Google Business (AWCA, Riobamba)
  contact: {
    email: "fernando.granizo@auditwhole.com",
    // Número en formato internacional sin signos, ej: 5939XXXXXXXX
    // (0963109509 → sin el 0 y con 593 = 593963109509)
    whatsapp: "593963109509",
    whatsappMessage:
      "Hola AWCA, me gustaría recibir información sobre sus servicios.",
    phone: "+593 96 310 9509",
    city: "Riobamba, Ecuador",
    // 📍 Matriz — ficha verificada en Google Maps
    address: "Av. Daniel León Borja, 4.º piso · Riobamba",
    schedule: "Lun – Vie · hasta las 18:00",
    maps: {
      lat: -1.6674991,
      lng: -78.6557079,
      // Ficha oficial del negocio en Google Maps
      placeUrl:
        "https://www.google.com/maps/place/AWCA/@-1.6674991,-78.6557079,17z/data=!4m6!3m5!1s0x91d3a9a69acfcabb:0x32ed8ade1af65d90!8m2!3d-1.6674991!4d-78.6557079!16s%2Fg%2F11zh24lkxy",
      // Embed sin API key (query = la ficha, para que salga la tarjeta del negocio)
      embedUrl:
        "https://www.google.com/maps?q=AWCA,+Av.+Daniel+Le%C3%B3n+Borja,+Riobamba&z=17&output=embed",
    },
  },

  social: {
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },

  stats: [
    { to: 10, suffix: "+", label: "Años de experiencia" },
    { to: 1000, suffix: "+", thousands: true, label: "Clientes atendidos" },
    { to: 100, suffix: "%", label: "Acompañamiento cercano" },
    { to: 6, suffix: "", label: "Ciudades en Ecuador" },
  ],
} as const;

/* Navegación: el home es one-page, y cada pestaña abre su página de detalle. */
export const navLinks = [
  { label: "Servicios", href: "/servicios" },
  { label: "La firma", href: "/nosotros" },
  { label: "Encuéntranos", href: "/ubicacion" },
  { label: "Contacto", href: "/contacto" },
] as const;

/** Link de WhatsApp listo para usar. */
export function whatsappLink(message?: string) {
  const text = encodeURIComponent(message ?? site.contact.whatsappMessage);
  return `https://wa.me/${site.contact.whatsapp}?text=${text}`;
}
