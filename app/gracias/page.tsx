"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { verifyPayment } from "@/lib/api";
import { formatCOP } from "@/lib/format";

type Result = Awaited<ReturnType<typeof verifyPayment>>;

// Wompi devuelve al cliente a /gracias?ref=<pedido>&id=<transacción>
function ThanksContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");
  const transactionId = searchParams.get("id");

  const { jwt, isReady } = useAuth();
  const { clearCart } = useCart();

  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(Boolean(transactionId));

  useEffect(() => {
    if (!isReady || !transactionId) return;
    if (!jwt) {
      setError("Inicia sesión con la cuenta con la que compraste para ver el estado del pago.");
      setIsLoading(false);
      return;
    }

    verifyPayment(jwt, transactionId)
      .then((data) => {
        setResult(data);
        if (data?.paymentStatus === "approved") clearCart();
      })
      .catch((err) => setError(err.message || "No se pudo consultar el pago."))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, jwt, transactionId]);

  const orderNumber = result?.orderNumber || reference;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-24 gap-3 text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>Confirmando tu pago...</p>
      </div>
    );
  }

  let icon = <Clock className="h-14 w-14 text-yellow-500" />;
  let title = "Estamos procesando tu pago";
  let message = "Te avisaremos cuando se confirme el resultado del pago.";

  if (result?.paymentStatus === "approved") {
    icon = <CheckCircle2 className="h-14 w-14 text-green-600" />;
    title = "¡Gracias por tu compra!";
    message = "Tu pago fue aprobado y ya estamos preparando tu pedido.";
  } else if (result && ["declined", "voided", "error"].includes(result.paymentStatus)) {
    icon = <XCircle className="h-14 w-14 text-red-600" />;
    title = "El pago no se pudo completar";
    message = "Tu carrito sigue guardado: puedes intentarlo de nuevo.";
  } else if (!transactionId) {
    title = "Pedido recibido";
    message = "Si ya pagaste, la confirmación puede tardar unos minutos.";
  }

  return (
    <div className="max-w-lg mx-auto py-20 text-center space-y-4">
      <div className="flex justify-center">{icon}</div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-600">{message}</p>
      {orderNumber && (
        <p className="text-sm text-gray-500">
          Número de pedido: <strong>{orderNumber}</strong>
          {result?.total ? ` · Total: ${formatCOP(result.total)}` : ""}
        </p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-center gap-3 pt-4">
        {result && result.paymentStatus !== "approved" && result.paymentStatus !== "pending" ? (
          <Button asChild>
            <Link href="/carrito">Volver al carrito</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/">Seguir comprando</Link>
          </Button>
        )}
        {error && (
          <Button variant="outline" asChild>
            <Link href="/cuenta">Iniciar sesión</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <main className="container px-4 md:px-6">
      <Suspense fallback={null}>
        <ThanksContent />
      </Suspense>
    </main>
  );
}
