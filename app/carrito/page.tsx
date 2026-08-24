"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Trash2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  // 👈 Extraemos cartItems y removeFromCart reales
  const { cartItems, removeFromCart } = useCart();

  const subtotal = (cartItems || []).reduce(
    (sum: number, item: any) => sum + item.price * (item.quantity || 1),
    0
  );

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <main className="flex flex-col min-h-screen">
      <div className="container px-4 py-4 md:px-6">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">Carrito</span>
        </nav>
      </div>

      <div className="container px-4 py-8 md:px-6">
        <h1 className="text-2xl font-bold mb-8">Tu carrito</h1>

        {(!cartItems || cartItems.length === 0) ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-8">
              Parece que aún no has añadido ningún producto a tu carrito.
            </p>
            <Button asChild>
              <Link href="/">Continuar comprando</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-2 text-sm font-medium text-gray-500">
                <div className="col-span-6">Producto</div>
                <div className="col-span-2 text-center">Precio</div>
                <div className="col-span-2 text-center">Cantidad</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {cartItems.map((item: any) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 md:col-span-6 flex gap-4">
                      <div className="w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.imageSrc || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        {/* Botón eliminar en versión móvil */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-auto md:hidden justify-start"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-gray-500">Precio:</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-gray-500">Cantidad:</span>
                      <span className="w-8 text-center">{item.quantity || 1}</span>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                      <span className="md:hidden text-gray-500">Total:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </span>
                        {/* Papelera */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 hidden md:flex"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-2">
                  <Input placeholder="Código promocional" className="w-full sm:w-auto" />
                  <Button variant="outline">Aplicar</Button>
                </div>
                <Button asChild className="bg-black text-white hover:bg-black/80">
                  <Link href="/">Continuar comprando</Link>
                </Button>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="border rounded-lg p-6 bg-gray-50 sticky top-20">
                <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium text-base pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full mt-6" asChild>
                  <Link href="/checkout">
                    Finalizar compra
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}