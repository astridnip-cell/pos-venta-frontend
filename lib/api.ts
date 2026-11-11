// lib/api.ts
// Llamadas al backend que necesitan sesión del cliente (login, registro, pago).
import { STRAPI_URL } from "./strapi";

export interface StoreUser {
  id: number;
  documentId?: string;
  username: string;
  email: string;
}

export interface AuthResult {
  jwt: string;
  user: StoreUser;
}

async function request(path: string, options: RequestInit = {}, jwt?: string | null) {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      ...(options.headers || {}),
    },
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || "No se pudo conectar con la tienda.");
  }
  return json;
}

export function loginCustomer(identifier: string, password: string): Promise<AuthResult> {
  return request("/auth/local", {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });
}

export function registerCustomer(
  username: string,
  email: string,
  password: string
): Promise<AuthResult> {
  return request("/auth/local/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}

export interface CheckoutItem {
  productId: string; // documentId del producto
  quantity: number;
  size?: string | null;
  color?: string | null;
}

export interface ShippingData {
  name: string;
  phone: string;
  address: string;
  city: string;
}

export interface CheckoutResult {
  orderNumber: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  checkoutUrl: string;
}

/** Crea el pedido en el backend y devuelve la dirección de pago de Wompi. */
export function createCheckout(
  jwt: string,
  items: CheckoutItem[],
  shipping: ShippingData
): Promise<CheckoutResult> {
  return request(
    "/orders/checkout",
    { method: "POST", body: JSON.stringify({ items, shipping }) },
    jwt
  );
}

export interface MyOrder {
  orderNumber: string;
  statusOrder: string;
  paymentStatus: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  items: { name: string; price: number; quantity: number; size?: string | null; color?: string | null }[];
  createdAt: string;
}

/** Pedidos del cliente con sesión iniciada (el más reciente primero). */
export async function getMyOrders(jwt: string): Promise<MyOrder[]> {
  const json = await request("/orders/mine", {}, jwt);
  return json?.data ?? [];
}

/**
 * Pago simulado (backend con PAYMENT_MODE=simulado): aprueba o rechaza el pedido
 * sin pasar por Wompi. Devuelve el id de la transacción simulada.
 */
export function simulatePayment(
  jwt: string,
  reference: string,
  approve: boolean
): Promise<{ transactionId: string; paymentStatus: string }> {
  return request(
    "/orders/simulate-payment",
    { method: "POST", body: JSON.stringify({ reference, approve }) },
    jwt
  );
}

/** Pregunta al backend (que consulta a Wompi) el resultado de un pago. */
export async function verifyPayment(jwt: string, transactionId: string) {
  const json = await request(`/orders/verify/${encodeURIComponent(transactionId)}`, {}, jwt);
  return json?.data as {
    orderNumber: string;
    statusOrder: string;
    paymentStatus: string;
    total: number;
  };
}
