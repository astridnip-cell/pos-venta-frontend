"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Search, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartContext = useCart() as any;
  const items = cartContext.items || cartContext.cart || [];

  // Total
  const totalItems = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);

  return (
    <header className="w-full p-4 border-b">
      <div className="container flex items-center justify-between">
        
        {/* BOTÓN MENÚ MÓVIL */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Abrir Menú</span>
          </Button>
        </div>

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/logo-velora.png" 
              alt="Logo Velora" 
              className="h-10 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex items-center space-x-12">
          <Link href="/" className="text-sm font-medium hover:text-primary">Inicio</Link>
          <Link href="/hombre" className="text-sm font-medium hover:text-primary">Hombre</Link>
          <Link href="/mujer" className="text-sm font-medium hover:text-primary">Mujer</Link>
          <Link href="/accesorios" className="text-sm font-medium hover:text-primary">Accesorios</Link>
          <Link href="/ofertas" className="text-sm font-medium hover:text-primary">Ofertas</Link>
        </nav>

        {/* ICONOS DERECHA */}
        <div className="flex items-center gap-4">
          <Link 
            href="/favoritos" 
            className="p-2 text-gray-700 hover:text-red-500 transition-colors group flex items-center justify-center"
            aria-label="Favoritos"
          >
            <Heart className="h-6 w-6 stroke-[1.5]" />
          </Link>
        
          <button 
            className="p-2 text-gray-700 hover:text-black transition-colors flex items-center justify-center"
            aria-label="Buscar"
          >
            <Search className="h-6 w-6 stroke-[1.5]" />
          </button>
          
          
          <Link 
            href="/perfil" 
            className="p-2 text-gray-700 hover:text-black transition-colors flex items-center justify-center"
            aria-label="Cuenta"
          >
            <User className="h-6 w-6 stroke-[1.5]" />
          </Link>

        
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full cursor-pointer"
            asChild 
          >
            <Link href="/carrito">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrito</span>
              
              
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-[10px] font-bold text-white flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Movil */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden p-4">
          <div className="container">
            <div className="mb-6">
              <Input type="search" placeholder="Buscar productos..." className="w-full" />
            </div>

            <nav className="grid gap-12">
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