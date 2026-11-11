"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createCheckout } from "@/lib/api";
import { formatCOP } from "@/lib/format";
import { estimateShipping } from "@/lib/shipping";

// Página de checkout: crea el pedido en el backend y envía al cliente a pagar en Wompi
export default function CheckoutPage() {
  const { cartItems } = useCart();
  const { user, jwt, isReady } = useAuth();

  const [formData, setFormData] = useState({ name: "", phone: "", address: "", city: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = estimateShipping(subtotal);
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jwt) return;
    setError("");
    setIsSubmitting(true);

    try {
      // El backend recalcula precios, valida stock y devuelve la dirección de pago.
      const result = await createCheckout(
        jwt,
        cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          size: item.size ?? null,
          color: item.color ?? null,
        })),
        formData
      );
      // El carrito se vacía cuando el pago queda aprobado (página /gracias)
      window.location.href = result.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear el pedido.");
      setIsSubmitting(false);
    }
  };

  const breadcrumb = (
    <div className="container px-4 py-4 md:px-6">
      <nav className="flex text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/carrito" className="hover:text-gray-700">
          Carrito
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900 font-medium">Checkout</span>
      </nav>
    </div>
  );

  if (!isReady) {
    return (
      <main className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex flex-col min-h-screen">
        {breadcrumb}
        <div className="container px-4 py-12 text-center">
          <h1 className="text-xl font-medium mb-4">Tu carrito está vacío</h1>
          <Button asChild>
            <Link href="/">Ver productos</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex flex-col min-h-screen">
        {breadcrumb}
        <div className="container px-4 py-12 text-center space-y-4">
          <h1 className="text-xl font-medium">Inicia sesión para terminar tu compra</h1>
          <p className="text-gray-500">Así podrás ver el estado de tu pedido después de pagar.</p>
          <Button asChild>
            <Link href="/cuenta?next=/checkout">Iniciar sesión o crear cuenta</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      {breadcrumb}

      <div className="container px-4 py-8 md:px-6">
        <h1 className="text-2xl font-bold mb-8">Finalizar compra</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulario de envío */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Datos de envío</h2>
                <p className="text-sm text-gray-500">
                  Compras como <strong>{user.email}</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" name="name" required value={formData.name} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    name="address"
                    required
                    placeholder="Calle 10 #5-23, apto 301"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" name="city" required value={formData.city} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2 border rounded-lg p-4 bg-gray-50">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Pago
                </h2>
                <p className="text-sm text-gray-600">
                  Al continuar te llevamos a la página de pago para completar tu compra.
                </p>
              </div>

              {error && <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>}

              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Ir a pagar
              </Button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="md:col-span-1">
            <div className="border rounded-lg p-6 bg-gray-50 sticky top-20">
              <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>

              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.key} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.imageSrc || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        unoptimized
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-500">
                        {[item.size, item.color].filter(Boolean).join(", ")} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium">{formatCOP(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>{shipping === 0 ? "Gratis" : formatCOP(shipping)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-medium text-base pt-2">
                  <span>Total</span>
                  <span>{formatCOP(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
