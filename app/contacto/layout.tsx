import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Conversa con el equipo de AWCA sobre las necesidades tributarias, contables o de auditoría de tu empresa.",
};

export default function ContactoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
