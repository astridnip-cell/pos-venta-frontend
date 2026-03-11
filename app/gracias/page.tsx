import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Package, Truck, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Página de agradecimiento/confirmación de compra
export default function ThankYouPage() {
  // En una implementación real, estos datos vendrían de la sesión o de la API
  const orderNumber = "ORD-2023-5678";
  const orderDate = "12 de mayo de 2023";
  const estimatedDelivery = "15-18 de mayo de 2023";

  const orderItems = [
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
  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Gastos de envío (gratis a partir de 50€)
  const shipping = subtotal >= 50 ? 0 : 4.99;

  // Total
  const total = subtotal + shipping;

  return (
    <main className="flex flex-col min-h-screen">
      <div className="container px-4 py-12 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">¡Gracias por tu compra!</h1>
          <p className="text-gray-600">
            Tu pedido ha sido recibido y está siendo procesado.
          </p>
        </div>

        <div className="border rounded-lg overflow-hidden mb-8">
          {/* Información del pedido */}
          <div className="bg-gray-50 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">
                  Número de pedido
                </h2>
                <p className="font-medium">{orderNumber}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">
                  Fecha del pedido
                </h2>
                <p className="font-medium">{orderDate}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">
                  Entrega estimada
                </h2>
                <p className="font-medium">{estimatedDelivery}</p>
              </div>
            </div>
          </div>

          {/* Detalles del pedido */}
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Detalles del pedido</h2>

            <div className="space-y-4 mb-6">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-4">
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
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.color}, {item.size} x {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} por unidad
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Resumen de costos */}
            <div className="space-y-2 py-4">
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
              <div className="flex justify-between font-medium text-lg pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estado del pedido */}
        <div className="border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium mb-6">Estado del pedido</h2>

          <div className="relative">
            {/* Línea de progreso */}
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200">
              <div className="absolute top-0 left-0 h-0.5 bg-green-500 w-1/3"></div>
            </div>

            {/* Pasos */}
            <div className="grid grid-cols-3 relative">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-2 relative z-10">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-sm">Pedido confirmado</h3>
                <p className="text-xs text-gray-500">{orderDate}</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mx-auto mb-2 relative z-10">
                  <Package className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-sm">Preparando pedido</h3>
                <p className="text-xs text-gray-500">En proceso</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mx-auto mb-2 relative z-10">
                  <Truck className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-sm">Enviado</h3>
                <p className="text-xs text-gray-500">Pendiente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/mi-cuenta/pedidos">Ver mis pedidos</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              Continuar comprando
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
