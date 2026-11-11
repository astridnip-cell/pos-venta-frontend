"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface Props {
  product: {
    documentId: string;
    name: string;
    price: number;
    imageSrc: string;
    slug: string;
    sizes: string[];
    colors: string[];
    stock: number;
  };
}

// Selector de talla, color y cantidad + botón para agregar al carrito
export function AddToCartForm({ product }: Props) {
  const { addToCart } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const maxQuantity = Math.min(20, product.stock);
  const outOfStock = product.stock <= 0;

  const handleAdd = () => {
    setError("");
    if (product.sizes.length > 0 && !size) return setError("Elige una talla.");
    if (product.colors.length > 0 && !color) return setError("Elige un color.");

    addToCart({
      documentId: product.documentId,
      name: product.name,
      price: product.price,
      imageSrc: product.imageSrc,
      slug: product.slug,
      size,
      color,
      quantity,
    });
    setAdded(true);
  };

  const optionClass = (selected: boolean) =>
    `px-4 py-2 border rounded-md text-sm transition-colors ${
      selected ? "bg-black text-white border-black" : "hover:border-black"
    }`;

  return (
    <div className="space-y-5">
      {product.sizes.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Talla</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                className={optionClass(size === s)}
                onClick={() => {
                  setSize(s);
                  setAdded(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Color</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                className={optionClass(color === c)}
                onClick={() => {
                  setColor(c);
                  setAdded(false);
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-sm font-medium mb-2">Cantidad</p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1 || outOfStock}
          >
            <Minus className="h-3 w-3" />
            <span className="sr-only">Reducir cantidad</span>
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
            disabled={quantity >= maxQuantity || outOfStock}
          >
            <Plus className="h-3 w-3" />
            <span className="sr-only">Aumentar cantidad</span>
          </Button>
          <span className="text-sm text-gray-500 ml-2">
            {outOfStock ? "Agotado" : `${product.stock} disponibles`}
          </span>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <Button
          className="flex-1 bg-black text-white hover:bg-gray-800 rounded-full h-12"
          onClick={handleAdd}
          disabled={outOfStock}
        >
          {outOfStock ? "Agotado" : "Añadir al carrito"}
        </Button>
        {added && (
          <Button variant="outline" className="rounded-full h-12" asChild>
            <Link href="/carrito">
              <Check className="h-4 w-4 mr-1" /> Ver carrito
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
