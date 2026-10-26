import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="pt-5 pb-4">
      <div className="container py-4">
        <div className="row g-5 mb-5">
          <div className="col-lg-4 pe-lg-5">
            <div className="d-flex align-items-center gap-2 mb-4">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                <i className="bi bi-house-heart-fill" aria-hidden="true"></i>
              </div>
              <span className="brand-font fs-4 text-white">ShopNest</span>
            </div>
            <p className="text-secondary mb-0 lh-lg">The warm, digital-first sanctuary for curated lifestyle shopping. Zero clutter, 100% quality-vetted goods.</p>
          </div>

          <div className="col-6 col-lg-2">
            <h2 className="text-white fs-6 mb-4 fw-bold text-uppercase" style={{ letterSpacing: 1 }}>Quick Links</h2>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
              <li><Link to="/products">Shop All</Link></li>
              <li><Link to="/cart">Your Cart</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h2 className="text-white fs-6 mb-4 fw-bold text-uppercase" style={{ letterSpacing: 1 }}>Support Hub</h2>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
              <li><a href="mailto:support@shopnest.com" className="d-flex align-items-center gap-2"><i className="bi bi-envelope" aria-hidden="true"></i> support@shopnest.com</a></li>
              <li><a href="tel:+18005550199" className="d-flex align-items-center gap-2"><i className="bi bi-telephone" aria-hidden="true"></i> +1 (800) 555-0199</a></li>
              <li className="text-secondary mt-2 lh-base"><i className="bi bi-geo-alt me-2 text-white" aria-hidden="true"></i>Thirumala, Trivandrum, Kerala</li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h2 className="text-white fs-6 mb-4 fw-bold text-uppercase" style={{ letterSpacing: 1 }}>Nest Guarantee</h2>
            <p className="text-secondary lh-lg mb-0">Every item passing through ShopNest is vetted for longevity, ethical manufacture, and zero-waste packaging protocols.</p>
          </div>
        </div>
        <hr className="border-secondary opacity-25 my-4" />
        <p className="text-secondary small mb-0 text-center text-md-start">&copy; 2026 ShopNest. All rights reserved.</p>
      </div>
    </footer>
  );
}
