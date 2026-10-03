
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    originalPrice: 3999,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 3299,
    originalPrice: 4999,
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 1899,
    originalPrice: 2799,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 1499,
    originalPrice: 2299,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 5,
    name: "Classic Cotton T-Shirt",
    category: "Clothing",
    price: 799,
    originalPrice: 1299,
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 6,
    name: "Everyday Denim Jacket",
    category: "Clothing",
    price: 2199,
    originalPrice: 3299,
    rating: 4.7,
    imageUrl: "https://img77.uenicdn.com/image/upload/v1531933073/service_images/shutterstock_647008975.jpg"
  },
  {
    id: 7,
    name: "Comfort Hoodie",
    category: "Clothing",
    price: 1399,
    originalPrice: 1999,
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 8,
    name: "Running Shoes",
    category: "Footwear",
    price: 2199,
    originalPrice: 3499,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 9,
    name: "Casual Sneakers",
    category: "Footwear",
    price: 1799,
    originalPrice: 2599,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 10,
    name: "Classic Leather Shoes",
    category: "Footwear",
    price: 2899,
    originalPrice: 4199,
    rating: 4.6,
    imageUrl: "https://jutapasal.com/cdn/shop/files/classic-brown-cap-toe-oxford-shoes-gs119dress-shoes-3599339.jpg?v=1773314775&width=1024"
  },
  {
    id: 11,
    name: "The Creative Mind",
    category: "Books",
    price: 499,
    originalPrice: 799,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 12,
    name: "Stories for Better Days",
    category: "Books",
    price: 599,
    originalPrice: 899,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=85"
  }
];

async function loadProducts() {
  try {
    const response = await fetch("./products.json");

    if (!response.ok) {
      throw new Error("Products JSON could not be loaded");
    }

    products = await response.json();
  } catch (error) {
    console.warn("Using fallback products:", error);

    products = FALLBACK_PRODUCTS;
  }

  renderProducts();
  renderCart();
}

let products = [];
let cart = [];
try { cart = JSON.parse(localStorage.getItem('shopnestCart') || '[]'); } catch (e) { cart = []; }
let activeCategory = 'All';
let searchTerm = '';
let sortBy = 'default';

const productGrid = document.getElementById('productGrid');
const noProducts = document.getElementById('noProducts');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');
const cartItems = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const toastEl = document.getElementById('cartToast');
const toastBody = toastEl?.querySelector('.toast-body');
const newsletterForm = document.getElementById('newsletterForm');
const sortSelect = document.getElementById('sortProducts');
const checkoutButton = document.querySelector('.checkout-btn');
const cartSummary = document.querySelector('.cart-summary');

const formatMoney = amount => `₹${Number(amount).toLocaleString('en-IN')}`;

function showToast(message, icon = 'bi-check-circle-fill') {
  if (!toastEl || typeof bootstrap === 'undefined') return;
  if (toastBody) {
    toastBody.innerHTML = `<i class="bi ${icon}"></i> ${message}`;
  }
  bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 1800 }).show();
}

/* ================= FETCH PRODUCT DATA ================= */
async function loadProducts() {
  try {
    const response = await fetch('./products.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Product data is empty.');
    }

    products = data;
    renderProducts();
    renderCart();
  } catch (error) {
    // file:// pages can block fetch(). Keep the Fetch API implementation,
    // but use the same product data as a local fallback so the storefront
    // still works when index.html is opened directly.
    console.warn('products.json could not be fetched; using local fallback.', error);
    products = FALLBACK_PRODUCTS.slice();
    renderProducts();
    renderCart();
  }
}

/* ================= FILTER + SORT ================= */
function getFilteredProducts() {
  let filtered = products.filter(product => {
    const name = String(product.name || '').toLowerCase();
    const query = searchTerm.toLowerCase();
    const matchesSearch = name.includes(query);
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  return filtered;
}

/* ================= PRODUCT CARD ================= */
function createProductCard(product) {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-lg-4';

  const card = document.createElement('article');
  card.className = 'product-card';

  const imageWrap = document.createElement('div');
  imageWrap.className = 'product-image';

  const image = document.createElement('img');
  image.src = product.imageUrl;
  image.alt = product.name;
  image.loading = 'lazy';
  image.onerror = () => {
    image.src = `https://placehold.co/900x700/f4effa/6f4aa8?text=${encodeURIComponent(product.name)}`;
  };
  imageWrap.appendChild(image);

  if (product.originalPrice > product.price) {
    const sale = document.createElement('span');
    sale.className = 'sale-badge';
    sale.textContent = 'SALE';
    imageWrap.appendChild(sale);
  }

  const info = document.createElement('div');
  info.className = 'product-info';

  const category = document.createElement('small');
  category.textContent = product.category;

  const title = document.createElement('h3');
  title.textContent = product.name;

  const rating = document.createElement('div');
  rating.className = 'rating';
  rating.innerHTML = `${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))} <span>${Number(product.rating).toFixed(1)}</span>`;

  const price = document.createElement('div');
  price.className = 'price';
  price.innerHTML = `
    ${product.originalPrice > product.price ? `<span class="old-price">${formatMoney(product.originalPrice)}</span>` : ''}
    <strong>${formatMoney(product.price)}</strong>`;

  const addButton = document.createElement('button');
  addButton.className = 'add-cart';
  addButton.type = 'button';
  addButton.innerHTML = '<i class="bi bi-cart-plus"></i> Add to Cart';
  addButton.addEventListener('click', () => addToCart(product.id));

  info.append(category, title, rating, price, addButton);
  card.append(imageWrap, info);
  col.appendChild(card);
  return col;
}

/* ================= RENDER PRODUCTS ================= */
function renderProducts() {
  if (!productGrid) return;

  const filtered = getFilteredProducts();
  productGrid.innerHTML = '';

  filtered.forEach(product => {
    productGrid.appendChild(createProductCard(product));
  });

  const hasResults = filtered.length > 0;
  noProducts.classList.toggle('d-none', hasResults);
  resultCount.textContent = hasResults
    ? `${filtered.length} product${filtered.length === 1 ? '' : 's'} available`
    : '';

  if (!hasResults) {
    noProducts.querySelector('h3').textContent = 'No products available';
    noProducts.querySelector('p').textContent = searchTerm
      ? `No products match “${searchTerm}”${activeCategory !== 'All' ? ` in ${activeCategory}` : ''}.`
      : `No products are available in ${activeCategory}.`;
  }
}

/* ================= CART ================= */
function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) existing.quantity += 1;
  else cart.push({ id: productId, quantity: 1 });

  syncCart();
  showToast(`${product.name} added to cart.`);
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
    showToast('Product removed from cart.', 'bi-trash3');
  }
  syncCart();
}

function removeFromCart(productId) {
  const product = products.find(item => item.id === productId);
  cart = cart.filter(item => item.id !== productId);
  syncCart();
  showToast(`${product?.name || 'Product'} removed from cart.`, 'bi-trash3');
}

function clearCart() {
  if (!cart.length) return;
  cart = [];
  syncCart();
  showToast('Cart cleared.', 'bi-cart-x');
}

function syncCart() {
  try {
    localStorage.setItem('shopnestCart', JSON.stringify(cart));
  } catch (e) {
    console.warn('Local storage is unavailable in this browser/context.');
  }
  renderCart();
}

function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;

  if (products.length) {
    if (products.length) {
    cart = cart.filter(item => products.some(product => product.id === item.id));
  }
  }

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;

    const lineTotal = product.price * item.quantity;
    total += lineTotal;
    count += item.quantity;

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}" onerror="this.src='https://placehold.co/150x150/f4effa/6f4aa8?text=ShopNest'">
      <div class="cart-item-details">
        <h4>${product.name}</h4>
        <div class="unit-price">${formatMoney(product.price)} each</div>
        <div class="quantity">
          <button type="button" class="qty-minus" aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button type="button" class="qty-plus" aria-label="Increase quantity">+</button>
        </div>
        <button type="button" class="remove-btn">Remove</button>
      </div>
      <div class="line-total">${formatMoney(lineTotal)}</div>`;

    row.querySelector('.qty-minus').addEventListener('click', () => updateQuantity(item.id, -1));
    row.querySelector('.qty-plus').addEventListener('click', () => updateQuantity(item.id, 1));
    row.querySelector('.remove-btn').addEventListener('click', () => removeFromCart(item.id));
    cartItems.appendChild(row);
  });

  cartCount.textContent = count;
  cartTotal.textContent = formatMoney(total);
  emptyCart.classList.toggle('d-none', count > 0);
  cartSummary.classList.toggle('d-none', count === 0);

  const existingClear = document.getElementById('clearCartButton');
  if (existingClear) existingClear.remove();

  if (count > 0) {
    const clearButton = document.createElement('button');
    clearButton.id = 'clearCartButton';
    clearButton.className = 'clear-cart-btn';
    clearButton.type = 'button';
    clearButton.textContent = 'Clear Cart';
    clearButton.addEventListener('click', clearCart);
    cartSummary.prepend(clearButton);
  }
}

/* ================= SEARCH ================= */
searchInput?.addEventListener('input', event => {
  searchTerm = event.target.value.trim();
  renderProducts();
});

document.getElementById('headerSearchForm')?.addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  renderProducts();
});

/* ================= CATEGORY FILTER ================= */
document.getElementById('categoryFilters')?.addEventListener('click', event => {
  const button = event.target.closest('.filter-btn');
  if (!button) return;

  activeCategory = button.dataset.category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn === button);
  });
  renderProducts();
});

document.querySelectorAll('.category-shortcut').forEach(button => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === activeCategory);
    });
    renderProducts();
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ================= SORT ================= */
sortSelect?.addEventListener('change', event => {
  sortBy = event.target.value;
  renderProducts();
});

/* ================= NEWSLETTER ================= */
newsletterForm?.addEventListener('submit', event => {
  event.preventDefault();
  const email = newsletterForm.querySelector('input[type="email"]');
  if (!email.value.trim()) return;

  showToast('Subscribed successfully! Welcome to ShopNest.', 'bi-envelope-check-fill');
  newsletterForm.reset();
});

/* ================= CHECKOUT ================= */
checkoutButton?.addEventListener('click', () => {
  if (!cart.length) {
    showToast('Your cart is empty.', 'bi-cart-x');
    return;
  }
  showToast('Checkout is ready. Thank you for shopping with ShopNest!', 'bi-bag-check-fill');
});

/* ================= INITIALIZE ================= */
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  loadProducts();
});
