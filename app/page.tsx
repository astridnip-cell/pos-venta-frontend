import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight, Instagram, Facebook, Music } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ReviewCard } from "@/components/review-card";
import { CommitmentSection } from "../components/commitment-section";
import { FeaturedProduct } from "../components/featured-product";
import { getProducts, getStrapiMedia } from "../lib/strapi";

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
  const [womenRes, menRes, accessoriesRes, mainFeaturedRes] = await Promise.all([
    getProducts({ category: "mujer", limit: 2, sort: "createdAt:desc" }),
    getProducts({ category: "hombre", limit: 2, sort: "createdAt:desc" }),
    getProducts({ category: "accesorios", limit: 2, sort: "createdAt:desc" }),
    getProducts({ featured: true, limit: 1 })
  ]);

  const womenProducts: Product[] = womenRes?.data || [];
  const menProducts: Product[] = menRes?.data || [];
  const accessoriesProducts: Product[] = accessoriesRes?.data || [];
  const mainProduct = mainFeaturedRes?.data?.[0];

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
            <h1 className="text-5xl font-bold tracking-tight sm:text-4xl md:text-7xl">
              Ropa personalizada Diseñada Para{" "}
              <span className="bg-fuchsia-500 text-white px-2 py-1 rounded-xl">Tu Estilo</span>
            </h1>
            <p className="mt-4 max-w-[900px] text-gray-700 text-lg">
              Cada prenda está confeccionada con los mejores materiales,
              diseñada para máximo confort, estilo y durabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 relative w-full h-[600px] sm:h-[800px] rounded-3xl overflow-hidden bg-white shadow-lg">
              <Image
                src={getStrapiMedia(mainProduct?.image?.url) || "/modelo.png"}
                alt={mainProduct?.name || "Producto destacado"}
                fill
                priority
                className="object-contain object-center" 
              />
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
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link href="/mujer"><Button className="rounded-full px-6">Ver sección Mujer <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
            <Link href="/hombre"><Button className="rounded-full px-6">Ver sección Hombre <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
            <Link href="/accesorios"><Button className="rounded-full px-6">Ver sección Accesorios <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>

      {/* Featured In Section */}
      <section className="bg-[#0b132b] py-12 px-2 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-semibold tracking-wider uppercase mb-12 text-gray-100">Destacado en</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
            {[
              { name: "VOGUE", font: "Didot, serif", desc: "Revista de moda" },
              { name: "GQ", font: "Impact, sans-serif", desc: "Estilo masculino" },
              { name: "ELLE", font: "Georgia, serif", desc: "Tendencias de moda" },
              { name: "Esquire", font: "Times New Roman, serif", desc: "Moda contemporánea" }
            ].map((brand) => (
              <div key={brand.name} className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-4xl sm:text-5xl font-bold text-white mb-2" style={{ fontFamily: brand.font }}>{brand.name}</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">{brand.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CommitmentSection />
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

      <FeaturedProduct
        title="Edición Limitada Signature"
        description="Algodón orgánico premium con acabados hechos a mano."
        price={150000}
        salePrice={120000}
        features={["100% Algodón Colombiano", "Tintes Ecológicos", "Costura Reforzada"]}
      />

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