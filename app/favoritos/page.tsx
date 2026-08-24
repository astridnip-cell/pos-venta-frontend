"use client";

import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";

export default function FavoritosPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-8 w-8 text-red-500 fill-red-500" />
        <h1 className="text-3xl font-bold text-gray-900">Mi Lista de Deseos</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p className="text-gray-600 text-lg mb-4">Tu lista de deseos está vacía.</p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-black/80 transition-colors"
          >
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product: any) => (
            <div key={product.id} className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 group">
              {/* Tarjeta de producto */}
              <div className="flex-1">
                <ProductCard product={product} />
              </div>

              {/* Papelera */}
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Guardado en deseos</span>
                
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors flex items-center justify-center"
                  title="Eliminar de favoritos"
                  aria-label="Eliminar de favoritos"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}