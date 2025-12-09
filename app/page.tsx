import Image from "next/image";
import { Star, ChevronRight} from "lucide-react";

import { Button } from "@/components/ui/button"
import { StatsSection } from "@/components/stats-section";

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
}