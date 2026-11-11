"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, FlaskConical, Loader2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { getMyOrders, MyOrder, simulatePayment } from "@/lib/api";
import { formatCOP } from "@/lib/format";

// Pasarela de pago SIMULADA: reemplaza a Wompi cuando el backend tiene
// PAYMENT_MODE=simulado. No pide datos de tarjeta y no cobra nada.
function SimulatedPayment() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref") ?? "";
  const router = useRouter();
  const { jwt, isReady } = useAuth();

  const [order, setOrder] = useState<MyOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState<"approve" | "decline" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isReady) return;
    if (!jwt) {
      setError("Inicia sesión con la cuenta con la que hiciste el pedido.");
      setIsLoading(false);
      return;
    }
    getMyOrders(jwt)
      .then((orders) => {
        const found = orders.find((o) => o.orderNumber === reference);
        if (!found) setError("No encontramos este pedido en tu cuenta.");
        setOrder(found ?? null);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "No se pudo cargar el pedido."))
      .finally(() => setIsLoading(false));
  }, [isReady, jwt, reference]);

  const pay = async (approve: boolean) => {
    if (!jwt) return;
    setError("");
    setIsPaying(approve ? "approve" : "decline");
    try {
      const result = await simulatePayment(jwt, reference, approve);
      router.push(
        `/gracias?ref=${encodeURIComponent(reference)}&id=${encodeURIComponent(result.transactionId)}`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo procesar el pago simulado.");
      setIsPaying(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="border rounded-xl p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 text-sm">
          <FlaskConical className="h-4 w-4 flex-shrink-0" />
          Pasarela de pago de prueba: no se cobra dinero real.
        </div>

        <div>
          <h1 className="text-xl font-bold">Pagar pedido</h1>
          <p className="text-sm text-gray-500">Referencia: {reference || "—"}</p>
        </div>

        {order && (
          <>
            <div className="space-y-2 text-sm">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between gap-4">
                  <span>
                    {item.name}
                    {item.size ? ` · ${item.size}` : ""}
                    {item.color ? ` · ${item.color}` : ""} x {item.quantity}
                  </span>
                  <span>{formatCOP(item.price * item.quantity)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span>{order.shippingCost === 0 ? "Gratis" : formatCOP(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total a pagar</span>
                <span>{formatCOP(order.total)}</span>
              </div>
            </div>

            {order.paymentStatus === "approved" ? (
              <p className="text-sm text-green-700">Este pedido ya está pagado.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={isPaying !== null}
                  onClick={() => pay(true)}
                >
                  {isPaying === "approve" ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                  )}
                  Aprobar pago
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  disabled={isPaying !== null}
                  onClick={() => pay(false)}
                >
                  {isPaying === "decline" ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  Rechazar pago
                </Button>
              </div>
            )}
          </>
        )}

        {error && <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>}

        <Link href="/carrito" className="block text-center text-sm text-gray-500 hover:underline">
          Volver al carrito
        </Link>
      </div>
    </div>
  );
}

export default function SimulatedPaymentPage() {
  return (
    <main className="container px-4 md:px-6">
      <Suspense fallback={null}>
        <SimulatedPayment />
      </Suspense>
    </main>
  );
}
