const STORAGE_KEY = "shopnest.cart.v1";
const CATEGORIES = ["All", "Electronics", "Clothing", "Footwear", "Books"];

const productsGrid = document.getElementById("products-grid");
const noResults = document.getElementById("no-results");
const searchInput = document.getElementById("search-input");
const filters = document.getElementById("category-filters");
const cartCount = document.getElementById("cart-count");
const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
const cartPanel = document.getElementById("cart-panel");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const toast = document.getElementById("toast");

const state = {
  products: [],
  cart: loadCart(),
  activeCategory: "All",
  searchQuery: "",
};

// data loading
async function loadProducts() {
  try {
    const res = await fetch("product.json");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Expected an array");
    state.products = data;

    render();
  } catch (error) {
    showError(`Could not load products: ${error.message}`);
    console.error(error);
  }
}

// show error
function showError(msg) {
  productsGrid.innerHTML = "";
  noResults.textContent = msg;
  noResults.classList.remove("hidden");
}

// filtering
function getFilteredProducts() {
  const q = state.searchQuery.trim().toLowerCase();
  return state.products.filter((p) => {
    const matchesCategory =
      state.activeCategory === "All" || p.category === state.activeCategory;
    const matchesSearch = !q || p.name.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}

// render filters
function renderFilters() {
  filters.innerHTML = "";

  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "filter-btn" + (cat === state.activeCategory ? " active" : "");
    btn.textContent = cat;

    btn.addEventListener("click", () => {
      state.activeCategory = cat;

      renderFilters();
      renderProducts();
    });

    filters.appendChild(btn);
  });
}

// build product-card
function buildProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.id = product.id;

  const img = document.createElement("img");
  img.className = "product-image";
  img.src = product.imageUrl;
  img.alt = product.name;

  const body = document.createElement("div");
  body.className = "product-body";

  const cat = document.createElement("div");
  cat.className = "product-category";
  cat.textContent = product.category;

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.name;

  const rating = document.createElement("div");
  rating.className = "product-rating";
  rating.textContent = renderStars(product.rating);

  const priceRow = document.createElement("div");
  priceRow.className = "product-price-row";

  const price = document.createElement("span");
  price.className = "product-price";
  price.textContent = `₹${product.price}`;

  if (product.originalPrice > product.price) {
    const originalPrice = document.createElement("span");
    originalPrice.className = "product-original-price";

    originalPrice.textContent = `₹${product.originalPrice}`;
    priceRow.append(price, originalPrice);

    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    );
    if (discount > 0) {
      const badge = document.createElement("span");
      badge.className = "discount-badge";
      badge.textContent = `${discount}% `;
      priceRow.append(badge);
    }
  } else {
    priceRow.append(price);
  }
  const btn = document.createElement("button");
  btn.className = "add-to-cart-btn";
  btn.textContent = "Add to Cart";
  btn.addEventListener("click", () => addToCart(product.id));
  body.append(cat, name, rating, priceRow, btn);
  card.append(img, body);

  return card;
}

// render stars
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    "\u2605".repeat(full) +
    (half ? "\u00BD" : "") +
    "\u2606".repeat(5 - full - (half ? 1 : 0))
  );
}

// render products
function renderProducts() {
  const products = getFilteredProducts();

  productsGrid.innerHTML = "";

  if (products.length == 0) {
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");

  products.forEach((product) => {
    const card = buildProductCard(product);
    productsGrid.appendChild(card);
  });
}

// save cart
function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
  } catch (err) {
    console.warn("Failed to save cart to localStorage:", err);
  }
}
// load  cart
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Failed to load cart from localStorage:", err);
    return [];
  }
}

// add to cart
function addToCart(productID) {
  const existing = state.cart.find((item) => item.id == productID);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: productID,
      qty: 1,
    });
  }
  saveCart();
  renderCart();
  showToast("Added to cart");
}

// change quantity
function changeQty(productId, delta) {
  const item = state.cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter((i) => i.id !== productId);
  }
  saveCart();
  renderCart();
}

// remove product from cart
function removeFromCart(productId) {
  state.cart = state.cart.filter((i) => i.id !== productId);
  saveCart();
  renderCart();
}

// find product
function findProduct(productId) {
  return state.products.find((p) => p.id === productId);
}

// render cart
function renderCart() {
  updateCartCount();
  renderCartPanel();
}

// update cart count
function updateCartCount() {
  const total = state.cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = String(total);
}

// render cart panel
function renderCartPanel() {
  cartItems.innerHTML = "";

  if (state.cart.length == 0) {
    const empty = document.createElement("p");
    empty.className = "cart-empty";
    empty.textContent = "Your Cart Is Empty";
    cartItems.appendChild(empty);
    cartTotal.textContent = "₹0.00";
    return;
  }

  const cartCard = document.createElement("div");
  let total = 0;

  state.cart.forEach((item) => {
    const product = findProduct(item.id);
    if (!product) return; // product removed from catalog; skip
    const lineTotal = product.price * item.qty;
    total += lineTotal;

    const row = document.createElement("div");
    row.className = "cart-item";

    const img = document.createElement("img");
    img.className = "cart-item-image";
    img.src = product.imageUrl;
    img.alt = product.name;

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const name = document.createElement("div");
    name.className = "cart-item-name";
    name.textContent = product.name;

    const price = document.createElement("div");
    price.className = "cart-item-price";
    price.textContent = `₹${product.price.toFixed(2)} each`;

    info.append(name, price);

    const controls = document.createElement("div");
    controls.className = "cart-item-controls";

    const minus = document.createElement("button");
    minus.className = "qty-btn";
    minus.type = "button";
    minus.setAttribute("aria-label", "Decrease quantity");
    minus.textContent = "-";
    minus.addEventListener("click", () => changeQty(item.id, -1));

    const qty = document.createElement("span");
    qty.className = "cart-item-qty";
    qty.textContent = String(item.qty);

    const plus = document.createElement("button");
    plus.className = "qty-btn";
    plus.type = "button";
    plus.setAttribute("aria-label", "Increase quantity");
    plus.textContent = "+";
    plus.addEventListener("click", () => changeQty(item.id, +1));

    const remove = document.createElement("button");
    remove.className = "remove-btn";
    remove.type = "button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => removeFromCart(item.id));

    controls.append(minus, qty, plus, remove);
    row.append(img, info, controls);
    cartCard.appendChild(row);
  });
  cartItems.appendChild(cartCard);
  cartTotal.textContent = `₹${total}`;
}

//Cart Panel Toggle
function openCart() {
  cartPanel.classList.add("open");
}

function closeCart() {
  cartPanel.classList.remove("open");
}

// toast
let toastTimer = null;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

//Event Wiring
function attachEvents() {
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  });

  cartToggle.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);

  checkoutBtn.addEventListener("click", () => {
    if (state.cart.length === 0) return;
    showToast("Checkout successful! Thank you for shopping.");
    state.cart = [];
    saveCart();
    renderCart();
  });
}
// render initially
function render() {
  renderFilters();
  renderProducts();
  renderCart();
}
document.addEventListener("DOMContentLoaded", () => {
  attachEvents();
  loadProducts();
});
