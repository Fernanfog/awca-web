import Image from "next/image";
import { cn } from "@/lib/utils";

/* Logo AWCA: la marca real (W en órbita) blanca sobre pastilla azul (lockup
   del brandbook) + wordmark. `tone` ajusta el color del texto. */
export function AwcaLogo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[radial-gradient(125%_130%_at_50%_120%,#2a3bff_0%,#0e1a9c_45%,#060a44_100%)] shadow-[0_0_20px_-4px_rgba(43,59,255,0.85)]">
        <Image
          src="/logo-mark.png"
          alt="AWCA"
          width={228}
          height={92}
          priority
          className="w-5"
        />
      </span>
      <span
        className={cn(
          "text-lg font-extrabold tracking-[0.1em]",
          tone === "dark" ? "text-blanco" : "text-tinta-900"
        )}
      >
        AWCA
      </span>
    </span>
  );
}
