import { cn } from "@/lib/utils";

/* ===========================================================================
   Aurora — fondo ambiental para secciones CLARAS (papel). Resplandores azules
   de marca que se desplazan despacio (CSS puro, sin canvas ni dependencias).
   Da vida al fondo vacío sin ensuciarlo. Se coloca dentro de una sección
   `relative` como capa de fondo; el contenido debe ir con `relative z-10`.
   Respeta reduced-motion (las clases aurora-* desactivan la animación).
   =========================================================================== */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className="aurora-a absolute -left-[8%] -top-[24%] h-[58vh] w-[58vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(58,68,255,0.16), transparent)",
        }}
      />
      <div
        className="aurora-b absolute -right-[6%] top-[6%] h-[52vh] w-[52vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(120,110,255,0.13), transparent)",
        }}
      />
      <div
        className="aurora-c absolute bottom-[-28%] left-[28%] h-[62vh] w-[62vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(40,90,255,0.11), transparent)",
        }}
      />
    </div>
  );
}
