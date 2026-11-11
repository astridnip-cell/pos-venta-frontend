// Reglas de envío para MOSTRAR al cliente (pesos colombianos).
// Deben coincidir con SHIPPING_FREE_FROM y SHIPPING_COST del .env del backend:
// el valor que se cobra de verdad lo calcula siempre el backend.
export const SHIPPING_FREE_FROM = Number(process.env.NEXT_PUBLIC_SHIPPING_FREE_FROM ?? 150000);
export const SHIPPING_COST = Number(process.env.NEXT_PUBLIC_SHIPPING_COST ?? 12000);

export function estimateShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= SHIPPING_FREE_FROM ? 0 : SHIPPING_COST;
}
