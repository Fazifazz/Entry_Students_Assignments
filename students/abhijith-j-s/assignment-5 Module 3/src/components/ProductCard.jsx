import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";
import StarRating from "./StarRating.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return undefined;
    const timer = setTimeout(() => setJustAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [justAdded]);

  if (!product || product.id === undefined || !product.name) return null;

  const detailPath = `/products/${encodeURIComponent(product.id)}`;
  const onSale = product.originalPrice > product.price;

  const handleAdd = () => {
    addToCart(product);
    setJustAdded(true);
  };

  return (
    <article className="product-card p-3 h-100 d-flex flex-column">
      <Link to={detailPath} className="position-relative mb-4 img-wrapper d-block" aria-label={`View details for ${product.name}`}>
        <img src={product.imageUrl} alt={product.name} className="img-fluid w-100 object-fit-cover product-image" loading="lazy" />
        {product.badge && (
          <span
            className={`position-absolute top-0 end-0 m-3 badge shadow-sm rounded-pill px-3 py-2 fw-semibold ${
              product.badge === "New" ? "bg-success text-white" : "bg-white text-dark"
            }`}
          >
            {product.badge}
          </span>
        )}
      </Link>

      <div className="small text-uppercase text-muted fw-semibold mb-1" style={{ letterSpacing: 1 }}>{product.category}</div>
      <StarRating rating={product.rating} />
      <h3 className="h5 fw-bold my-2">
        <Link to={detailPath} className="text-dark text-decoration-none">{product.name}</Link>
      </h3>
      <p className="text-muted small mb-4 lh-base">{product.description}</p>

      <div className="mt-auto border-top pt-3">
        <div className="mb-3">
          {onSale && <span className="text-muted text-decoration-line-through small me-2">{formatPrice(product.originalPrice)}</span>}
          <span className="fw-bold text-primary fs-5">{formatPrice(product.price)}</span>
        </div>
        <div className="d-flex gap-2">
          <Link to={detailPath} className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2 flex-fill">Details</Link>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 py-2 fw-medium flex-fill ${justAdded ? "btn-success" : "btn-outline-dark btn-add-cart"}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <><i className="bi bi-check2 me-1" aria-hidden="true"></i> Added</>
            ) : (
              <><i className="bi bi-bag-plus me-1" aria-hidden="true"></i> Add</>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
