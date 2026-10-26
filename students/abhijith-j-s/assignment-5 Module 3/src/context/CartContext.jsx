import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useProducts } from "./ProductsContext.jsx";
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD, MAX_QUANTITY, TAX_RATE } from "../config.js";

const CART_STORAGE_KEY = "shopnest-cart";
const CartContext = createContext(null);

const clamp = (q) => Math.min(MAX_QUANTITY, Math.max(0, Math.floor(q)));
const roundMoney = (n) => Math.round(n * 100) / 100;

// Only { id, quantity } is persisted; prices always come from the live catalog.
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved
      .filter((i) => i && i.id !== undefined && Number.isInteger(i.quantity) && i.quantity > 0)
      .map((i) => ({ id: String(i.id), quantity: clamp(i.quantity) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { products, status } = useProducts();
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error("ShopNest: cart could not be saved", err);
    }
  }, [cart]);

  // Once the catalog is known, drop cart entries for products that no longer exist.
  useEffect(() => {
    if (status !== "success") return;
    setCart((prev) => {
      const next = prev.filter((i) => products.some((p) => p.id === i.id));
      return next.length === prev.length ? prev : next;
    });
  }, [products, status]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || product.id === undefined) return;
    const id = String(product.id);
    const amount = clamp(quantity);
    if (amount === 0) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: clamp(i.quantity + amount) } : i));
      }
      return [...prev, { id, quantity: amount }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((i) => i.id !== String(productId)));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    const id = String(productId);
    const next = clamp(Number(quantity) || 0);
    setCart((prev) =>
      next === 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity: next } : i))
    );
  }, []);

  const increaseQuantity = useCallback((productId) => {
    const id = String(productId);
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: clamp(i.quantity + 1) } : i)));
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    const id = String(productId);
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(() => {
    const items = cart
      .map((i) => {
        const product = products.find((p) => p.id === i.id);
        return product ? { product, quantity: i.quantity, lineTotal: roundMoney(product.price * i.quantity) } : null;
      })
      .filter(Boolean);

    const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = roundMoney(items.reduce((sum, i) => sum + i.lineTotal, 0));
    const tax = roundMoney(subtotal * TAX_RATE);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
    const total = roundMoney(subtotal + tax + shipping);

    return {
      items, itemCount, subtotal, tax, shipping, total,
      addToCart, removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity, clearCart,
    };
  }, [cart, products, addToCart, removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
