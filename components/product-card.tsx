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
  imageSrc,
  href = "#",
}: {
  id: number | string;
  name: string;
  price: number;
  imageSrc: string;
  href?: string;
}) {
  const { addToCart } = useCart();

  return (
    <div className="relative overflow-hidden rounded-[30px] border bg-white shadow-sm transition-all hover:shadow-md flex flex-col">
      
      <div className="relative h-72 w-full bg-gray-50 rounded-t-[30px] flex items-center justify-center p-2">
        
        
        <Link href={href} className="group absolute inset-0 overflow-hidden flex items-center justify-center">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Botón flotante independiente */}
        <div className="absolute top-4 right-4 z-50">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full shadow-md bg-black text-white hover:bg-black/80 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              
              addToCart({
                id: Number(id),
                name,
                price,
                imageSrc,
              });
              
              console.log("Producto agregado correctamente:", { id, name, price });
            }}
          >
            <ShoppingCart className="h-4 w-4 pointer-events-none" />
            <span className="sr-only">Añadir al carrito</span>
          </Button>
        </div>
      </div>

      <div className="p-4 text-center flex-1 flex flex-col justify-between">
        <Link href={href}>
          <h3 className="font-medium text-gray-900 truncate hover:underline">{name}</h3>
        </Link>
        <p className="font-bold text-gray-900 mt-1">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}