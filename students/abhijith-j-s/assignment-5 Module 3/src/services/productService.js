import axios from "axios";
import { CATEGORIES } from "../config.js";

/**
 * Product API service.
 *
 * Expected contract (matches public/products.json and the planned Phase 4 backend):
 *   GET {VITE_API_BASE_URL}{VITE_PRODUCTS_ENDPOINT}
 *   -> 200 JSON array of products, or { "products": [ ... ] }
 *   Product: { id, name, category, price, originalPrice, rating, imageUrl,
 *              description?, badge? }
 */
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 10000,
});

const PRODUCTS_ENDPOINT = import.meta.env.VITE_PRODUCTS_ENDPOINT || "/products.json";

const isValidProduct = (p) =>
  p &&
  p.id !== undefined &&
  p.id !== null &&
  typeof p.name === "string" &&
  p.name.trim() !== "" &&
  CATEGORIES.includes(p.category) &&
  Number.isFinite(p.price) &&
  Number.isFinite(p.rating) &&
  typeof p.imageUrl === "string";

export const isRequestCanceled = (error) => axios.isCancel(error);

export async function fetchProducts(signal) {
  const { data } = await client.get(PRODUCTS_ENDPOINT, { signal });
  const list = Array.isArray(data) ? data : data?.products;
  if (!Array.isArray(list)) {
    throw new Error("The product service returned an unexpected response.");
  }

  const products = list.filter(isValidProduct).map((p) => ({
    ...p,
    id: String(p.id),
    originalPrice: Number.isFinite(p.originalPrice) ? p.originalPrice : p.price,
  }));

  if (products.length === 0) {
    throw new Error("No valid products were found in the catalog.");
  }
  return products;
}
