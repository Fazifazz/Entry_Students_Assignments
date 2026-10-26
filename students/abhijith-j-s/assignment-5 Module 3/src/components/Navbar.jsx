import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Products" },
  { to: "/cart", label: "Cart" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (event) => {
    event.preventDefault();
    const term = query.trim();
    navigate(term ? `/products?q=${encodeURIComponent(term)}` : "/products");
    closeMenu();
  };

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-shopnest py-3" aria-label="Main navigation">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={closeMenu}>
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 40, height: 40 }}>
              <i className="bi bi-house-heart-fill" aria-hidden="true"></i>
            </div>
            <span className="brand-font fs-4 text-dark mb-0">ShopNest</span>
          </Link>

          <div className="d-flex align-items-center gap-2 order-lg-last">
            <Link to="/cart" className="position-relative text-dark text-decoration-none p-2 d-lg-none" aria-label={`Cart, ${itemCount} items`} onClick={closeMenu}>
              <i className="bi bi-bag fs-5" aria-hidden="true"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary shadow-sm cart-badge">{itemCount}</span>
            </Link>
            <button
              className="navbar-toggler border-0 shadow-none"
              type="button"
              aria-controls="navbarNav"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className={`collapse navbar-collapse justify-content-between${menuOpen ? " show" : ""}`} id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4">
              {LINKS.map(({ to, label, end }) => (
                <li className="nav-item" key={to}>
                  <NavLink to={to} end={end} onClick={closeMenu} className={({ isActive }) => `nav-link fw-medium nav-link-shopnest${isActive ? " active-link" : ""}`}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center gap-4">
              <form onSubmit={handleSearch} role="search" className="flex-grow-1">
                <label htmlFor="nav-search" className="visually-hidden">Search products</label>
                <input
                  id="nav-search"
                  type="search"
                  className="form-control search-pill form-control-sm border-0"
                  style={{ minWidth: 220 }}
                  placeholder="Find quality goods..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
              <Link to="/cart" className="position-relative text-dark text-decoration-none p-2 d-none d-lg-inline-block" aria-label={`Open cart, ${itemCount} items`}>
                <i className="bi bi-bag fs-5" aria-hidden="true"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary shadow-sm cart-badge">{itemCount}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
