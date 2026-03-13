import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatsSection } from "@/components/stats-section";
import { ProductCard } from "@/components/product-card";
import { ReviewCard } from "@/components/review-card";
import { FeaturedInSection } from "../components/featured-in-section";
import { CommitmentSection } from "../components/commitment-section";
import { FeaturedProduct } from "../components/featured-product";
import { getProducts, getStrapiMedia} from "../lib/strapi";

/**
 * 1. Definición de Interfaz Local
 * Esto evita el error de "Type Product is not assignable" al no chocar 
 * con las importaciones externas.
 */
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
  /**
   * 2. Obtención de datos desde Strapi
   * Usamos el operador de encadenamiento opcional (?.) para mayor seguridad.
   */
  const response = await getProducts({
    featured: true,
    limit: 6,
  });

  const featuredProducts: Product[] = response?.data || [];

  // Estado de carga/vacío en caso de que Strapi no devuelva productos
  if (featuredProducts.length === 0) {
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
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ropa personalizada Diseñada Para{" "}
              <span className="bg-yellow-300 px-1">Tu Estilo</span>
            </h1>
            <p className="mt-4 max-w-[700px] text-gray-500 text-sm">
              Cada prenda está confeccionada con los mejores materiales,
              diseñada para máximo confort, estilo y durabilidad.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-center">
            {/* Imagen Principal (Primer producto de Strapi) */}
            <div className="md:col-span-7 relative">
              <Image
                src={getStrapiMedia(featuredProducts[0]?.image?.url)}
                alt={featuredProducts[0]?.name || "Producto destacado"}
                width={800}
                height={500}
                className="rounded-lg object-cover w-full h-[400px] shadow-2xl"
                priority 
              />
            </div>

            {/* Detalles del producto destacado */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <h2 className="text-3xl font-bold">{featuredProducts[0]?.name}</h2>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">(4.8/5 reseña)</span>
                </div>
              </div>
              
              <p className="text-2xl font-bold text-green-700">
                ${featuredProducts[0]?.price?.toLocaleString()} COP
              </p>
              
              <div className="flex gap-4">
                <Button className="flex-1 bg-black text-white hover:bg-gray-800 rounded-full h-12">
                  Comprar Ahora
                </Button>
                <Button variant="outline" className="rounded-full h-12 px-8">
                  Ver detalles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      
      {/* Cuadrícula de Colección */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Hecho por Nosotros, Perfeccionado Por Ti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                imageSrc={getStrapiMedia(product.image?.url)}
                href={`/producto/${product.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <FeaturedInSection />
      <CommitmentSection />

      {/* Reseñas de Clientes */}
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
    </main>
  );
}