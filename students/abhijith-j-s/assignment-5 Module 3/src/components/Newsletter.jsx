import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Demo only: no newsletter backend is connected yet.
    setDone(true);
    setEmail("");
  };

  return (
    <aside className="py-5 bg-white border-top border-bottom">
      <div className="container py-4 text-center">
        <span className="badge bg-primary text-white rounded-pill px-3 py-2 mb-3 fw-medium">Join the Nest</span>
        <h2 className="fw-bold mb-3 display-6">10% Off Your First Order</h2>
        <p className="text-muted mb-4 fs-5 mx-auto" style={{ maxWidth: 500 }}>
          Subscribe to receive curated drops, quiet design thoughts, and special member access.
        </p>
        <form onSubmit={handleSubmit} className="input-group mb-3 shadow-sm rounded-pill p-1 bg-white border mx-auto" style={{ maxWidth: 450 }}>
          <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            className="form-control border-0 rounded-pill py-2 ps-4 shadow-none"
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => { setEmail(e.target.value); setDone(false); }}
          />
          <button className="btn btn-warm-amber rounded-pill px-4 m-1" type="submit">Subscribe</button>
        </form>
        {done && (
          <p className="text-success fw-medium mb-2" role="status">
            Thanks! This is a demo form — no email was stored or sent.
          </p>
        )}
        <small className="text-muted fw-medium"><i className="bi bi-shield-check me-1" aria-hidden="true"></i> No clutter, zero spam. Unsubscribe anytime.</small>
      </div>
    </aside>
  );
}
