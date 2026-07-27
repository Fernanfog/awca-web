import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios de auditoría, tributación y contabilidad",
  description:
    "Servicios de cumplimiento tributario, auditoría financiera, contabilidad mensual, estados financieros y consultoría en Ecuador.",
};

export default function ServiciosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
