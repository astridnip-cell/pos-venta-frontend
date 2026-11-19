import Image from "next/image";

export function CommitmentSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div className="relative rounded-lg overflow-hidden">
            {/* Foto de la carpeta public/ (sin marcas de agua ni logos de otras marcas) */}
            <Image
              src="/imagen_principal.png"
              width={825}
              height={413}
              alt="Pareja con abrigos y sombrero caminando por la ciudad"
              className="w-full object-cover aspect-[4/3]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Comprometidos con la calidad y la sostenibilidad
            </h2>
            <p className="text-gray-500 md:text-lg">
              Creemos que la moda puede ser ética y sostenible. Cada prenda está
              diseñada pensando en su impacto ambiental y fabricada con
              materiales de la más alta calidad para garantizar durabilidad y
              estilo.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Materiales sostenibles y organicos</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Producción ética y condiciones laborales justas</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Embalaje reciclable y mínimo desperdicio</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
