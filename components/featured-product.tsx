import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, ShoppingCart, Sparkles, Truck } from "lucide-react";

import { formatCOP } from "../lib/format";

/**
 * Sección de producto destacado de la página de inicio.
 * Muestra un producto real de Strapi (marcado como "destacado") en una tarjeta
 * grande: foto, categoría, precio con descuento, tallas, colores y stock.
 */
export function FeaturedProduct({
  title,
  description,
  category,
  categoryHref,
  price,
  salePrice,
  sizes = [],
  colors = [],
  stock,
  imageSrc,
  href,
}: {
  title: string;
  description: string;
  category?: string;
  /** Página de la categoría, solo si existe en el menú (ej. /mujer) */
  categoryHref?: string;
  /** Precio normal (o precio original si hay descuento) */
  price: number;
  /** Precio con descuento, si lo hay */
  salePrice?: number;
  sizes?: string[];
  colors?: string[];
  stock: number;
  imageSrc: string;
  /** Página del producto, por ejemplo /producto/gorra */
  href: string;
}) {
  const hasDiscount = !!salePrice && salePrice < price;
  const displayPrice = hasDiscount ? salePrice! : price;
  const discount = hasDiscount ? Math.round(((price - salePrice!) / price) * 100) : 0;
  const lowStock = stock > 0 && stock <= 5;

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl border bg-gray-50 shadow-sm">
          {/* Foto */}
          <Link href={href} className="group relative block min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] bg-gray-100">
            <Image
              src={imageSrc}
              alt={title}
              fill
              unoptimized
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 rounded-full bg-black px-3 py-1 text-xs font-bold text-white">
                -{discount}%
              </span>
            )}
          </Link>

          {/* Información */}
          <div className="flex flex-col justify-center gap-6 p-6 sm:p-10 lg:p-14">
            <div>
              {/* Etiqueta principal de la sección */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-white shadow-md">
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                  Producto destacado
                </span>
                {category && (
                  <span className="text-sm font-medium uppercase tracking-widest text-gray-500">{category}</span>
                )}
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">{title}</h2>
              {description && <p className="mt-4 text-gray-600 md:text-lg">{description}</p>}
            </div>

            {/* Datos del producto */}
            <div className="flex flex-wrap gap-2">
              {sizes.length > 0 && (
                <span className="rounded-full border bg-white px-3 py-1.5 text-sm text-gray-700">
                  Tallas: <strong className="font-semibold">{sizes.join(" · ")}</strong>
                </span>
              )}
              {colors.length > 0 && (
                <span className="rounded-full border bg-white px-3 py-1.5 text-sm text-gray-700">
                  Colores: <strong className="font-semibold">{colors.join(", ")}</strong>
                </span>
              )}
              {stock > 0 ? (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm ${
                    lowStock ? "bg-red-50 text-red-700 font-semibold" : "border bg-white text-gray-700"
                  }`}
                >
                  {lowStock && <Flame className="h-4 w-4" />}
                  {lowStock
                    ? `¡Solo quedan ${stock} ${stock === 1 ? "unidad" : "unidades"}!`
                    : `${stock} unidades disponibles`}
                </span>
              ) : (
                <span className="rounded-full bg-gray-200 px-3 py-1.5 text-sm text-gray-700">Agotado por ahora</span>
              )}
            </div>

            {/* Precio y botones */}
            <div className="border-t pt-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">{formatCOP(displayPrice)}</span>
                {hasDiscount && <span className="text-lg text-gray-500 line-through">{formatCOP(price)}</span>}
              </div>
              {hasDiscount && (
                <p className="mt-1 text-sm font-medium text-green-700">
                  Ahorras {formatCOP(price - displayPrice)}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={href}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {stock > 0 ? "Comprar ahora" : "Ver producto"}
                </Link>
                {category && categoryHref && (
                  <Link
                    href={categoryHref}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-gray-300 bg-white px-6 text-sm font-semibold text-gray-900 transition-colors hover:border-black"
                  >
                    Ver más de {category}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>

              <p className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                <Truck className="h-4 w-4" /> Envío gratis en compras desde $150.000
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
