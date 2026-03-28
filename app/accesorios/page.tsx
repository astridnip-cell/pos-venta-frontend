import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// 1. 
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductCard } from "@/components/product-card";
import { getProducts, getStrapiMedia } from "@/lib/strapi";

// Página de categoría Accesorios
export default async function AccesoriesPage() {
  // Obtener los productos de Strapi
  const {data: products, meta } =await getProducts ({
    category: "accesorios",
  })
  //En una implementación real, estos datos vendrían de Strapi
  const categories = [
    { name: "Bolsos", count: 24 },
    { name: "Cinturones", count: 18 },
    { name: "Gorras", count: 15 },
    { name: "Gafas", count: 20 },
    { name: "Joyería", count: 32 }
  ];
  const response = await getProducts({ category: "accesorios" });
  const productsFromStrapi = response?.data || [];


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



            return(
              <main className="flex flex-col min-h-screen">
                {/* Banner de categoria*/}
                <section className="relative h-[200px] md:h-[300px]">
                {/*Mostrar un banner de accesorios*/}
                <Image
                src={getStrapiMedia(products[0].image?.url) || "/placeholder.jpg"}
                alt="Accesorios"
                fill
                className="object-cover"
              />
              <div className="absolute insert-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="mt-2 md:mt-4 text-sm md:text-base max-w-md mx-auto">
                  complementa tu estilo con nuestra colección de accesorios de alta calidad.

                </h1>

              </div>

              </div>
            )
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


{/* Paginación */}
{meta.pagination.pageCount > 1 && (
  <div className="flex justify-center mt-12">
  <nav className="flex items-center gap-1">
    <Button variant="outline" size="icon" disabled>
      <ChevronRight className="h-4 w-4 rotate-180" />
    </Button>
     {Array.from({ length: meta.pagination.pageCount || 0 }, (_, i) => (
      <Button
        variant="outline"
        size="sm"
        className="bg-primary text-primary-foreground"
        >
          {i+1}
      </Button>
     ))}
    
      <Button variant="outline" size="icon">
        <ChevronRight className="h-4 w-4" />
      </Button>
 </nav>
</div>
)}

</div>
</div>
</div>
</main>
    );
  }
