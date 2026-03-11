export function FeaturedInSection() {
  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Destacado en</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          <div className="text-center">
            <p className="text-lg font-medium">Vogue</p>
            <p className="text-sm text-gray-400">Revista de moda</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">GQ</p>
            <p className="text-sm text-gray-400">Estilo masculino</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">Elle</p>
            <p className="text-sm text-gray-400">Tendencias de moda</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">Esquire</p>
            <p className="text-sm text-gray-400">Moda contemporánea</p>
          </div>
        </div>
      </div>
    </section>
  );
}
