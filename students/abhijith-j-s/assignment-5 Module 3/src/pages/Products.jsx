import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import { CATEGORIES } from "../config.js";
import CategoryFilter from "../components/CategoryFilter.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const SORTERS = {
  featured: null,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
};

export default function Products() {
  const { products, status, error, retry } = useProducts();
  const [params, setParams] = useSearchParams();

  const query = params.get("q") || "";
  const categoryParam = params.get("category");
  const category = CATEGORIES.includes(categoryParam) ? categoryParam : "All";
  const sortParam = params.get("sort");
  const sort = sortParam in SORTERS ? sortParam : "featured";

  const updateParam = (key, value, defaultValue) => {
    const next = new URLSearchParams(params);
    if (!value || value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const visible = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    const list = products.filter(
      (p) => p.name.toLocaleLowerCase().includes(term) && (category === "All" || p.category === category)
    );
    return SORTERS[sort] ? [...list].sort(SORTERS[sort]) : list;
  }, [products, query, category, sort]);

  const hasFilters = query !== "" || category !== "All" || sort !== "featured";

  return (
    <section className="py-5">
      <div className="container">
        <div className="mb-4">
          <span className="text-uppercase text-primary fw-bold fs-6" style={{ letterSpacing: 2 }}>The Full Collection</span>
          <h1 className="fw-bold mb-0 mt-2 display-6">All Products</h1>
        </div>

        <div className="row g-3 mb-3 align-items-end">
          <div className="col-md-6">
            <label htmlFor="products-search" className="form-label small fw-semibold">Search by name</label>
            <input id="products-search" type="search" className="form-control search-pill" placeholder="Find quality goods..." value={query} onChange={(e) => updateParam("q", e.target.value, "")} />
          </div>
          <div className="col-sm-6 col-md-3">
            <label htmlFor="products-sort" className="form-label small fw-semibold">Sort by</label>
            <select id="products-sort" className="form-select search-pill" value={sort} onChange={(e) => updateParam("sort", e.target.value, "featured")}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
          <div className="col-sm-6 col-md-3">
            <button type="button" className="btn btn-outline-secondary rounded-pill w-100" disabled={!hasFilters} onClick={() => setParams({}, { replace: true })}>
              Clear filters
            </button>
          </div>
        </div>

        <CategoryFilter activeCategory={category} onChange={(c) => updateParam("category", c, "All")} />

        {status === "loading" && <LoadingSpinner />}
        {status === "error" && <ErrorMessage message={error} onRetry={retry} />}
        {status === "success" && (
          <>
            <p className="text-muted small" role="status">
              Showing {visible.length} of {products.length} products
            </p>
            <ProductGrid products={visible} emptyMessage="No products found. Try a different search or clear your filters." />
          </>
        )}
      </div>
    </section>
  );
}
