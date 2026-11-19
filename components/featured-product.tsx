import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart } from "lucide-react";

import { formatCOP } from "../lib/format";

/**
 * Sección de producto destacado de la página de inicio.
 * Muestra un producto real de Strapi (marcado como "destacado"): su foto,
 * precio, descuento y algunas características, con enlace a su página.
 */
export function FeaturedProduct({
  title,
  description,
  price,
  salePrice,
  features,
  imageSrc,
  href,
  reversed = false,
}: {
  title: string;
  description: string;
  /** Precio normal (o precio original si hay descuento) */
  price: number;
  /** Precio con descuento, si lo hay */
  salePrice?: number;
  features: string[];
  imageSrc: string;
  /** Página del producto, por ejemplo /producto/gorra */
  href: string;
  reversed?: boolean;
}) {
  const hasDiscount = !!salePrice && salePrice < price;
  const displayPrice = hasDiscount ? salePrice! : price;
  const discount = hasDiscount ? Math.round(((price - salePrice!) / price) * 100) : 0;

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div
          className={`grid gap-6 lg:grid-cols-2 items-center ${
            reversed ? "lg:grid-flow-dense" : ""
          }`}
        >
          <div className={reversed ? "lg:col-start-2" : ""}>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Producto destacado</p>
            <h2 className="text-3xl font-bold mt-1">{title}</h2>
            {description && <p className="mt-4 text-gray-500 md:text-lg">{description}</p>}
            {features.length > 0 && (
              <div className="mt-6 space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{formatCOP(displayPrice)}</span>
                {hasDiscount && (
                  <span className="text-lg text-gray-500 line-through">{formatCOP(price)}</span>
                )}
              </div>
              <Button className="gap-2" asChild>
                <Link href={href}>
                  <ShoppingCart className="h-4 w-4" />
                  Comprar ahora
                </Link>
              </Button>
            </div>
          </div>
          <div className={reversed ? "lg:col-start-1" : ""}>
            <Link href={href} className="block relative rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={imageSrc}
                alt={title}
                width={800}
                height={600}
                unoptimized
                className="w-full object-cover aspect-[4/3]"
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                  OFERTA -{discount}%
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
