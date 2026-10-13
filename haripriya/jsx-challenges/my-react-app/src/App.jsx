import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";

const isLoggedIn = true
const products = [
  { id: 1, name: "Wireless Headphones", price: 2499, rating: 4.6, inStock: true },
  { id: 2, name: "Smart Watch", price: 4999, rating: 4.6, inStock: true },
  { id: 3, name: "Mobile Phones", price: 78999, rating: 2.6, inStock: false },
  { id: 4, name: "Laptop", price: 123999, rating: 5.6, inStock: true },
  { id: 5, name: "Charger", price: 1099, rating: 4.6, inStock: true },
];

function App() {
  return (
    <div >
      <Navbar />

      <HeroSection />
      {isLoggedIn && <p>Hi Haripriya..</p>}
      {isLoggedIn ? <p>Hi Haripriya..</p> : <p>Please login</p>}
      <div className="products d-flex justify-content-between">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
            inStock={product.inStock}
          />
        ))}
      </div>
    </div>
  );
}

export default App