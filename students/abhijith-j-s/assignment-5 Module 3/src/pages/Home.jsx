import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Newsletter from "../components/Newsletter.jsx";

const TILES = [
  { category: "Electronics", icon: "bi-cpu", text: "Smart tech & audio" },
  { category: "Clothing", icon: "bi-shirt", text: "Soft, sustainable layers" },
  { category: "Footwear", icon: "bi-box-seam", text: "Steps made light" },
  { category: "Books", icon: "bi-book", text: "Inspiration & design" },
];
const FEATURED_COUNT = 6;

export default function Home() {
  const { products, status, error, retry } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = useMemo(
    () => products.filter((p) => activeCategory === "All" || p.category === activeCategory).slice(0, FEATURED_COUNT),
    [products, activeCategory]
  );

  return (
    <>
      <section className="hero-section text-center text-lg-start position-relative">
        <div className="container position-relative z-1">
          <div className="row align-items-center">
            <div className="col-lg-7 mx-auto mx-lg-0">
              <span className="badge bg-primary text-white px-3 py-2 rounded-pill mb-4 fw-medium shadow-sm">Curated for comfort.</span>
              <h1 className="display-4 fw-bold mb-4 text-white" style={{ lineHeight: 1.2 }}>Shopping, Curated for Comfort.</h1>
              <p className="lead text-light mb-5 fw-normal" style={{ maxWidth: 600 }}>
                Discover a clutter-free marketplace of handpicked lifestyle essentials, transparent pricing, and effortless express delivery.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
                <Link to="/products" className="btn btn-warm-amber shadow">Shop Now</Link>
                <Link to="/products?sort=price-asc" className="btn btn-outline-custom">View Deals</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 my-5">
        <div className="container">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end mb-5 gap-3">
            <div>
              <span className="text-uppercase text-primary fw-bold fs-6" style={{ letterSpacing: 2 }}>The Nest Selection</span>
              <h2 className="fw-bold mb-0 mt-2 display-6">Featured Essentials</h2>
            </div>
            <Link to="/products" className="text-decoration-none fw-semibold text-primary d-inline-flex align-items-center gap-1">
              View All Goods <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>

          <CategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />

          {status === "loading" && <LoadingSpinner />}
          {status === "error" && <ErrorMessage message={error} onRetry={retry} />}
          {status === "success" && <ProductGrid products={featured} />}
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-uppercase text-primary fw-bold fs-6" style={{ letterSpacing: 2 }}>Browse by Category</span>
            <h2 className="fw-bold mt-2 display-6">Explore Our Sanctuaries</h2>
          </div>
          <div className="row g-4">
            {TILES.map(({ category, icon, text }) => (
              <div className="col-6 col-lg-3" key={category}>
                <Link to={`/products?category=${category}`} className="category-tile p-4 p-lg-5 text-center h-100 d-flex flex-column align-items-center justify-content-center text-decoration-none">
                  <div className="category-icon bg-white rounded-circle shadow-sm mb-4 text-primary d-flex align-items-center justify-content-center" style={{ width: 80, height: 80 }}>
                    <i className={`bi ${icon} fs-2`} aria-hidden="true"></i>
                  </div>
                  <h3 className="h5 fw-bold mb-2 text-dark">{category}</h3>
                  <p className="text-muted small mb-0">{text}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
