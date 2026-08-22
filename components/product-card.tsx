"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  imageSrc,
  href = "#",
}: {
  id: number;
  name: number | string; // por si acaso
  price: number;
  originalPrice?: number | null;
  imageSrc: string;
  href?: string;
}) {
  const { addToCart } = useCart();

  return (
    <div className="group relative overflow-hidden rounded-[30px] border bg-white shadow-sm transition-all hover:shadow-md flex flex-col">
      {/* Contenedor de la imagen con enlace opcional */}
      <Link href={href} className="relative h-72 w-full overflow-hidden bg-gray-50 rounded-t-[30px] flex items-center justify-center p-2 block">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={String(name)}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Botón flotante del carrito absolutamente seguro */}
      <Button
        size="icon"
        variant="secondary"
        className="absolute top-4 right-4 h-9 w-9 rounded-full z-30 shadow-md bg-black text-white hover:bg-gray-800"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart({ id, name: String(name), price, imageSrc });
          console.log("¡Añadido al carrito con éxito!", { id, name });
        }}
      >
        <ShoppingCart className="h-4 w-4" />
        <span className="sr-only">Añadir al carrito</span>
      </Button>

      {/* Información del producto con enlace al detalle */}
      <div className="p-4 text-center flex-1 flex flex-col justify-between">
        <Link href={href}>
          <h3 className="font-medium text-gray-900 truncate hover:underline">{name}</h3>
        </Link>
        <p className="font-bold text-gray-900 mt-1">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}