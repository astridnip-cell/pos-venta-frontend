import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ChevronRight,
  Instagram,
  Facebook,
  Music,
  Truck,
  ShieldCheck,
  PackageSearch,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ReviewCard } from "@/components/review-card";
import { CommitmentSection } from "../components/commitment-section";
import { FeaturedProduct } from "../components/featured-product";
import { getCurrentCover, getProducts, getStrapiMedia, toList } from "../lib/strapi";

// Beneficios reales de la tienda (se muestran debajo de la portada)
const BENEFITS = [
  { icon: Truck, title: "Envíos a toda Colombia", desc: "Gratis desde $150.000" },
  { icon: ShieldCheck, title: "Pago seguro", desc: "Precios validados al pagar" },
  { icon: PackageSearch, title: "Sigue tu pedido", desc: "Estado en Mis pedidos" },
  { icon: Search, title: "Encuentra rápido", desc: "Buscador con sugerencias" },
];

interface Product {
  id: number;
  name: string;
  price: number;
  slug: string;
  image: {
    url: string;
  } | null;
}

export default async function Home() {
  const [womenRes, menRes, accessoriesRes, mainFeaturedRes, cover] = await Promise.all([
    getProducts({ category: "mujer", limit: 2, sort: "createdAt:desc" }),
    getProducts({ category: "hombre", limit: 2, sort: "createdAt:desc" }),
    getProducts({ category: "accesorios", limit: 2, sort: "createdAt:desc" }),
    getProducts({ featured: true, limit: 2 }),
    // Portada de la semana (sección "Portadas" del panel de administración)
    getCurrentCover(),
  ]);

  const womenProducts: Product[] = womenRes?.data || [];
  const menProducts: Product[] = menRes?.data || [];
  const accessoriesProducts: Product[] = accessoriesRes?.data || [];
  const mainProduct = mainFeaturedRes?.data?.[0];
  // Sección "Producto destacado": el segundo destacado (o el primero si solo hay uno)
  const spotlight = mainFeaturedRes?.data?.[1] ?? mainProduct;
  const spotlightSizes = toList(spotlight?.sizes);
  const spotlightColors = toList(spotlight?.colors);
  const spotlightOriginal = Number(spotlight?.originalPrice) || 0;
  const spotlightPrice = Number(spotlight?.price) || 0;

  const recentProducts: Product[] = [
  menProducts[0], womenProducts[0], accessoriesProducts[0],
  menProducts[1], womenProducts[1], accessoriesProducts[1]
  ].filter(Boolean);

  if (recentProducts.length === 0) {
    return (
      <div className="container p-16 text-center">
        <p className="text-gray-500 italic">Cargando colección de moda...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-16">
          <div className="flex flex-col items-center text-center mb-20">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Ropa personalizada Diseñada Para{" "}
              {/* inline-block + nowrap: "Tu Estilo" nunca se parte en dos renglones */}
              <span className="inline-block whitespace-nowrap bg-fuchsia-500 text-white px-2 py-1 rounded-xl">
                Tu Estilo
              </span>
            </h1>
            <p className="mt-4 max-w-[900px] text-gray-700 text-lg">
              Cada prenda está confeccionada con los mejores materiales,
              diseñada para máximo confort, estilo y durabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 relative w-full h-[600px] sm:h-[800px] rounded-3xl overflow-hidden bg-white shadow-lg">
              {/* Foto principal: la portada de la semana; si no hay, el producto destacado */}
              <Image
                src={
                  cover?.image?.url
                    ? getStrapiMedia(cover.image.url)
                    : getStrapiMedia(mainProduct?.image?.url) || "/modelo.png"
                }
                alt={cover?.title || mainProduct?.name || "Producto destacado"}
                fill
                priority
                className={cover?.image?.url ? "object-cover object-center" : "object-contain object-center"}
              />
              {cover?.title && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 sm:p-8">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{cover.title}</p>
                  {cover.subtitle && (
                    <p className="mt-1 text-sm sm:text-base text-white/90">{cover.subtitle}</p>
                  )}
                </div>
              )}
            </div>

            <div className="md:col-span-5 flex flex-col justify-center items-center text-center space-y-6 px-4 sm:px-8">
              <div className="w-full">
                <h3 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">15k+</h3>
                <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">Clientes satisfechos</p>
              </div>
              <hr className="border-gray-200 w-full" />
              <div className="w-full">
                <h3 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">400k+</h3>
                <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">Productos vendidos</p>
              </div>
              <hr className="border-gray-200 w-full" />
              <div className="w-full">
                <h3 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">98%</h3>
                <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">Valoraciones positivas</p>
              </div>

              <div className="flex gap-4 w-full justify-center pt-4">
                <Link href="/carrito" className="flex-1">
                  <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-full h-12">
                    Comprar Ahora
                  </Button>
                </Link>
                <Link href={`/producto/${mainProduct?.slug || ""}`}>
                  <Button variant="outline" className="rounded-full h-12 px-8">
                    Ver detalles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios reales de la tienda, justo debajo de la portada */}
      <section className="pb-8 md:pb-10">
        <div className="container px-4 md:px-16">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 rounded-3xl bg-black p-3">
            {BENEFITS.map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-white/25 bg-black p-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white text-black">
                  <item.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{item.title}</span>
                  <span className="block text-xs text-gray-300">{item.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cuadrícula de Colección */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center items-center mb-12">
            <h2 className="text-3xl font-bold text-center w-full">
              Hecho por Nosotros, Perfeccionado Por Ti
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProducts.map((product) => (
              <ProductCard
                id={product.id}
                key={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.price}
                imageSrc={getStrapiMedia(product.image?.url)}
                href={`/producto/${product.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Producto destacado real de Strapi (se marca como "featured" en el panel o en Strapi) */}
      {spotlight && (
        <FeaturedProduct
          title={spotlight.name}
          description={spotlight.description || ""}
          category={spotlight.category?.name}
          categoryHref={
            ["hombre", "mujer", "accesorios", "ofertas"].includes(spotlight.category?.slug)
              ? `/${spotlight.category.slug}`
              : undefined
          }
          price={spotlightOriginal > spotlightPrice ? spotlightOriginal : spotlightPrice}
          salePrice={spotlightOriginal > spotlightPrice ? spotlightPrice : undefined}
          sizes={spotlightSizes}
          colors={spotlightColors}
          stock={Number(spotlight.stock) || 0}
          imageSrc={getStrapiMedia(spotlight.image?.url)}
          href={`/producto/${spotlight.slug}`}
        />
      )}

      {/* Comprometidos con la calidad y la sostenibilidad */}
      <CommitmentSection />

      {/* Moda con raíces colombianas: colecciones + ciudades de inspiración + beneficios reales de la tienda */}
      <section className="bg-[#0b132b] py-14 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Hecho para Colombia</p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-wider uppercase text-gray-100">
              Moda con raíces colombianas
            </h2>
            <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
              Cuatro colecciones inspiradas en las ciudades con más tradición textil del país.
            </p>
          </div>

          {/* Colecciones, cada una con su ciudad de inspiración */}
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { href: "/hombre", name: "Hombre", city: "Bogotá", desc: "Sastrería y abrigos para la ciudad" },
              { href: "/mujer", name: "Mujer", city: "Medellín", desc: "Diseño fresco de la capital de la moda" },
              { href: "/accesorios", name: "Accesorios", city: "Cali", desc: "Detalles con ritmo y color" },
              { href: "/ofertas", name: "Ofertas", city: "Barranquilla", desc: "Precios especiales de temporada" },
            ].map((col) => (
              <Link
                key={col.href}
                href={col.href}
                className="group flex flex-col p-5 sm:p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/30 transition-colors"
              >
                <span className="text-[11px] text-gray-400 uppercase tracking-widest">Inspiración {col.city}</span>
                <span className="mt-3 text-3xl xl:text-4xl font-bold text-white break-words" style={{ fontFamily: "Georgia, serif" }}>
                  {col.name}
                </span>
                <span className="mt-2 text-xs sm:text-sm text-gray-400">{col.desc}</span>
                <span className="mt-auto pt-4 inline-flex items-center text-xs font-semibold uppercase tracking-widest text-white">
                  Ver colección
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ReviewCard name="María G." rating={5} comment="Las camisetas son increíblemente suaves y el diseño es justo lo que buscaba." />
            <ReviewCard name="Carlos R." rating={5} comment="Excelente calidad en los jeans. El envío a Bogotá fue muy rápido." />
            <ReviewCard name="Laura M." rating={4} comment="Me encantó la sudadera, el color es idéntico a la foto de la web." />
            <ReviewCard name="David S." rating={5} comment="Atención al cliente de 10. Recomiendo mucho la marca." />
          </div>
        </div>
      </section>

      {/* Sección de Redes Sociales con Colorido Propio */}
      <section className="py-12 border-t border-gray-100">
        <div className="container px-4 text-center">
          <p className="text-sm text-gray-500 font-semibold uppercase tracking-[0.2em] mb-8">
            Síguenos en
          </p>
          <div className="flex justify-center items-center gap-6 sm:gap-10">
            {/* Instagram */}
            <Link href="https://instagram.com" target="_blank" className="group flex flex-col items-center gap-2">
              <div className="p-3.5 rounded-full bg-pink-50 border border-pink-100 group-hover:bg-pink-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                <Instagram className="w-6 h-6 text-pink-600" />
              </div>
            </Link>

            {/* Facebook */}
            <Link href="https://facebook.com" target="_blank" className="group flex flex-col items-center gap-2">
              <div className="p-3.5 rounded-full bg-blue-50 border border-blue-100 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300 shadow-sm">
                <Facebook className="w-6 h-6 text-blue-600" />
              </div>
            </Link>

            {/* TikTok */}
            <Link href="https://tiktok.com" target="_blank" className="group flex flex-col items-center gap-2">
              <div className="p-3.5 rounded-full bg-gray-100 border border-gray-200 group-hover:bg-gray-200 group-hover:scale-110 transition-all duration-300 shadow-sm">
                <Music className="w-6 h-6 text-gray-900" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
