// ================= SHOPNEST JAVASCRIPT =================

// Products are loaded from products.json using Fetch API.
let products = [];

// Cart is restored from localStorage when the page loads.
let cart = JSON.parse(localStorage.getItem("shopnestCart") || "[]");

// Current filter values
let searchText = "";
let selectedCategory = "All";


// ================= DOM ELEMENTS =================

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const categoryFilters = document.getElementById("category-filters");
const noProducts = document.getElementById("no-products");

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const emptyCart = document.getElementById("empty-cart");
const cartSummary = document.getElementById("cart-summary");

const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");


// ================= FETCH PRODUCTS =================

const loadProducts = async () => {
    try {
        const response = await fetch("products.json");

        if (!response.ok) {
            throw new Error("Unable to load products.");
        }

        products = await response.json();
        renderProducts();
        renderCart();

    } catch (error) {
        console.error("Error loading products:", error);

        productContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">
                    Products could not be loaded. Please try again.
                </p>
            </div>
        `;
    }
};


// ================= DISPLAY RATING =================

const createRating = (rating) => {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars = stars + '<i class="bi bi-star-fill"></i>';
        } else {
            stars = stars + '<i class="bi bi-star"></i>';
        }
    }

    return stars;
};


// ================= RENDER PRODUCTS =================

const renderProducts = () => {

    const filteredProducts = products.filter((product) => {

        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchText.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    productContainer.innerHTML = "";

    if (filteredProducts.length === 0) {
        noProducts.hidden = false;
        return;
    }

    noProducts.hidden = true;

    filteredProducts.forEach((product) => {

        const productColumn = document.createElement("div");
        productColumn.className = "col-12 col-md-6 col-lg-4";

        productColumn.innerHTML = `
            <article class="product-card">

                <div class="product-image">
                    <img
                        src="${product.imageUrl}"
                        alt="${product.name}">
                </div>

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p class="rating">
                        ${createRating(product.rating)}
                    </p>

                    <p class="price">
                        <del>₹${product.originalPrice.toLocaleString("en-IN")}</del>

                        <strong>
                            ₹${product.price.toLocaleString("en-IN")}
                        </strong>
                    </p>

                    <button
                        class="add-to-cart"
                        data-id="${product.id}"
                        type="button">
                        Add to Cart
                    </button>

                </div>

            </article>
        `;

        productContainer.appendChild(productColumn);
    });
};


// ================= LIVE SEARCH =================

searchInput.addEventListener("input", (event) => {

    searchText = event.target.value.trim();

    renderProducts();
});


// ================= SEARCH FORM =================

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderProducts();
});


// ================= CATEGORY FILTER =================

categoryFilters.addEventListener("click", (event) => {

    const button = event.target.closest(".filter-btn");

    if (!button) {
        return;
    }

    selectedCategory = button.dataset.category;

    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    renderProducts();
});


// ================= CATEGORY CARDS =================

document.querySelectorAll(".category-filter-link").forEach((button) => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        document.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.classList.toggle(
                "active",
                btn.dataset.category === selectedCategory
            );
        });

        renderProducts();

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });
    });
});


// ================= ADD TO CART =================

productContainer.addEventListener("click", (event) => {

    const button = event.target.closest(".add-to-cart");

    if (!button) {
        return;
    }

    const productId = Number(button.dataset.id);

    addToCart(productId);
});


const addToCart = (productId) => {

    const existingItem = cart.find(
        (item) => item.id === productId
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {

        const product = products.find(
            (item) => item.id === productId
        );

        if (!product) {
            return;
        }

        cart.push({
            id: product.id,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
};


// ================= SAVE CART =================

const saveCart = () => {
    localStorage.setItem(
        "shopnestCart",
        JSON.stringify(cart)
    );
};


// ================= RENDER CART =================

const renderCart = () => {

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {

        emptyCart.style.display = "block";
        cartSummary.style.display = "none";

    } else {

        emptyCart.style.display = "none";
        cartSummary.style.display = "block";

        cart.forEach((cartItem) => {

            const product = products.find(
                (item) => item.id === cartItem.id
            );

            if (!product) {
                return;
            }

            const itemTotal = product.price * cartItem.quantity;
                total = total + itemTotal;
                itemCount = itemCount + cartItem.quantity;

            const cartElement = document.createElement("div");
            cartElement.className = "cart-item";

            cartElement.innerHTML = `
                <img
                    class="cart-item-image"
                    src="${product.imageUrl}"
                    alt="${product.name}">

                <div class="cart-item-info">

                    <h6>${product.name}</h6>

                    <div class="cart-item-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </div>

                    <div class="quantity-controls">

                        <button
                            class="quantity-btn"
                            data-action="decrease"
                            data-id="${product.id}"
                            type="button">
                            -
                        </button>

                        <span>${cartItem.quantity}</span>

                        <button
                            class="quantity-btn"
                            data-action="increase"
                            data-id="${product.id}"
                            type="button">
                            +
                        </button>

                    </div>

                    <button
                        class="remove-btn"
                        data-action="remove"
                        data-id="${product.id}"
                        type="button">
                        Remove
                    </button>

                </div>
            `;

            cartItems.appendChild(cartElement);
        });
    }

    cartCount.textContent = itemCount;
    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;
};


// ================= CART BUTTONS =================

cartItems.addEventListener("click", (event) => {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const productId = Number(button.dataset.id);
    const action = button.dataset.action;

    const cartItem = cart.find(
        (item) => item.id === productId
    );

    if (!cartItem) {
        return;
    }

    if (action === "increase") {
        cartItem.quantity++;
    }

    if (action === "decrease") {
        cartItem.quantity--;

        if (cartItem.quantity <= 0) {
            cart = cart.filter(
                (item) => item.id !== productId
            );
        }
    }

    if (action === "remove") {
        cart = cart.filter(
            (item) => item.id !== productId
        );
    }

    saveCart();
    renderCart();
});


// ================= NEWSLETTER =================

newsletterForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (email === "") {
        alert("Please enter your email address.");
        return;
    }

    if (!newsletterEmail.checkValidity()) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Thank you for subscribing!");
    newsletterForm.reset();
});


// ================= CHECKOUT =================

document.getElementById("checkout-btn").addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    alert("Checkout is ready!");
});


// ================= START APP =================

loadProducts();

