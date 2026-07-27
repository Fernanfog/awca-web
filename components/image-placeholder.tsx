import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hueco elegante para una imagen futura (se ve intencional, no roto).
 * Reemplazar luego por <Image /> cuando tengamos la foto.
 */
export function ImagePlaceholder({
  className,
  label = "Espacio para imagen",
  ratio,
}: {
  className?: string;
  label?: string;
  ratio?: string;
}) {
  return (
    <div
      className={cn(
        "surface relative flex items-center justify-center overflow-hidden rounded-3xl",
        className
      )}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <div className="soft-glow pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-50" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative flex flex-col items-center gap-3 text-ink-400">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink-900/8 bg-white">
          <ImageIcon size={22} />
        </span>
        <span className="text-xs font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
    </div>
  );
}
