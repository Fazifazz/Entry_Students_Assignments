
function ProductCard({ name, price, rating, inStock }) {
    return (
        <div className="product-card">
            <h3>{name}</h3>
            <p>Rs.{price.toLocaleString()}</p>
            <p>{rating}</p>
            <button disabled={!inStock}>Add to Cart</button>

        </div>
    )
}
export default ProductCard;
