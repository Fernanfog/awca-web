import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cobertura en Ecuador",
  description:
    "Atención de auditoría, tributación y contabilidad para empresas en Riobamba, Quito, Guayaquil, Manta y otras ciudades del Ecuador.",
};

export default function UbicacionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
