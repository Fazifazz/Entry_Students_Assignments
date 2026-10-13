let products = [];
const API_URL = "http://localhost:3000/products";

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await response.json();

    console.log("Products loaded:", products);

    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
fetchProducts();

let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const cartSummary = document.querySelector(".cart-summary");

function renderProducts(productsToRender) {
  productList.innerHTML = "";
  // No products found
  if (productsToRender.length === 0) {
    const message = document.createElement("div");

    message.className = "no-data col-12 text-center py-5";

    message.textContent = "No products found";

    productList.appendChild(message);

    return;
  }

  productsToRender.forEach((product) => {
    // Create column
    const article = document.createElement("article");
    article.className = "col-sm-6 col-lg-4";

    // Create card
    const card = document.createElement("div");
    card.className = "card product-card h-100";

    // Create image
    const image = document.createElement("img");
    image.src = product.imageUrl;
    image.className = "card-img-top";
    image.alt = product.name;

    // Create card body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";

    // Category
    const category = document.createElement("p");
    category.className = "small text-muted mb-1";
    category.textContent = product.category;

    // Product name
    const title = document.createElement("h3");
    title.className = "h5 card-title";
    title.textContent = product.name;

    // Rating
    const rating = document.createElement("p");
    rating.className = "rating mb-2";
    rating.setAttribute("aria-label", `${product.rating} out of 5 stars`);

    // Create stars
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i");

      if (product.rating >= i) {
        star.className = "bi bi-star-fill";
      } else if (product.rating >= i - 0.5) {
        star.className = "bi bi-star-half";
      } else {
        star.className = "bi bi-star";
      }

      rating.appendChild(star);
    }

    // Review count
    const reviewCount = document.createElement("span");
    reviewCount.className = "text-muted small";
    reviewCount.textContent = `(${product.reviews})`;

    rating.appendChild(reviewCount);

    // Price container
    const priceContainer = document.createElement("div");
    priceContainer.className =
      "d-flex align-items-center justify-content-between";

    // Price
    const price = document.createElement("p");
    price.className = "mb-0";

    const oldPrice = document.createElement("span");
    oldPrice.className = "old-price text-muted";
    oldPrice.textContent = product.originalPrice;

    const currentPrice = document.createElement("strong");
    currentPrice.className = "text-primary";
    currentPrice.textContent = product.price;

    price.appendChild(oldPrice);
    price.appendChild(currentPrice);

    // Add to cart button
    const buttonAddCart = document.createElement("button");
    const itemAddMsg = document.querySelector(".msg-iemadded");
    buttonAddCart.className = "btn btn-outline-primary mt-auto";
    buttonAddCart.type = "button";

    const cartIcon = document.createElement("i");
    cartIcon.className = "bi bi-cart-plus me-2";

    buttonAddCart.appendChild(cartIcon);
    buttonAddCart.appendChild(document.createTextNode("Add to Cart"));

    buttonAddCart.addEventListener("click", () => {
      addToCart(product.id);
      itemAddMsg.style.display = "flex";
      buttonAddCart.textContent = "Go to Cart";
      buttonAddCart.addEventListener("click", () => {
        cartPopup.style.display = "block";
      });
      setTimeout(() => {
        itemAddMsg.style.display = "none";
      }, 1000);
    });

    // Put price and button together
    priceContainer.appendChild(price);
    priceContainer.appendChild(buttonAddCart);

    // Put everything inside card body
    cardBody.appendChild(category);
    cardBody.appendChild(title);
    cardBody.appendChild(rating);
    cardBody.appendChild(priceContainer);

    // Put image and body inside card
    card.appendChild(image);
    card.appendChild(cardBody);

    // Put card inside article
    article.appendChild(card);

    // Put article inside product list
    productList.appendChild(article);
  });
}

// Render products
renderProducts(products);

const searchInput = document.getElementById("search-input");
// searchInput.addEventListener("input", (event) => {
//   const searchText = event.target.value.toLowerCase().trim();
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchText),
//   );

//   renderProducts(filteredProducts);
// });

const categoryButtons = document.querySelectorAll(".category-btn");

let selectedCategory = "All";
let searchText = "";

function filterProducts() {
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filteredProducts);
}

// Live search
searchInput.addEventListener("input", (event) => {
  searchText = event.target.value.toLowerCase().trim();

  filterProducts();
});

// Category filter
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    categoryButtons.forEach((btn) => {
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-outline-primary");
    });

    button.classList.remove("btn-outline-primary");
    button.classList.add("btn-primary");

    filterProducts();
  });
});

function addToCart(productId) {
  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    //existingProduct.quantity++;
  } else {
    const product = products.find((item) => item.id === productId);

    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart();
  renderCart();
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);

  if (!item) {
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter((item) => item.id !== productId);
  }
  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

// function updateCartTotal() {
//   const cartTotal = document.getElementById("cart-total");

//   const total = cart.reduce((sum, item) => {
//     return sum + item.price * item.quantity;
//   }, 0);

//   cartTotal.textContent = `₹${total}`;
// }
function renderCart() {
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.textContent = "Your cart is empty.";
    cartList.classList.add("no-data");
    cartTotal.textContent = "₹0";
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");

    cartItem.className = "cart-list-item";

    // Product name
    const productInfo = document.createElement("div");

    const productName = document.createElement("h5");
    productName.className = "mb-1";
    productName.textContent = item.name;

    const productPrice = document.createElement("p");
    productPrice.className = "text-muted mb-0";
    productPrice.textContent = `₹${item.price}`;

    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);

    // Quantity controls
    const quantityControls = document.createElement("div");

    quantityControls.className = "d-flex align-items-center gap-2";

    // Minus button
    const minusButton = document.createElement("button");

    minusButton.type = "button";
    minusButton.className = "btn btn-outline-secondary";

    minusButton.textContent = "−";

    minusButton.addEventListener("click", () => {
      updateQuantity(item.id, -1);
    });

    // Quantity
    const quantity = document.createElement("span");

    quantity.className = "fw-bold px-2";
    quantity.textContent = item.quantity;

    // Plus button
    const plusButton = document.createElement("button");

    plusButton.type = "button";
    plusButton.className = "btn btn-outline-secondary";

    plusButton.textContent = "+";

    plusButton.addEventListener("click", () => {
      updateQuantity(item.id, 1);
    });

    quantityControls.appendChild(minusButton);
    quantityControls.appendChild(quantity);
    quantityControls.appendChild(plusButton);

    // Item total
    const itemTotal = document.createElement("strong");

    itemTotal.textContent = `₹${item.price * item.quantity}`;
    // Cart item total
    const countEl = document.querySelector(".count");

    countEl.textContent = cart.length;

    // Remove button
    const removeButton = document.createElement("button");

    removeButton.type = "button";
    removeButton.className = "btn btn-outline-danger";

    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
      removeFromCart(item.id);
    });

    // Add everything to cart item
    cartItem.appendChild(productInfo);
    cartItem.appendChild(quantityControls);
    cartItem.appendChild(itemTotal);
    cartItem.appendChild(removeButton);

    cartList.appendChild(cartItem);
  });

  updateCartTotalPrice();
}

function updateCartTotalPrice() {
  const cartTotal = document.getElementById("cart-total");

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  cartTotal.textContent = `₹${total}`;
}

const btnCart = document.querySelector(".btn-cart");
const cartPopup = document.getElementById("cart-section");
btnCart.addEventListener("click", () => {
  cartPopup.style.display = "block";
  if (cart.length === 0) {
    cartList.textContent = "Your cart is empty.";
    cartList.classList.add("no-data");
    cartSummary.classList.add("d-none");
    return;
  }
});

const btnCartClose = document.querySelector(".cart-close");
btnCartClose.addEventListener("click", () => {
  cartPopup.style.display = "none";
});

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
// Initial display
renderProducts(products);

// Restore saved cart and display it
renderCart();
