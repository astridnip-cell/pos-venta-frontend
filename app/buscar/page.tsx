import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { searchProducts } from "@/lib/strapi";

// Página de resultados de búsqueda: /buscar?q=chaqueta
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const term = q.trim();
  const { data: products, total } = await searchProducts(term);

  return (
    <main className="flex flex-col min-h-screen">
      <div className="container px-4 py-4 md:px-6">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">Buscar</span>
        </nav>
      </div>

      <div className="container px-4 py-6 md:px-6">
        {/* Buscar de nuevo (funciona aunque el navegador no tenga JavaScript) */}
        <form action="/buscar" method="get" className="relative max-w-xl mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="search"
            name="q"
            defaultValue={term}
            placeholder="¿Qué estás buscando?"
            aria-label="Buscar productos"
            className="w-full h-12 rounded-full border pl-12 pr-28 text-base focus:outline-none focus:ring-2 focus:ring-black/10"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-5 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800"
          >
            Buscar
          </button>
        </form>

        {!term ? (
          <p className="text-gray-600">Escribe el nombre de una prenda, un accesorio o una categoría.</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-1">Resultados para “{term}”</h1>
            <p className="text-sm text-gray-500 mb-8">
              {total === 1 ? "1 producto encontrado" : `${total} productos encontrados`}
            </p>

            {products.length === 0 ? (
              <div className="text-center py-16 border rounded-xl bg-gray-50">
                <h2 className="text-lg font-medium mb-2">No encontramos productos</h2>
                <p className="text-gray-500 mb-6">Revisa cómo está escrito o prueba con otra palabra.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { href: "/hombre", label: "Ver Hombre" },
                    { href: "/mujer", label: "Ver Mujer" },
                    { href: "/accesorios", label: "Ver Accesorios" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-2 rounded-full border bg-white text-sm hover:border-black"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: { id: number }) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
