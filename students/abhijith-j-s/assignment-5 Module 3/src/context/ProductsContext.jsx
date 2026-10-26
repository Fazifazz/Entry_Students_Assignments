import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchProducts, isRequestCanceled } from "../services/productService.js";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [state, setState] = useState({ products: [], status: "loading", error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((prev) => ({ ...prev, status: "loading", error: "" }));

    fetchProducts(controller.signal)
      .then((products) => setState({ products, status: "success", error: "" }))
      .catch((err) => {
        if (isRequestCanceled(err)) return;
        setState({
          products: [],
          status: "error",
          error: "We couldn't load the products right now. Please check your connection and try again.",
        });
        console.error("ShopNest: product request failed", err);
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const value = useMemo(() => ({ ...state, retry }), [state, retry]);
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside <ProductsProvider>");
  return ctx;
}
