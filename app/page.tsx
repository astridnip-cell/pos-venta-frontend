import Image from "next/image";
import { Star, ChevronRight} from "lucide-react";

import { Button } from "@/components/ui/button"

//Esta es la página principal
export default function Home() {
  return (
  <main className="flex flex-col min-h-screen">
    {/* Hero Section */}
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-16">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ropa personalizada diseñada para<span className="bg-yellow-300 px-1">Tu Estilo</span>
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
                  src={`/placeholder.svg?height=32&width=32&text=${i}`}
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
        <div className="md:col-span-7">
          <Image
            src="/plaeholder.svg?height=400&width=800"
            alt="Colección destacada"
            width={800}
            height={600}
            className="w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </div>  
    </section>
  </main>
  )
}