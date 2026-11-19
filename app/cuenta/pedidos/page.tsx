"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  Loader2,
  PackageCheck,
  RefreshCw,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getMyOrders, MyOrder } from "@/lib/api";
import { formatCOP } from "@/lib/format";

// Cada cuánto se vuelve a consultar el estado mientras la página está abierta
const REFRESH_MS = 30_000;

const STEPS = [
  { key: "pending", label: "Pedido recibido", icon: Clock },
  { key: "paid", label: "Pago confirmado", icon: CreditCard },
  { key: "shipped", label: "Enviado", icon: Truck },
  { key: "delivered", label: "Entregado", icon: PackageCheck },
];

/** Paso actual de la línea de tiempo (0 a 3). */
function currentStep(order: MyOrder): number {
  const byStatus = STEPS.findIndex((s) => s.key === order.statusOrder);
  const step = byStatus < 0 ? 0 : byStatus;
  // Si el pago ya se aprobó, como mínimo está en "Pago confirmado"
  return order.paymentStatus === "approved" ? Math.max(step, 1) : step;
}

const paymentFailed = (order: MyOrder) =>
  ["declined", "voided", "error"].includes(order.paymentStatus) && currentStep(order) === 0;

function formatDate(iso?: string, withTime = false) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  });
}

function statusBadge(order: MyOrder) {
  if (paymentFailed(order)) return { text: "Pago rechazado", className: "bg-red-50 text-red-700" };
  const step = currentStep(order);
  if (step === 0) return { text: "Esperando pago", className: "bg-amber-50 text-amber-700" };
  if (step === 1) return { text: "Preparando tu pedido", className: "bg-blue-50 text-blue-700" };
  if (step === 2) return { text: "En camino", className: "bg-violet-50 text-violet-700" };
  return { text: "Entregado", className: "bg-emerald-50 text-emerald-700" };
}

/** Línea de tiempo: Pedido recibido → Pago confirmado → Enviado → Entregado */
function Timeline({ order }: { order: MyOrder }) {
  const step = currentStep(order);
  const failed = paymentFailed(order);

  return (
    <ol className="grid grid-cols-4 gap-2" aria-label="Estado del pedido">
      {STEPS.map((s, index) => {
        const done = index < step || (index === step && step === STEPS.length - 1);
        const isCurrent = index === step;
        const Icon = done && index !== step ? Check : s.icon;
        const failedHere = failed && index === 1;

        const circle = failedHere
          ? "bg-red-50 border-red-300 text-red-600"
          : done || isCurrent
          ? "bg-black border-black text-white"
          : "bg-white border-gray-300 text-gray-400";

        return (
          <li key={s.key} className="relative flex flex-col items-center text-center">
            {/* Línea que une con el paso siguiente */}
            {index < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className={`absolute top-5 left-1/2 w-full h-0.5 ${index < step ? "bg-black" : "bg-gray-200"}`}
              />
            )}
            <span
              className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${circle} ${
                isCurrent && !done && !failed ? "ring-4 ring-black/10" : ""
              }`}
            >
              {failedHere ? <AlertCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
            </span>
            <span
              className={`mt-2 text-xs sm:text-sm ${
                failedHere ? "text-red-600 font-medium" : isCurrent ? "font-semibold text-gray-900" : done ? "text-gray-700" : "text-gray-400"
              }`}
            >
              {failedHere ? "Pago rechazado" : s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function OrderCard({ order }: { order: MyOrder }) {
  const [open, setOpen] = useState(false);
  const badge = statusBadge(order);
  const units = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <article className="border rounded-xl bg-white overflow-hidden">
      <div className="p-5 flex flex-wrap items-start justify-between gap-3 border-b bg-gray-50">
        <div>
          <p className="text-sm text-gray-500">Pedido</p>
          <p className="font-semibold">#{order.orderNumber}</p>
          <p className="text-sm text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
        </div>
        <div className="sm:text-right">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
            {badge.text}
          </span>
          <p className="font-semibold mt-2">{formatCOP(order.total)}</p>
          <p className="text-xs text-gray-500">
            {units} {units === 1 ? "prenda" : "prendas"}
          </p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <Timeline order={order} />

        {paymentFailed(order) && (
          <p className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
            El pago de este pedido no se completó. Tus productos siguen disponibles: puedes hacer el pedido de nuevo desde el
            carrito.
          </p>
        )}

        {order.updatedAt && (
          <p className="text-xs text-gray-500">Última actualización: {formatDate(order.updatedAt, true)}</p>
        )}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:underline"
        >
          {open ? "Ocultar detalle" : "Ver detalle"}
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <ul className="space-y-2 text-sm">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between gap-4">
                  <span>
                    {item.name}
                    <span className="text-gray-500">
                      {[item.size, item.color].filter(Boolean).length > 0 &&
                        ` · ${[item.size, item.color].filter(Boolean).join(", ")}`}{" "}
                      x {item.quantity}
                    </span>
                  </span>
                  <span className="whitespace-nowrap">{formatCOP(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="text-sm space-y-2">
              {(order.shippingAddress || order.shippingCity) && (
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">Envío a:</span> {order.shippingAddress}
                  {order.shippingCity ? `, ${order.shippingCity}` : ""}
                </p>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCOP(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span>{order.shippingCost === 0 ? "Gratis" : formatCOP(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span>{formatCOP(order.total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function MyOrdersPage() {
  const { user, jwt, isReady } = useAuth();
  const [orders, setOrders] = useState<MyOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const load = useCallback(
    async (quiet = false) => {
      if (!jwt) return;
      if (quiet) setIsRefreshing(true);
      try {
        setOrders(await getMyOrders(jwt));
        setError("");
        setLastCheck(new Date());
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudieron cargar tus pedidos.");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [jwt]
  );

  // Primera carga
  useEffect(() => {
    if (!isReady) return;
    if (!jwt) {
      setIsLoading(false);
      return;
    }
    load();
  }, [isReady, jwt, load]);

  // Se actualiza solo cada 30 segundos mientras la pestaña está visible,
  // y al volver a la pestaña: así se ve cuando el administrador cambia el estado.
  useEffect(() => {
    if (!jwt) return;
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") load(true);
    }, REFRESH_MS);
    const onVisible = () => document.visibilityState === "visible" && load(true);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [jwt, load]);

  return (
    <main className="flex flex-col min-h-screen">
      <div className="container px-4 py-4 md:px-6">
        <nav className="flex text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/cuenta" className="hover:text-gray-700">
            Mi cuenta
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">Mis pedidos</span>
        </nav>
      </div>

      <div className="container px-4 py-6 md:px-6 max-w-4xl">
        {!isReady || isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : !user ? (
          <div className="text-center py-16 space-y-4">
            <h1 className="text-2xl font-bold">Mis pedidos</h1>
            <p className="text-gray-500">Inicia sesión para ver tus compras y el estado de cada pedido.</p>
            <Button asChild>
              <Link href="/cuenta?next=/cuenta/pedidos">Iniciar sesión</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">Mis pedidos</h1>
                <p className="text-sm text-gray-500 mt-1">
                  El estado se actualiza solo.
                  {lastCheck &&
                    ` Última revisión: ${lastCheck.toLocaleTimeString("es-CO", { hour: "numeric", minute: "2-digit" })}`}
                </p>
              </div>
              <Button variant="outline" onClick={() => load(true)} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Actualizar
              </Button>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>
            )}

            {orders.length === 0 ? (
              <div className="text-center py-16 border rounded-xl bg-gray-50 space-y-4">
                <ShoppingBag className="h-10 w-10 mx-auto text-gray-300" />
                <h2 className="text-lg font-medium">Aún no tienes pedidos</h2>
                <p className="text-gray-500">Cuando hagas tu primera compra, aquí podrás seguirla paso a paso.</p>
                <Button asChild>
                  <Link href="/">Ver productos</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <OrderCard key={order.orderNumber} order={order} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
