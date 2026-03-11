import Image from "next/image";

export function CommitmentSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 items-center">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=800"
              width={800}
              height={600}
              alt="Compromiso con calidad"
              className="object-cover aspect-[4/3"
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
