/**
 * Utilidades de formateo para la tienda
 */

/**
 * Formatea un precio en pesos colombianos (COP)
 * @param price - precio a formatear
 * @returns precio formateado (ej:"$59.900")
 */

export function formatCOP(price: number): string {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format (price);
}

/**
 * Calcula el porcetaje de descuento 
 * @param originalPrice - precio original
 * @param salePrice - precio de venta
 * @returns porcetaje de descuento (ej:25)
 */
export function calculateDiscount (originalPrice : number, salePrice:number): number {
    if (originalPrice || originalPrice <= salePrice) return 0;
    return Math.round (((originalPrice - salePrice) / originalPrice) *100);
}