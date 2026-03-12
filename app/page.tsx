import Image from "next/image";
<<<<<<< HEAD
import { Star, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatsSection } from "@/components/stats-section";
import { ProductCard } from "@/components/product-card";
import { ReviewCard } from "@/components/review-card";
import { FeaturedInSection } from "../components/featured-in-section";
import { CommitmentSection } from "../components/commitment-section";
import { FeaturedProduct } from "../components/featured-product";

import { getProducts, getStrapiMedia, type Product } from "../lib/strapi";
// 1. Rigor de TypeScript: Definición de Interfaces
interface StrapiImage {
  url: string;
}

interface Product {
  id: string | number;
  name: string;
  price: number;
  slug: string;
  image?: {
    url: string;
  };
}

export default async function Home() {
  // 2. Obtención de datos con fallback para evitar errores de renderizado
  const response = await getProducts({
    featured: true,
    limit: 6,
  });

  const featuredProducts: Product[] = response?.data || [];
  // Si no hay productos, mostramos un estado vacío o un mensaje para evitar que la página rompa
  if (featuredProducts.length === 0) {
    return <div className="container p-16 text-center">Cargando colección...</div>;
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
            {/* Avatars clientes */}
            <div className="md:col-span-1 flex md:flex-col items-center gap-2 ">
              <div className="flex md:flex-col gap-1">
                {[1, 2, 3].map((i) => (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white" key={i}>
                    <Image
                      src={`/placeholder.svg?height=32&width=32&text=${i}`}
                      width={32}
                      height={32}
                      alt={`Cliente ${i}`}
                      className="object-cover rounded-full"
                    />
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-500">Clientes Satisfechos</span>
            </div>

            {/* Imagen principal - Protección contra índices inexistentes */}
            <div className="md:col-span-6 relative">
              <Image
                src={getStrapiMedia(featuredProducts[0]?.image?.url)}
                alt={featuredProducts[0]?.name || "Producto destacado"}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-auto"
                priority // Carga prioritaria por ser la imagen principal
              />
            </div>

            {/* Opciones de productos */}
            <div className="md:col-span-5 space-y-4">
              {/* Producto 1 */}
              <div className="flex items-center gap-4 border rounded-lg p-3">
                <Image
                  src={getStrapiMedia(featuredProducts[1]?.image?.url) || "/placeholder.svg"}
                  width={100}
                  height={100}
                  alt="Camisetas premium"
                  className="rounded-full object-cover w-20 h-20"
                />
                <div className="flex-1">
                  <h3 className="font-medium">Camisetas Premium</h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">$130.000 COP</p>
                </div>
              </div>

              {/* Producto 2 */}
              <div className="flex items-center gap-4 border rounded-lg p-3">
                <Image
                  src={getStrapiMedia(featuredProducts[2]?.image?.url) || "/placeholder.svg"}
                  width={100}
                  height={100}
                  alt="Sudaderas Premium"
                  className="rounded-full object-cover w-20 h-20"
                />
                <div className="flex-1">
                  <h3 className="font-medium">Sudaderas Premium</h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">$150.000 COP</p>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="rounded-full px-6 bg-black text-white hover:bg-gray-900 flex items-center gap-2">
                  Ver colección
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Seccion hecho por nosotros */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Hecho por Nosotros, Perfeccionado Por Ti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.slice(0, 3).map((product: Product) => (
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

      {/* Sección reseñas */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Reseñas de nuestros clientes satisfechos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ReviewCard name="María G." rating={5} comment="Las camisetas son increíblemente suaves..." />
            <ReviewCard name="Carlos R." rating={5} comment="Los jeans son perfectos en ajuste." />
            <ReviewCard name="Laura M." rating={4} comment="El servicio al cliente es excelente." />
            <ReviewCard name="David S." rating={4} comment="Las sudaderas son muy cómodas." />
          </div>
        </div>
      </section>

      {/* Productos destacados detalle */}
      <FeaturedProduct
        title="Camiseta Signature"
        description="Algodón orgánico de la más alta calidad."
        price={34.99}
        salePrice={29.99}
        features={["100% algodón orgánico", "Tintes naturales"]}
      />

      <section className="py-12 md:py-24 bg-gray-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl/tight">La moda reimaginada. Por Ti.</h2>
              <Button className="mt-6 bg-green-500 hover:bg-green-600">Explorar Colección</Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=800"
                alt="Colección"
                width={800}
                height={500}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
=======
import { Star, ChevronRight} from "lucide-react";

import { Button } from "@/components/ui/button"
import { StatsSection } from "@/components/stats-section";
import { getProducts, getStrapiMedia, type Product } from "../lib/strapi";
//Esta es la página principal
export default function Home() {
  return (
  <main className="flex flex-col min-h-screen">
    {/* Hero Section */}
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-16">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ropa personalizada diseñada para<span className="bg-pink-600 px-1">Tu Estilo</span>
          </h1>
          <p className="mt-4 max-w-[700px] text-gray-500 text-sm">Cada prenda está confeccionada con los mejores materiales, diseñada para máximo confort, estilos y durabilidad - lo que necesitas para expresar tu estilo único
          </p>
        </div>
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* Avatar clientes */}
          <div className="md:col-span-1 flex md:flex-col items-center gap-2">
            <div className="flex md:flex gap-1">
              {[1, 2, 3].map((i) => (
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white" key={i}>
                <Image
                  src={"/imagen_principal.png"}
                  alt={`Clientes ${i}`}
                  width={32}
                  height={32}
                  className="object-cover rounded-full"
                  />
                </div>
              ))}
          </div>
          <span className="tex-xs text text-gray-500">Clientes satisfechos
          </span>
        </div>

        {/* Imagen principal */}
        <div className="md:col-span-6 relative">
          <Image
            src="/modelo.png"
            alt="Colección destacada"
            width={800}
            height={600}
            className="rounded-lg object-cover w-full"
          />
        </div>

        {/* Opciones de productos */}
        <div className="md:col-span-5 space-y-4">
          { /* productos 1 */ }
          <div className="flex items-center gap-4 border rounded-lg p-3">
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
            <Image
              src="/camiseta_premium.jpg"
              alt="Camisetas Premium"
              width={100}
              height={100}
              className="object-cover rounded-full w-full h-full"
            />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Camisetas Premium</h3>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star  
                  key={i} 
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">$130.000COP</p>
            </div>
          </div>
          { /* productos 2 */ }
          <div className="flex items-center gap-4 border rounded-lg p-3">
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
            <Image
              src="/sudadera_Premium.jpg"
              alt="Sudaderas Premium"
              width={100}
              height={100}
              className="object-cover rounded-full w-full h-full"
            />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Sudaderas Premium</h3>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star  
                  key={i} 
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">$150.000COP</p>
            </div>
          </div>
          
          { /* Botón de compra */ }
          <div className="flex justify-end mt-6">
            <button className="roundend-full px-6 bg-black text-white hover:bg-green-800 flex items-center gap-2">
      
              Ver colección
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center ml-1">
                <ChevronRight className="w-4 h-4"/>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
   </section>

   <StatsSection />

   {/* sECTION HECHO POR NOSOTROS */}
  </main>
  )
>>>>>>> 00666b49f175c8eaa3f16ef937363337986796c4
}