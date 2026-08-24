"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Información de cada producto
interface Product {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  quantity?: number;
}

// Acciones de carrito
interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}

// Cajita global
const CartContext = createContext<CartContextType | undefined>(undefined);

// Proveedor
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // Borrar el producto filtrando por su id
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Atajo carrito
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
}