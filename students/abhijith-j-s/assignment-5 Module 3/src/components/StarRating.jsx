export default function StarRating({ rating }) {
  const value = Math.round((Number(rating) || 0) * 2) / 2;
  return (
    <div className="text-warning fs-6" aria-label={`Rated ${Number(rating).toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const icon = star <= Math.floor(value) ? "bi-star-fill" : star - 0.5 === value ? "bi-star-half" : "bi-star";
        return <i key={star} className={`bi ${icon}`} aria-hidden="true"></i>;
      })}
      <span className="ms-1 small fw-medium text-dark">({Number(rating).toFixed(1)})</span>
    </div>
  );
}
