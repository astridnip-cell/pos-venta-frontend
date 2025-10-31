import Link from "next/link"
import { useState } from "react"
import {ShoppingCart, Menu, X, Search, User, Import}  from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Ghost } from "lucide-react"
import { Span } from "next/dist/trace"

export function Header () {
    const [IsMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <header className="w-full p-4">
                <div className="container flex items-center justify-between">
                <div className="flex md:hidden">
                    <Button variant= "ghost" size="icon" onClick={()=> setIsMenuOpen (IsMenuOpen)}>
                        <Menu className="h-6 w-6" />
                        <span>Abrir Menu</span>
                    </Button>

                </div>
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold texto-xl">pos-venta-fronten</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center space-x-8 ">
                    <link href="/" className="text-sm font -medium transition-colors-hover:text-primary">
                        Inicio
                    </link>
                    <link href="/" className="text-sm font -medium transition-colors-hover:text-primary">
                        Hombre
                    </link>
                    <link href="/" className="text-sm font -medium transition-colors-hover:text-primary">
                        Mujer
                    </link>
                    <link href="/" className="text-sm font -medium transition-colors-hover:text-primary">
                        Accesorios
                    </link>
                    <link href="/" className="text-sm font -medium transition-colors-hover:text-primary">
                        Ofertas
                    </link>
                </nav>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <span ></span>
                        <search className="h-5 w-5" />
                        <span className="sr-only">Buscar</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <span ></span>
                        <User className="h-5 w-5" />
                        <span className="sr-only">Cuenta</span>
                    </Button>
                    <Button variant="outline" size="icon" className="relative rounde-full">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounde-full bg-green-500 text-[10px] font-bold text-white flex items-center justify-center">3</span>
                    </Button>
                </div>
            </div>


            {IsMenuOpen && (
                <div className="fixed insent-0 top-16 z-50 bg-background md:hidden">
                    <div className="container pt-4 pb-6">
                        <div className="flex justify-end mb-4">
                            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen (false)}>
                            <X className="h-6 w-6" />
                            <span className="sr-only">Cerrar menú</span>
                            </Button>
                        </div>
                        <div className="mb-4">
                            <input type="search" placeholder="Buscar productos..." className="w-full"/>
                        </div>

                        <nav className="grid gap-4">
                            <link href="#" className="text-1g font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            Inicio                            
                            </link>

                        <nav className="grid gap-4">
                            <link href="#" className="text-1g font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            Hombre                            
                            </link>

                        <nav className="grid gap-4">
                            <link href="#" className="text-1g font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            Mujer                            
                            </link>

                        <nav className="grid gap-4">
                            <link href="#" className="text-1g font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            Accesorios                            
                            </link>

                        <nav className="grid gap-4">
                            <link href="#" className="text-1g font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            Ofertas                            
                            </link>



                        </nav>

                    </div>
                </div>

        )}
        </header>
    );

}