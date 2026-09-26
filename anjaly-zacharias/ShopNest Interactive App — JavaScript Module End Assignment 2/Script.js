// ==========================
// GLOBAL VARIABLES
// ==========================
let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedCategory = "All";

// ==========================
// FETCH PRODUCTS (ASYNC)
// ==========================
async function loadProducts() {
  try {
    const res = await fetch("products.json");
    products = await res.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

loadProducts();

// ==========================
// RENDER PRODUCTS (DOM)
// ==========================
function renderProducts(data) {
  const container = document.getElementById("products");
  const noResults = document.getElementById("no-results");

  container.innerHTML = "";

  if (data.length === 0) {
    noResults.style.display = "block";
    return;
  } else {
    noResults.style.display = "none";
  }

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.imageUrl}" alt="${p.name}">
      <h3>${p.name}</h3>

      <p class="price">
        ₹${p.price} 
        <span class="old-price">₹${p.originalPrice}</span>
      </p>

      <p>⭐ ${p.rating}</p>

      <p style="color:green; font-size:14px;">
        ${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF
      </p>

      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;

    container.appendChild(div);
  });
}

// ==========================
// SEARCH + FILTER
// ==========================
document.getElementById("search").addEventListener("input", filterProducts);

document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.category;
    filterProducts();
  });
});

function filterProducts() {
  const searchValue = document.getElementById("search").value.toLowerCase();

  const filtered = products.filter(p => {
    return (
      p.name.toLowerCase().includes(searchValue) &&
      (selectedCategory === "All" || p.category === selectedCategory)
    );
  });

  renderProducts(filtered);
}

// ==========================
// CART FUNCTIONS
// ==========================
function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
}

// ==========================
// UPDATE CART UI + STORAGE
// ==========================
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  const cartDiv = document.getElementById("cart");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cart-count");

  cartDiv.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const div = document.createElement("div");

    div.innerHTML = `
      <p>${item.name}</p>

      <button onclick="changeQty(${item.id}, -1)">-</button>
      ${item.qty}
      <button onclick="changeQty(${item.id}, 1)">+</button>

      <button onclick="removeItem(${item.id})">Remove</button>
      <hr>
    `;

    cartDiv.appendChild(div);
  });

  totalEl.innerText = total;
  countEl.innerText = count;
}

// ==========================
// CHANGE QUANTITY
// ==========================
function changeQty(id, change) {
  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  updateCart();
}

// ==========================
// REMOVE ITEM
// ==========================
function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  updateCart();
}

// ==========================
// CART TOGGLE (PREMIUM UI)
// ==========================
function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("active");
}

// ==========================
// INITIAL LOAD
// ==========================
updateCart();