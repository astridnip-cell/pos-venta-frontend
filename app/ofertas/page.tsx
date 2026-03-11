import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Filter, SlidersHorizontal, Tag } from "lucide-react";

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
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Página de Ofertas
export default function SalesPage() {
  // En una implementación real, estos datos vendrían de Strapi
  const categories = [
    { name: "Hombre", count: 42 },
    { name: "Mujer", count: 56 },
    { name: "Accesorios", count: 28 },
  ];

  const filters = [
    {
      name: "Descuento",
      options: ["10% o más", "20% o más", "30% o más", "50% o más"],
    },
    {
      name: "Categoría",
      options: [
        "Camisetas",
        "Pantalones",
        "Vestidos",
        "Chaquetas",
        "Accesorios",
      ],
    },
    {
      name: "Precio final",
      options: ["Menos de 20€", "20€ - 50€", "50€ - 100€", "Más de 100€"],
    },
  ];

  const products = [
    {
      id: 1,
      name: "Camiseta Premium",
      originalPrice: 29.99,
      salePrice: 19.99,
      discount: 33,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S1",
      category: "Hombre",
    },
    {
      id: 2,
      name: "Vestido Casual",
      originalPrice: 59.99,
      salePrice: 39.99,
      discount: 33,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S2",
      category: "Mujer",
    },
    {
      id: 3,
      name: "Jeans Clásicos",
      originalPrice: 69.99,
      salePrice: 49.99,
      discount: 29,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S3",
      category: "Hombre",
    },
    {
      id: 4,
      name: "Bolso Tote",
      originalPrice: 49.99,
      salePrice: 29.99,
      discount: 40,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S4",
      category: "Accesorios",
    },
    {
      id: 5,
      name: "Chaqueta Denim",
      originalPrice: 79.99,
      salePrice: 49.99,
      discount: 38,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S5",
      category: "Mujer",
    },
    {
      id: 6,
      name: "Zapatillas Casual",
      originalPrice: 89.99,
      salePrice: 59.99,
      discount: 33,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S6",
      category: "Hombre",
    },
    {
      id: 7,
      name: "Falda Plisada",
      originalPrice: 44.99,
      salePrice: 24.99,
      discount: 44,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S7",
      category: "Mujer",
    },
    {
      id: 8,
      name: "Gafas de Sol",
      originalPrice: 39.99,
      salePrice: 19.99,
      discount: 50,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S8",
      category: "Accesorios",
    },
    {
      id: 9,
      name: "Sudadera Comfort",
      originalPrice: 49.99,
      salePrice: 34.99,
      discount: 30,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S9",
      category: "Hombre",
    },
    {
      id: 10,
      name: "Blusa Elegante",
      originalPrice: 39.99,
      salePrice: 24.99,
      discount: 38,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S10",
      category: "Mujer",
    },
    {
      id: 11,
      name: "Cinturón Clásico",
      originalPrice: 29.99,
      salePrice: 19.99,
      discount: 33,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S11",
      category: "Accesorios",
    },
    {
      id: 12,
      name: "Pantalón Chino",
      originalPrice: 54.99,
      salePrice: 34.99,
      discount: 36,
      imageSrc: "/placeholder.svg?height=300&width=300&text=S12",
      category: "Hombre",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* Banner de ofertas */}
      <section className="relative h-[200px] md:h-[300px]">
        <Image
          src="/placeholder.svg?height=300&width=1200&text=Ofertas+Especiales"
          alt="Ofertas Especiales"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold">
              Ofertas Especiales
            </h1>
            <p className="mt-2 md:mt-4 text-sm md:text-base max-w-md mx-auto">
              Descubre nuestras mejores ofertas con descuentos de hasta el 50%
              en productos seleccionados.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container px-4 py-4 md:px-6">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">Ofertas</span>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="container px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar con filtros - Versión escritorio */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <h2 className="text-lg font-medium mb-4">Categorías</h2>
              <ul className="space-y-2 mb-6">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/ofertas/${category.name.toLowerCase()}`}
                      className="flex justify-between hover:text-primary"
                    >
                      <span>{category.name}</span>
                      <span className="text-gray-500">({category.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Separator className="my-6" />

              <h2 className="text-lg font-medium mb-4">Filtros</h2>

              {filters.map((filter) => (
                <Accordion
                  key={filter.name}
                  type="single"
                  collapsible
                  className="mb-4"
                >
                  <AccordionItem value={filter.name}>
                    <AccordionTrigger className="text-base font-medium py-2">
                      {filter.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-1">
                        {filter.options.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`${filter.name}-${option}`} />
                            <label
                              htmlFor={`${filter.name}-${option}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}

              <Button className="w-full mt-4">Aplicar filtros</Button>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Controles de filtrado y ordenación */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center">
                <h2 className="text-xl font-bold">Ofertas</h2>
                <span className="ml-2 text-sm text-gray-500">
                  ({products.length} artículos)
                </span>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Botón de filtros móvil */}
                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>

                {/* Selector de ordenación */}
                <Select defaultValue="descuento">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="descuento">Mayor descuento</SelectItem>
                    <SelectItem value="precio-asc">
                      Precio: menor a mayor
                    </SelectItem>
                    <SelectItem value="precio-desc">
                      Precio: mayor a menor
                    </SelectItem>
                    <SelectItem value="nuevos">Más nuevos</SelectItem>
                  </SelectContent>
                </Select>

                {/* Selector de vista (grid/lista) */}
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden sm:flex"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg border"
                >
                  <Link
                    href={`/producto/${product.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-${product.id}`}
                    className="absolute inset-0 z-10"
                  >
                    <span className="sr-only">Ver detalles</span>
                  </Link>
                  <div className="absolute top-2 right-2 z-20">
                    <Badge className="bg-red-500 hover:bg-red-600">
                      -{product.discount}%
                    </Badge>
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.imageSrc || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-2 right-2 h-8 w-8 rounded-full z-20"
                    >
                      <Tag className="h-4 w-4" />
                      <span className="sr-only">Ver oferta</span>
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold">
                        ${product.salePrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {product.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
