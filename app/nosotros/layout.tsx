import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La firma",
  description:
    "Conoce a AWCA, firma ecuatoriana con más de diez años de experiencia en auditoría, tributación y contabilidad.",
};

export default function NosotrosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
