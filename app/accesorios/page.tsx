import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// 1. Asegúrate de que estas rutas sean correctas en tu proyecto
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductCard } from "@/components/product-card";
import { getProducts, getStrapiMedia } from "@/lib/strapi";

export default async function AccesoriesPage() {
  // Conexión con Strapi
  const response = await getProducts({ category: "accesorios" });
  const productsFromStrapi = response?.data || [];

  const categories = [
    { name: "Bolsos", count: 24 },
    { name: "Cinturones", count: 18 },
    { name: "Gorras", count: 15 },
    { name: "Gafas", count: 24 },
    { name: "Joyería", count: 24 }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <section className="relative h-[200px] bg-gray-100 flex items-center justify-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest">Accesorios</h1>
      </section>

      <div className="container px-4 py-8 mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block w-64">
          <h2 className="text-lg font-bold mb-4">Categorías</h2>
          <ul className="space-y-2 mb-6 text-gray-600">
            {categories.map((cat) => (
              <li key={cat.name} className="flex justify-between cursor-pointer hover:text-black">
                <span>{cat.name}</span>
                <span>({cat.count})</span>
              </li>
            ))}
          </ul>
          <Separator />
        </aside>

        {/* Grid de Productos */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsFromStrapi.map((product: any) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                // Usamos originalPrice en minúscula para que coincida con tu interfaz
                originalPrice={product.originalPrice || null} 
                imageSrc={getStrapiMedia(product.image?.url)}
                href={`/producto/${product.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}