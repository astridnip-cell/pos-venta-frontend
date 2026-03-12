"use client"; //

import Link from "next/link"; //
import { useState } from "react";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: number | string;
  name: string;
  price: number;
  slug: string;
  image?: { url: string };
}


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full p-4 border-b">
      <div className="container flex items-center justify-between">
        
        {/* BOTÓN MENÚ MÓVIL */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)} //
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Abrir Menú</span>
          </Button>
        </div>

        {/* LOGO: Prioridad a tu texto original */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">pos-venta-frontend</span>
          </Link>
        </div>

        {/* NAVEGACIÓN ESCRITORIO (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium hover:text-primary">Inicio</Link>
          <Link href="/hombre" className="text-sm font-medium hover:text-primary">Hombre</Link>
          <Link href="/mujer" className="text-sm font-medium hover:text-primary">Mujer</Link>
          <Link href="/accesorios" className="text-sm font-medium hover:text-primary">Accesorios</Link>
          <Link href="/ofertas" className="text-sm font-medium hover:text-primary">Ofertas</Link>
        </nav>

        {/* ICONOS DERECHA */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
            <span className="sr-only">Cuenta</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full" //
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Carrito</span>
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 text-[10px] font-bold text-white flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden p-4">
          <div className="container">
            <div className="mb-6">
              <Input type="search" placeholder="Buscar productos..." className="w-full" />
            </div>

            {/* Navegación móvil corregida en un solo bloque */}
            <nav className="grid gap-6">
              <Link href="/" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
              <Link href="/hombre" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Hombre</Link>
              <Link href="/mujer" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Mujer</Link>
              <Link href="/accesorios" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Accesorios</Link>
              <Link href="/ofertas" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Ofertas</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
