import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, emptyMessage = "No products found" }) {
  if (!products.length) {
    return (
      <div className="text-center text-muted py-5" role="status">
        <i className="bi bi-search fs-1 d-block mb-2" aria-hidden="true"></i>
        <p className="mb-0">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-md-6 col-lg-4" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
