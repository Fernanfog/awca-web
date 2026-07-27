/* ===========================================================================
   Servicios de Audit Whole.
   👉 Edita / agrega servicios aquí. El diseño se actualiza solo.
   =========================================================================== */

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string; // nombre de icono de lucide-react
  features: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "servicio-1",
    title: "Servicio 01",
    short: "Descripción breve del servicio.",
    description: "Descripción completa del servicio pendiente.",
    icon: "ReceiptText",
    features: ["Detalle", "Detalle", "Detalle", "Detalle"],
    featured: true,
  },
  {
    slug: "servicio-2",
    title: "Servicio 02",
    short: "Descripción breve del servicio.",
    description: "Descripción completa del servicio pendiente.",
    icon: "ShieldCheck",
    features: ["Detalle", "Detalle", "Detalle", "Detalle"],
    featured: true,
  },
  {
    slug: "servicio-3",
    title: "Servicio 03",
    short: "Descripción breve del servicio.",
    description: "Descripción completa del servicio pendiente.",
    icon: "BookOpenCheck",
    features: ["Detalle", "Detalle", "Detalle", "Detalle"],
  },
  {
    slug: "servicio-4",
    title: "Servicio 04",
    short: "Descripción breve del servicio.",
    description: "Descripción completa del servicio pendiente.",
    icon: "LineChart",
    features: ["Detalle", "Detalle", "Detalle", "Detalle"],
  },
  {
    slug: "servicio-5",
    title: "Servicio 05",
    short: "Descripción breve del servicio.",
    description: "Descripción completa del servicio pendiente.",
    icon: "Globe",
    features: ["Detalle", "Detalle", "Detalle", "Detalle"],
  },
  {
    slug: "servicio-6",
    title: "Servicio 06",
    short: "Descripción breve del servicio.",
    description: "Descripción completa del servicio pendiente.",
    icon: "Scale",
    features: ["Detalle", "Detalle", "Detalle", "Detalle"],
  },
];
