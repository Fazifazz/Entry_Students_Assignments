export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="alert alert-danger text-center my-5 mx-auto" role="alert" style={{ maxWidth: 560 }}>
      <i className="bi bi-exclamation-triangle-fill fs-3 d-block mb-2" aria-hidden="true"></i>
      <p className="mb-3">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-warm-amber" onClick={onRetry}>
          <i className="bi bi-arrow-clockwise me-1" aria-hidden="true"></i> Try again
        </button>
      )}
    </div>
  );
}
