import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/strapi";
import { Package, Search } from "lucide-react";

export default async function ProductosPage() {
  const { data: products } = await getProducts({ pageSize: 50 });

  const productsWithImages = products.filter((p: any) => p.image);
  const productsWithoutImages = products.filter((p: any) => !p.image);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="border-b">
        <div className="container px-4 py-8 md:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Todos los Productos</h1>
          <p className="text-gray-500 mt-1">
            {products.length} productos en total · {productsWithImages.length} con foto · {productsWithoutImages.length} sin foto
          </p>
        </div>
      </div>

      <div className="container px-4 py-8 md:px-6">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No hay productos disponibles</p>
          </div>
        ) : (
          <>
            {/* Productos CON imagen */}
            {productsWithImages.length > 0 && (
              <section className="mb-12">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  ✅ Con foto ({productsWithImages.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {productsWithImages.map((product: any) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageSrc: `http://localhost:1337${product.image.url}`,
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Productos SIN imagen */}
            {productsWithoutImages.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  ⚠️ Sin foto ({productsWithoutImages.length}) — creados con el script
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {productsWithoutImages.map((product: any) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageSrc: "/placeholder.svg",
                      }}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
