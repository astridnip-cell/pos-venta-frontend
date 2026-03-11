"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Página de checkout
export default function CheckoutPage() {
  // En una implementación real, estos datos vendrían del estado global o contexto
  const cartItems = [
    {
      id: 1,
      name: "Camiseta Premium Algodón",
      color: "Negro",
      size: "M",
      price: 29.99,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80&text=1",
    },
    {
      id: 2,
      name: "Jeans Clásicos",
      color: "Azul",
      size: "32",
      price: 59.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80&text=2",
    },
    {
      id: 3,
      name: "Sudadera Comfort",
      color: "Gris",
      size: "L",
      price: 49.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80&text=3",
    },
  ];

  // Cálculo de subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Gastos de envío (gratis a partir de 50€)
  const shipping = subtotal >= 50 ? 0 : 4.99;

  // Total
  const total = subtotal + shipping;

  // Estado para el formulario
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "España",
    phone: "",
    saveInfo: true,
    paymentMethod: "card",
  });

  // Función para manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el pago con Stripe
    // y enviar los datos a Strapi
    console.log("Datos del formulario:", formData);
    console.log("Productos:", cartItems);

    // Redirección a la página de confirmación
    window.location.href = "/gracias";
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
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

      <div className="container px-4 py-8 md:px-6">
        <h1 className="text-2xl font-bold mb-8">Finalizar compra</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulario de checkout */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Información de contacto */}
              <div className="space-y-4 mb-8">
                <h2 className="text-lg font-medium">Información de contacto</h2>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, saveInfo: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="saveInfo"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Guardar información para la próxima vez
                  </label>
                </div>
              </div>

              {/* Dirección de envío */}
              <div className="space-y-4 mb-8">
                <h2 className="text-lg font-medium">Dirección de envío</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
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
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Código postal</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">País</Label>
                    <Select
                      defaultValue={formData.country}
                      onValueChange={(value) =>
                        setFormData({ ...formData, country: value })
                      }
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Selecciona un país" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="España">España</SelectItem>
                        <SelectItem value="Portugal">Portugal</SelectItem>
                        <SelectItem value="Francia">Francia</SelectItem>
                        <SelectItem value="Italia">Italia</SelectItem>
                        <SelectItem value="Alemania">Alemania</SelectItem>
                      </SelectContent>
                    </Select>
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
              </div>

              {/* Método de pago */}
              <div className="space-y-4 mb-8">
                <h2 className="text-lg font-medium">Método de pago</h2>

                <RadioGroup
                  defaultValue={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentMethod: value })
                  }
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="card" id="payment-card" />
                    <Label
                      htmlFor="payment-card"
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-5 w-5" />
                      Tarjeta de crédito
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="paypal" id="payment-paypal" />
                    <Label
                      htmlFor="payment-paypal"
                      className="flex items-center gap-2"
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.4 3H15.6C16.7 3 17.6 3.8 17.8 4.9L20.5 17.4C20.7 18.9 19.6 20.3 18.1 20.5C18 20.5 17.8 20.5 17.7 20.5H9.5C8.4 20.5 7.5 19.7 7.3 18.6L4.6 6.1C4.4 4.6 5.5 3.2 7 3C7.1 3 7.3 3 7.4 3Z"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.5 6H14.5"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 9H13"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12H12"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 15H11"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.5 20.5H17.7C19.2 20.5 20.4 19.2 20.4 17.7C20.4 17.6 20.4 17.4 20.4 17.3L17.7 4.8C17.5 3.7 16.6 3 15.5 3"
                          stroke="#1F2937"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>

                {formData.paymentMethod === "card" && (
                  <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
                    <div>
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Fecha de caducidad</Label>
                        <Input id="expiryDate" placeholder="MM/AA" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Realizar pedido
              </Button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="md:col-span-1">
            <div className="border rounded-lg p-6 bg-gray-50 sticky top-20">
              <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>

              {/* Lista de productos */}
              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-500">
                        {item.color}, {item.size} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Totales */}
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

              <div className="mt-6 text-xs text-gray-500">
                <p>
                  Al realizar tu pedido, aceptas nuestros{" "}
                  <Link href="/terminos" className="underline">
                    términos y condiciones
                  </Link>{" "}
                  y nuestra{" "}
                  <Link href="/privacidad" className="underline">
                    política de privacidad
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
