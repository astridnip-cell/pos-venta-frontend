"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Minus, Plus, Trash2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

// Página de carrito de compra
export default function CartPage() {
  // En una implementación real, estos datos vendrían del estado global o contexto
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Camiseta Premium Algodón",
      color: "Negro",
      size: "M",
      price: 29.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100&text=1",
    },
    {
      id: 2,
      name: "Jeans Clásicos",
      color: "Azul",
      size: "32",
      price: 59.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100&text=2",
    },
    {
      id: 3,
      name: "Sudadera Comfort",
      color: "Gris",
      size: "L",
      price: 49.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100&text=3",
    },
  ]);

  // Función para actualizar la cantidad
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Función para eliminar un producto
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Cálculo de subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Gastos de envío (gratis a partir de 50€)
  const shipping = subtotal >= 50 ? 0 : 4.99;

  // Total
  const total = subtotal + shipping;

  return (
    <main className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
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

        {cartItems.length === 0 ? (
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
            {/* Productos en el carrito */}
            <div className="md:col-span-2 space-y-6">
              {/* Encabezado de la tabla (solo visible en escritorio) */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-2 text-sm font-medium text-gray-500">
                <div className="col-span-6">Producto</div>
                <div className="col-span-2 text-center">Precio</div>
                <div className="col-span-2 text-center">Cantidad</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Lista de productos */}
              {cartItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Producto (imagen, nombre, detalles) */}
                    <div className="col-span-1 md:col-span-6 flex gap-4">
                      <div className="w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="text-sm text-gray-500 mt-1">
                          <p>Color: {item.color}</p>
                          <p>Talla: {item.size}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0 h-auto mt-2 md:hidden"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </div>

                    {/* Precio unitario */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-gray-500">Precio:</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>

                    {/* Control de cantidad */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-gray-500">Cantidad:</span>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Reducir cantidad</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Aumentar cantidad</span>
                        </Button>
                      </div>
                    </div>

                    {/* Precio total */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                      <span className="md:hidden text-gray-500">Total:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hidden md:flex"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Código promocional"
                    className="w-full sm:w-auto"
                  />
                  <Button variant="outline">Aplicar</Button>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/">Continuar comprando</Link>
                </Button>
              </div>
            </div>

            {/* Resumen del pedido */}
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
                    <span>
                      {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                    </span>
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

                <div className="mt-6 text-xs text-gray-500">
                  <p>Envío gratuito en pedidos superiores a $50.</p>
                  <p className="mt-2">
                    Aceptamos: Visa, Mastercard, American Express, PayPal
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
