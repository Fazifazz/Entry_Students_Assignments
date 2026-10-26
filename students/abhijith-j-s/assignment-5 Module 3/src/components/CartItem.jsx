import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { product, quantity, lineTotal } = item;

  return (
    <div className="cart-item d-flex flex-column flex-sm-row gap-3 align-items-sm-center py-3 border-bottom">
      <img src={product.imageUrl} alt={product.name} className="rounded-3 object-fit-cover flex-shrink-0" style={{ width: 96, height: 96 }} />

      <div className="flex-grow-1">
        <h3 className="h6 fw-bold mb-1">
          <Link to={`/products/${encodeURIComponent(product.id)}`} className="text-dark text-decoration-none">{product.name}</Link>
        </h3>
        <p className="small text-muted mb-0">{product.category} · {formatPrice(product.price)} each</p>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button type="button" className="btn btn-sm btn-outline-dark cart-quantity-button" onClick={() => decreaseQuantity(product.id)} aria-label={`Decrease ${product.name} quantity`}>
          <i className="bi bi-dash" aria-hidden="true"></i>
        </button>
        <span className="fw-semibold text-center cart-quantity" aria-label={`Quantity ${quantity}`}>{quantity}</span>
        <button type="button" className="btn btn-sm btn-outline-dark cart-quantity-button" onClick={() => increaseQuantity(product.id)} aria-label={`Increase ${product.name} quantity`}>
          <i className="bi bi-plus" aria-hidden="true"></i>
        </button>
      </div>

      <div className="text-sm-end" style={{ minWidth: 100 }}>
        <div className="fw-bold text-primary">{formatPrice(lineTotal)}</div>
        <button type="button" className="btn btn-sm btn-link text-danger p-0" onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.name} from cart`}>
          Remove
        </button>
      </div>
    </div>
  );
}
