export default function LoadingSpinner({ label = "Loading products..." }) {
  return (
    <div className="text-center py-5" role="status" aria-live="polite">
      <div className="spinner-border text-primary" aria-hidden="true"></div>
      <p className="text-muted mt-3 mb-0">{label}</p>
    </div>
  );
}
