import Link from "next/link";
import { ShieldCheck, Truck } from "lucide-react";

/** Barra negra delgada arriba del menú, con los beneficios de comprar en Velora. */
export function AnnouncementBar() {
  return (
    <div className="bg-black text-white text-xs sm:text-sm">
      <div className="px-4 py-2 flex items-center justify-center gap-x-6 gap-y-1 flex-wrap text-center">
        <span className="inline-flex items-center gap-1.5">
          <Truck className="h-4 w-4" />
          <strong className="font-semibold">Envío gratis</strong> en compras desde $150.000
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-white/80">
          <ShieldCheck className="h-4 w-4" /> Pago seguro
        </span>
        <Link href="/ofertas" className="hidden md:inline underline underline-offset-4 hover:text-white/80">
          Ver ofertas de la semana
        </Link>
      </div>
    </div>
  );
}
