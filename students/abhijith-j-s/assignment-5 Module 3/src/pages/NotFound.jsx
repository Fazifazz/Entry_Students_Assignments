import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container py-5 text-center">
      <p className="display-1 fw-bold text-primary mb-0">404</p>
      <h1 className="h3 fw-bold">Page not found</h1>
      <p className="text-muted mb-4">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn btn-warm-amber">Back to Home</Link>
    </section>
  );
}
