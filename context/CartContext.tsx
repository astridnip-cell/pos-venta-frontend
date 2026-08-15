"use client"; // Esta línea es necesaria porque usaremos estados de React

import { createContext, useContext, useState, ReactNode } from "react";

// Información de cada producto
interface Product {
  id: number;
  name: string;
  price: number;
}

// Acciones de carrito
interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
}

// 3. CCajita global
const CartContext = createContext<CartContextType | undefined>(undefined);

// Proveedor
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
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