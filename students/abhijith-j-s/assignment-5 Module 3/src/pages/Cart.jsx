import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useProducts } from "../context/ProductsContext.jsx";
import { FREE_SHIPPING_THRESHOLD, TAX_RATE } from "../config.js";
import { formatPrice } from "../utils/format.js";
import CartItem from "../components/CartItem.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function Cart() {
  const { items, itemCount, subtotal, tax, shipping, total, clearCart } = useCart();
  const { status, error, retry } = useProducts();
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  const handleClear = () => {
    if (window.confirm("Remove all items from your cart?")) clearCart();
  };

  if (status === "loading" && itemCount > 0) return <div className="container py-5"><LoadingSpinner label="Loading your cart..." /></div>;
  if (status === "error") return <div className="container py-5"><ErrorMessage message={error} onRetry={retry} /></div>;

  if (items.length === 0) {
    return (
      <section className="container py-5 text-center">
        <i className="bi bi-bag fs-1 text-muted" aria-hidden="true"></i>
        <h1 className="h3 fw-bold mt-3">Your shopping bag is empty</h1>
        <p className="text-muted mb-4">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn btn-warm-amber">Shop Now</Link>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h1 className="fw-bold display-6 mb-0">Your Shopping Bag <span className="text-muted fs-5">({itemCount} {itemCount === 1 ? "item" : "items"})</span></h1>
          <button type="button" className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={handleClear}>
            <i className="bi bi-trash me-1" aria-hidden="true"></i> Clear Cart
          </button>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="bg-white rounded-4 shadow-sm px-3 px-md-4">
              {items.map((item) => <CartItem key={item.product.id} item={item} />)}
            </div>
            <Link to="/products" className="btn btn-outline-dark rounded-pill mt-4">
              <i className="bi bi-arrow-left me-1" aria-hidden="true"></i> Continue Shopping
            </Link>
          </div>

          <div className="col-lg-4">
            <div className="bg-white rounded-4 shadow-sm p-4 position-sticky" style={{ top: 100 }}>
              <h2 className="h5 fw-bold mb-3">Order Summary</h2>
              <dl className="mb-0">
                <div className="d-flex justify-content-between mb-2"><dt className="fw-normal text-muted">Subtotal</dt><dd className="mb-0">{formatPrice(subtotal)}</dd></div>
                <div className="d-flex justify-content-between mb-2"><dt className="fw-normal text-muted">Estimated tax ({Math.round(TAX_RATE * 100)}%)</dt><dd className="mb-0">{formatPrice(tax)}</dd></div>
                <div className="d-flex justify-content-between mb-2"><dt className="fw-normal text-muted">Shipping</dt><dd className="mb-0">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
                <hr />
                <div className="d-flex justify-content-between fs-5 fw-bold"><dt>Total</dt><dd className="mb-0 text-primary">{formatPrice(total)}</dd></div>
              </dl>
              {shipping > 0 && (
                <p className="small text-muted mt-2 mb-0">Free shipping on orders of {formatPrice(FREE_SHIPPING_THRESHOLD)} or more.</p>
              )}
              <button type="button" className="btn btn-warm-amber w-100 mt-4" onClick={() => setCheckoutNotice(true)}>Checkout</button>
              {checkoutNotice && (
                <div className="alert alert-info mt-3 mb-0 small" role="status">
                  Checkout isn't connected yet. Payments and orders will be enabled once the ShopNest backend is integrated — nothing has been charged or placed.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
