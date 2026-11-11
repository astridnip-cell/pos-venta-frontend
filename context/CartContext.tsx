"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Un producto dentro del carrito
export interface CartItem {
  /** Identifica la línea: mismo producto con otra talla/color es otra línea */
  key: string;
  /** documentId del producto en Strapi (lo necesita el checkout) */
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  slug?: string;
  size?: string | null;
  color?: string | null;
  quantity: number;
}

// Lo que se recibe al agregar (acepta el formato de las tarjetas de producto)
export interface AddToCartInput {
  id?: string | number;
  documentId?: string;
  name: string;
  price: number;
  imageSrc?: string;
  slug?: string;
  size?: string | null;
  color?: string | null;
  quantity?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  addToCart: (product: AddToCartInput) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "velora_cart";

function lineKey(id: string, size?: string | null, color?: string | null) {
  return `${id}|${size ?? ""}|${color ?? ""}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Cargar el carrito guardado (se hace en el navegador para evitar errores de hidratación)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCartItems(parsed);
      }
    } catch {
      /* carrito guardado inválido o sin acceso: se empieza vacío */
    }
    setLoaded(true);
  }, []);

  // Guardar cada cambio
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      /* ignorar */
    }
  }, [cartItems, loaded]);

  const addToCart = (product: AddToCartInput) => {
    const id = String(product.documentId ?? product.id ?? "");
    if (!id) return;
    const key = lineKey(id, product.size, product.color);
    const quantity = Math.max(1, product.quantity ?? 1);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id,
          name: product.name,
          price: Number(product.price) || 0,
          imageSrc: product.imageSrc || "/placeholder.svg",
          slug: product.slug,
          size: product.size ?? null,
          color: product.color ?? null,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const updateQuantity = (key: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, totalItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
}
