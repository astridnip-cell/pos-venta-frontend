export function StatsSection() {
 return (
    <section className="py-12 border-y">
        <div className="container px-4 md:px-6">
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                    <h3 className="text-3xl font-bold">15k+</h3>
                    <p className="text-sm text-gray-500">Clientes satisfechos</p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-3xl font-bold">400k+</h3>
                    <p className="text-sm text-gray-500">Productos vendidos</p>
                </div>

                <div className="space-y-2">
                    <h3 className="text-3xl font-bold">98%</h3>
                    <p className="text-sm text-gray-500">Valoraciones positivas</p>
                </div>

            </div>
        </div>
    </section>
 )
};