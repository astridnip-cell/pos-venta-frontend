import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";

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
import { ProductCard } from "@/components/product-card";

// Página de categoría Accesorios
export default function AccessoriesPage() {
  // En una implementación real, estos datos vendrían de Strapi
  const categories = [
    { name: "Bolsos", count: 24 },
    { name: "Cinturones", count: 18 },
    { name: "Gorras", count: 15 },
    { name: "Gafas", count: 20 },
    { name: "Joyería", count: 32 },
  ];

  const filters = [
    {
      name: "Color",
      options: ["Negro", "Marrón", "Azul", "Gris", "Verde", "Rojo"],
    },
    {
      name: "Precio",
      options: ["Menos de 20€", "20€ - 50€", "50€ - 100€", "Más de 100€"],
    },
    {
      name: "Material",
      options: ["Cuero", "Tela", "Metal", "Plástico", "Madera"],
    },
  ];

  const products = [
    {
      id: 1,
      name: "Bolso Tote",
      price: 49.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A1",
    },
    {
      id: 2,
      name: "Cinturón Clásico",
      price: 29.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A2",
    },
    {
      id: 3,
      name: "Gorra Deportiva",
      price: 19.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A3",
    },
    {
      id: 4,
      name: "Gafas de Sol",
      price: 39.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A4",
    },
    {
      id: 5,
      name: "Collar Minimalista",
      price: 24.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A5",
    },
    {
      id: 6,
      name: "Pulsera Ajustable",
      price: 14.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A6",
    },
    {
      id: 7,
      name: "Mochila Urbana",
      price: 59.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A7",
    },
    {
      id: 8,
      name: "Bufanda Suave",
      price: 22.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A8",
    },
    {
      id: 9,
      name: "Sombrero Panamá",
      price: 34.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A9",
    },
    {
      id: 10,
      name: "Reloj Minimalista",
      price: 79.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A10",
    },
    {
      id: 11,
      name: "Cartera Slim",
      price: 29.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A11",
    },
    {
      id: 12,
      name: "Pendientes Geométricos",
      price: 19.99,
      imageSrc: "/placeholder.svg?height=300&width=300&text=A12",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* Banner de categoría */}
      <section className="relative h-[200px] md:h-[300px]">
        <Image
          src="/placeholder.svg?height=300&width=1200&text=Accesorios"
          alt="Accesorios"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold">Accesorios</h1>
            <p className="mt-2 md:mt-4 text-sm md:text-base max-w-md mx-auto">
              Complementa tu estilo con nuestra colección de accesorios de alta
              calidad.
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
          <span className="text-gray-900 font-medium">Accesorios</span>
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
                      href={`/accesorios/${category.name.toLowerCase()}`}
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
                <h2 className="text-xl font-bold">Productos</h2>
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
                <Select defaultValue="relevancia">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Relevancia</SelectItem>
                    <SelectItem value="precio-asc">
                      Precio: menor a mayor
                    </SelectItem>
                    <SelectItem value="precio-desc">
                      Precio: mayor a menor
                    </SelectItem>
                    <SelectItem value="nuevos">Más nuevos</SelectItem>
                    <SelectItem value="populares">Más populares</SelectItem>
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
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageSrc={product.imageSrc}
                  href={`/producto/accesorio-${product.id}`}
                />
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
