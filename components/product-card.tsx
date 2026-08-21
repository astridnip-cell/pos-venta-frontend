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
  href,
}: {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  imageSrc: string;
  href?: string;
}) {
  const { addToCart } = useCart();

  const CardContent = () => (
    <div className="group relative overflow-hidden rounded-[30px] border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative h-72 w-full overflow-hidden bg-gray-50 rounded-t-[30px] flex items-center justify-center p-2">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-3 right-3 h-9 w-9 rounded-full z-20 shadow-md"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            addToCart({ id, name, price, imageSrc });
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Añadir al carrito</span>
        </Button>
      </div>

      <div className="p-4 text-center">
        <h3 className="font-medium text-gray-900 truncate">{name}</h3>
        <p className="font-bold text-gray-900 mt-1">${price.toFixed(2)}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}