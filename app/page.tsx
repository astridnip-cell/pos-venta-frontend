import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsSection } from "@/components/stats-section";
import { ProductCard } from "@/components/product-card";
import ReviewCard from "@/components/review-card";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-16 mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ropa personalizada diseñada para <span className="bg-pink-600 px-1 text-white">Tu Estilo</span>
            </h1>
            <p className="mt-4 max-w-[700px] text-gray-500 text-sm">
              Cada prenda está confeccionada con los mejores materiales, diseñada para máximo confort, estilo y durabilidad.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-center">
            {/* Avatar clientes corregido */}
            <div className="md:col-span-1 flex md:flex-col items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white" key={i}>
                    <Image
                      src="/imagen_principal.png"
                      alt={`Clientes ${i}`}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-500 text-center">Clientes satisfechos</span>
            </div> {/* <-- Faltaba este cierre */}

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
              {/* Producto 1 */}
              <div className="flex items-center gap-4 border rounded-lg p-3">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/camiseta_premium.jpg" alt="Camisetas" width={64} height={64} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Camisetas Premium</h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="font-bold text-sm">$130.000</p>
              </div>

              {/* Producto 2 */}
              <div className="flex items-center gap-4 border rounded-lg p-3">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/sudadera_premium.jpg" alt="Sudaderas" width={64} height={64} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Sudaderas Premium</h3>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="font-bold text-sm">$150.000</p>
              </div>

              {/* Botón */}
              <div className="flex justify-end mt-6">
                <button className="rounded-full px-6 py-2 bg-black text-white hover:bg-gray-800 flex items-center gap-2 transition-colors">
                  Ver colección
                  <ChevronRight className="w-4 h-4 bg-white text-black rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Hecho por nosotros */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Hecho con ❤️ por un equipo apasionado
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard name="Camisetas Esenciales" price={130000} imageSrc="/camiseta_premium.jpg" href="#" />
            <ProductCard name="Camisetas Esenciales" price={130000} imageSrc="/camiseta_premium.jpg" href="#" />
            <ProductCard name="Camisetas Esenciales" price={130000} imageSrc="/camiseta_premium.jpg" href="#" />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Reseñas de nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ReviewCard 
              name="Juan Pérez" 
              comment="¡Excelente calidad!" 
              rating={5} 
            />
            <ReviewCard 
              name="María G." 
              comment="¡Se ajusta a mi estilo!" 
              rating={5} 
            />
            <ReviewCard 
              name="Rosa Velez" 
              comment="Colores en tendencia." 
              rating={4} 
            />
            <ReviewCard 
              name="Sebatian Lopez " 
              comment="¡Cada diseño es único!" 
              rating={5} 
            />
          </div>
        </div>
      </section>
    </main>
  );
}