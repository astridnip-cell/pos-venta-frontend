"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toList } from "@/lib/strapi";
import { formatCOP, formatDiscount } from "@/lib/format";

export function ProductCard(props: any) {
  const product = props.product || props;
  const router = useRouter();

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

  // Enlace a la página de detalle (/producto/[slug])
  const detailHref: string | null = product.slug
    ? `/producto/${product.slug}`
    : props.href?.startsWith("/producto/")
    ? props.href
    : null;

  // Descuento: solo si el precio original es mayor que el precio actual (ej: "-25%")
  const discountLabel = formatDiscount(Number(product.originalPrice) || 0, Number(product.price) || 0);

  // Si el producto tiene tallas o colores, se elige en la página de detalle
  const needsOptions =
    toList(product.sizes).length > 0 || toList(product.colors).length > 0;

  const handleAddToCart = () => {
    if ((needsOptions || !product.documentId) && detailHref) {
      router.push(detailHref);
      return;
    }
    addToCart({
      documentId: product.documentId,
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      imageSrc: imageUrl,
      slug: product.slug,
    });
  };

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

        {/* Clic en la imagen: abre el detalle del producto */}
        {detailHref && (
          <Link
            href={detailHref}
            className="absolute inset-0"
            aria-label={`Ver ${product.name || "producto"}`}
          />
        )}

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
            handleAddToCart();
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
          {detailHref ? (
            <Link href={detailHref}>{product.name || "Producto sin nombre"}</Link>
          ) : (
            product.name || "Producto sin nombre"
          )}
        </h3>
        <div className="flex items-baseline gap-2 flex-wrap">
          <p className="text-gray-900 font-bold text-xl">
            {formatCOP(Number(product.price) || 0)}
          </p>
          {discountLabel && (
            <>
              <span className="text-sm text-gray-500 line-through">
                {formatCOP(Number(product.originalPrice))}
              </span>
              <span className="text-xs font-semibold text-red-600">{discountLabel}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}