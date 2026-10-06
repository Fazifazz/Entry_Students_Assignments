const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.getElementById("categoryButtons");
const noProducts = document.getElementById("noProducts");
const loadingMessage = document.getElementById("loadingMessage");
const errorMessage = document.getElementById("errorMessage");

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartSummary = document.getElementById("cartSummary");
const cartCount = document.getElementById("cartCount");
const summaryItems = document.getElementById("summaryItems");
const cartTotal = document.getElementById("cartTotal");

let products = [];
let cart = JSON.parse(localStorage.getItem("shopnestCart")) || [];
let activeCategory = "All";

document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {
    try {
        const response = await fetch("./products.json");

        if (!response.ok) {
            throw new Error("Could not load products.json");
        }

        products = await response.json();

        loadingMessage.classList.add("d-none");

        renderProducts();
        renderCart();
    } catch (error) {
        console.error(error);
        loadingMessage.classList.add("d-none");
        errorMessage.classList.remove("d-none");
    }
}

function renderProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory =
            activeCategory === "All" || product.category === activeCategory;

        return matchesSearch && matchesCategory;
    });

    productsContainer.innerHTML = "";

    if (filteredProducts.length === 0) {
        noProducts.classList.remove("d-none");
        return;
    }

    noProducts.classList.add("d-none");

    filteredProducts.forEach(product => {
        const productCol = document.createElement("div");
        productCol.className = "col-12 col-sm-6 col-lg-4 col-xl-3";

        const card = document.createElement("article");
        card.className = "product-card";

        const imageWrap = document.createElement("div");
        imageWrap.className = "product-image-wrap";

        const image = document.createElement("img");
        image.className = "product-image";
        image.src = product.imageUrl;
        image.alt = product.name;
        image.loading = "lazy";

        imageWrap.appendChild(image);

        const details = document.createElement("div");
        details.className = "product-details";

        const category = document.createElement("span");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = product.name;

        const rating = document.createElement("div");
        rating.className = "rating";
        rating.innerHTML =
            "★".repeat(Math.round(product.rating)) +
            "☆".repeat(5 - Math.round(product.rating));

        const ratingValue = document.createElement("span");
        ratingValue.textContent = `(${product.rating})`;
        rating.appendChild(ratingValue);

        const priceRow = document.createElement("div");
        priceRow.className = "price-row";

        const originalPrice = document.createElement("span");
        originalPrice.className = "original-price";
        originalPrice.textContent = `₹${product.originalPrice.toFixed(2)}`;

        const price = document.createElement("span");
        price.className = "product-price";
        price.textContent = `₹${product.price.toFixed(2)}`;

        priceRow.append(originalPrice, price);

        const addButton = document.createElement("button");
        addButton.className = "add-cart-btn";
        addButton.type = "button";
        addButton.textContent = "Add to Cart";
        addButton.addEventListener("click", () => addToCart(product.id));

        details.append(category, name, rating, priceRow, addButton);
        card.append(imageWrap, details);
        productCol.appendChild(card);
        productsContainer.appendChild(productCol);
    });
}

searchInput.addEventListener("input", renderProducts);

categoryButtons.addEventListener("click", event => {
    const button = event.target.closest(".filter-btn");

    if (!button) return;

    activeCategory = button.dataset.category;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    renderProducts();
});

document.querySelectorAll(".category-jump").forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.categoryJump;

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.toggle(
                "active",
                btn.dataset.category === activeCategory
            );
        });

        renderProducts();

        document.getElementById("products-section").scrollIntoView({
            behavior: "smooth"
        });
    });
});

function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}

function changeQuantity(productId, change) {
    const item = cart.find(cartItem => cartItem.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem.id !== productId);
    }

    saveCart();
    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem("shopnestCart", JSON.stringify(cart));
}

function renderCart() {
    cartItems.innerHTML = "";

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(cartItem => {
        const product = products.find(item => item.id === cartItem.id);

        if (!product) return;

        totalQuantity += cartItem.quantity;
        totalPrice += product.price * cartItem.quantity;

        const item = document.createElement("div");
        item.className = "cart-item";

        const image = document.createElement("img");
        image.className = "cart-item-image";
        image.src = product.imageUrl;
        image.alt = product.name;

        const content = document.createElement("div");

        const name = document.createElement("p");
        name.className = "cart-item-name";
        name.textContent = product.name;

        const price = document.createElement("span");
        price.className = "cart-item-price";
        price.textContent = `₹${(product.price * cartItem.quantity).toFixed(2)}`;

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const minusButton = document.createElement("button");
        minusButton.className = "quantity-btn";
        minusButton.textContent = "−";
        minusButton.type = "button";
        minusButton.addEventListener("click", () =>
            changeQuantity(product.id, -1)
        );

        const quantity = document.createElement("span");
        quantity.className = "quantity-value";
        quantity.textContent = cartItem.quantity;

        const plusButton = document.createElement("button");
        plusButton.className = "quantity-btn";
        plusButton.textContent = "+";
        plusButton.type = "button";
        plusButton.addEventListener("click", () =>
            changeQuantity(product.id, 1)
        );

        const removeButton = document.createElement("button");
        removeButton.className = "remove-btn";
        removeButton.textContent = "Remove";
        removeButton.type = "button";
        removeButton.addEventListener("click", () =>
            removeFromCart(product.id)
        );

        controls.append(minusButton, quantity, plusButton, removeButton);
        content.append(name, price, controls);
        item.append(image, content);

        cartItems.appendChild(item);
    });

    cartCount.textContent = totalQuantity;
    summaryItems.textContent = totalQuantity;
    cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;

    if (totalQuantity === 0) {
        emptyCart.classList.remove("d-none");
        cartSummary.classList.add("d-none");
    } else {
        emptyCart.classList.add("d-none");
        cartSummary.classList.remove("d-none");
    }
}
