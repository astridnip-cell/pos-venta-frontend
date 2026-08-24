"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function ProductCard(props: any) {
  const product = props.product || props;

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  
  const productId = product?.id ?? 0;
  const isFavorite = isInWishlist(productId);

  // Lógica segura para extraer la URL de la imagen y anteponer el servidor de Strapi si es necesario
  let imageUrl = "/placeholder.svg";
  const rawImage = product.imageSrc || product.image || product.imageUrl;

  if (typeof rawImage === "string") {
    imageUrl = rawImage.startsWith("/uploads") 
      ? `http://localhost:1337${rawImage}` 
      : rawImage;
  } else if (rawImage?.url) {
    imageUrl = rawImage.url.startsWith("/uploads") 
      ? `http://localhost:1337${rawImage.url}` 
      : rawImage.url;
  } else if (rawImage?.data?.attributes?.url) {
    const strapiUrl = rawImage.data.attributes.url;
    imageUrl = strapiUrl.startsWith("/uploads") 
      ? `http://localhost:1337${strapiUrl}` 
      : strapiUrl;
  }

  // Icono de carrito personalizado (con los dos puntos abajo)
  const CustomCartIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-current"
    >
      <path d="M6 6h15l-1.5 9H7.5L6 6Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="19" r="1" fill="currentColor"/>
      <circle cx="17" cy="19" r="1" fill="currentColor"/>
    </svg>
  );

  return (
    <div className="group border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Contenedor de la imagen y los iconos flotantes */}
      <div className="relative w-full h-60 mb-4 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.name || "Producto"}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          unoptimized // Útil para imágenes externas de Strapi en desarrollo
        />

        {/* 1. Botón de Favorito (Corazón) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm transition-all duration-200 ease-in-out active:scale-95"
          aria-label="Añadir a favoritos"
        >
          <Heart
            className={`h-5 w-5 transition-colors duration-300 ${
              isFavorite 
                ? "fill-red-500 text-red-500" 
                : "text-red-500 hover:fill-red-100"
            }`}
          />
        </button>

        {/* 2. Botón de Carrito (Icono personalizado abajo a la derecha) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-3 right-3 z-10 p-3 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black shadow-lg transition-all duration-200 ease-in-out hover:scale-110 active:scale-100"
          aria-label="Añadir al carrito"
        >
          <CustomCartIcon />
        </button>
      </div>

      {/* Información del producto */}
      <div className="flex flex-col flex-grow justify-end">
        <h3 className="font-medium text-lg text-gray-900 mb-1 truncate group-hover:text-black transition-colors">
          {product.name || "Producto sin nombre"}
        </h3>
        <p className="text-gray-900 font-bold text-xl">
          ${Number(product.price || 0).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}