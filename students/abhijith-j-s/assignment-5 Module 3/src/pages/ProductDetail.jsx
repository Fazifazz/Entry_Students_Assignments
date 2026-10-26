import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { MAX_QUANTITY } from "../config.js";
import { formatPrice } from "../utils/format.js";
import StarRating from "../components/StarRating.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, status, error, retry } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [id]);

  if (status === "loading") return <div className="container py-5"><LoadingSpinner label="Loading product..." /></div>;
  if (status === "error") return <div className="container py-5"><ErrorMessage message={error} onRetry={retry} /></div>;

  const product = products.find((p) => p.id === id);
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-emoji-frown fs-1 text-muted" aria-hidden="true"></i>
        <h1 className="h3 fw-bold mt-3">Product not found</h1>
        <p className="text-muted">We couldn't find a product with that ID.</p>
        <Link to="/products" className="btn btn-warm-amber">Back to Products</Link>
      </div>
    );
  }

  const savings = product.originalPrice - product.price;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
  };

  return (
    <section className="py-5">
      <div className="container">
        <nav aria-label="Breadcrumb" className="mb-4">
          <Link to="/products" className="text-decoration-none text-primary fw-semibold">
            <i className="bi bi-arrow-left me-1" aria-hidden="true"></i> Back to Products
          </Link>
        </nav>

        <div className="row g-5">
          <div className="col-md-6">
            <div className="img-wrapper shadow-sm">
              <img src={product.imageUrl} alt={product.name} className="w-100 object-fit-cover" style={{ height: 460 }} />
            </div>
          </div>

          <div className="col-md-6">
            <div className="small text-uppercase text-muted fw-semibold mb-2" style={{ letterSpacing: 1 }}>{product.category}</div>
            <h1 className="fw-bold display-6 mb-3">{product.name}</h1>
            <StarRating rating={product.rating} />

            <div className="my-4 d-flex align-items-baseline flex-wrap gap-3">
              <span className="fw-bold text-primary display-6">{formatPrice(product.price)}</span>
              {savings > 0 && (
                <>
                  <span className="text-muted text-decoration-line-through fs-5">{formatPrice(product.originalPrice)}</span>
                  <span className="badge bg-success rounded-pill px-3 py-2">You save {formatPrice(savings)}</span>
                </>
              )}
            </div>

            <p className="text-muted lh-lg mb-4">{product.description}</p>

            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="detail-qty" className="fw-semibold me-1">Quantity</label>
                <button type="button" className="btn btn-sm btn-outline-dark cart-quantity-button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <i className="bi bi-dash" aria-hidden="true"></i>
                </button>
                <input
                  id="detail-qty"
                  type="number"
                  min="1"
                  max={MAX_QUANTITY}
                  className="form-control form-control-sm text-center"
                  style={{ width: 64 }}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(MAX_QUANTITY, Math.max(1, Math.floor(Number(e.target.value)) || 1)))}
                />
                <button type="button" className="btn btn-sm btn-outline-dark cart-quantity-button" onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))} aria-label="Increase quantity">
                  <i className="bi bi-plus" aria-hidden="true"></i>
                </button>
              </div>
              <button type="button" className="btn btn-warm-amber" onClick={handleAdd}>
                <i className="bi bi-bag-plus me-2" aria-hidden="true"></i> Add to Cart
              </button>
            </div>

            {added && (
              <div className="alert alert-success d-flex justify-content-between align-items-center py-2" role="status">
                <span>Added to your cart.</span>
                <Link to="/cart" className="fw-semibold">View cart</Link>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-5 pt-5">
            <h2 className="fw-bold h3 mb-4">More in {product.category}</h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </section>
  );
}
