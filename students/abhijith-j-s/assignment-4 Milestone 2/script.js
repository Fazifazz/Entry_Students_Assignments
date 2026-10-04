(() => {
    const CART_STORAGE_KEY = "shopnest-cart";
    const validCategories = new Set(["Electronics", "Clothing", "Footwear", "Books"]);
    const productContainer = document.querySelector("#product-container");
    const productStatus = document.querySelector("#product-status");
    const searchInput = document.querySelector("#product-search");
    const categoryButtons = [...document.querySelectorAll(".category-filter")];
    const cartItemsContainer = document.querySelector("#cart-items");
    const cartCountElement = document.querySelector("#cart-count");
    const cartTotalElement = document.querySelector("#cart-total");

    let products = [];
    let activeCategory = "All";
    let cart = loadCart();

    const formatPrice = (amount) => new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amount);

    function loadCart() {
        try {
            const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
            if (!Array.isArray(savedCart)) return [];

            return savedCart
                .filter((item) => item && item.id !== undefined && Number.isInteger(item.quantity) && item.quantity > 0)
                .map((item) => ({ id: String(item.id), quantity: item.quantity }));
        } catch {
            return [];
        }
    }

    function saveCart() {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch {
            productStatus.textContent = "Your cart could not be saved on this device.";
            productStatus.hidden = false;
        }
    }

    function filterProducts() {
        const searchTerm = searchInput.value.trim().toLocaleLowerCase();

        return products.filter((product) => {
            const matchesName = product.name.toLocaleLowerCase().includes(searchTerm);
            const matchesCategory = activeCategory === "All" || product.category === activeCategory;
            return matchesName && matchesCategory;
        });
    }

    function makeStarRating(rating) {
        const wrapper = document.createElement("div");
        wrapper.className = "mb-2 text-warning fs-6";
        const roundedRating = Math.round(rating * 2) / 2;

        for (let star = 1; star <= 5; star += 1) {
            const icon = document.createElement("i");
            icon.className = star <= Math.floor(roundedRating)
                ? "bi bi-star-fill"
                : star - 0.5 === roundedRating ? "bi bi-star-half" : "bi bi-star";
            wrapper.append(icon);
        }

        const ratingLabel = document.createElement("span");
        ratingLabel.className = "text-muted ms-1 small fw-medium text-dark";
        ratingLabel.textContent = `(${Number(rating).toFixed(1)})`;
        wrapper.append(ratingLabel);
        return wrapper;
    }

    function createProductCard(product) {
        const column = document.createElement("div");
        column.className = "col-md-6 col-lg-4";

        const card = document.createElement("article");
        card.className = "product-card p-3 h-100 d-flex flex-column";

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "position-relative mb-4 img-wrapper";
        const image = document.createElement("img");
        image.src = product.imageUrl;
        image.alt = product.name;
        image.className = "img-fluid w-100 object-fit-cover product-image";
        image.loading = "lazy";
        imageWrapper.append(image);

        if (product.badge) {
            const badge = document.createElement("span");
            badge.className = product.badge === "New"
                ? "position-absolute top-0 end-0 m-3 badge bg-success text-white shadow-sm rounded-pill px-3 py-2 fw-semibold"
                : "position-absolute top-0 end-0 m-3 badge bg-white text-dark shadow-sm rounded-pill px-3 py-2 fw-semibold";
            badge.textContent = product.badge;
            imageWrapper.append(badge);
        }

        const title = document.createElement("h3");
        title.className = "h5 fw-bold mb-2 text-dark";
        title.textContent = product.name;

        const description = document.createElement("p");
        description.className = "text-muted small mb-4 lh-base";
        description.textContent = product.description || `${product.category} essential, carefully selected for everyday comfort.`;

        const footer = document.createElement("div");
        footer.className = "d-flex align-items-center justify-content-between mt-auto border-top pt-3 gap-2";
        const priceGroup = document.createElement("div");
        if (product.originalPrice > product.price) {
            const originalPrice = document.createElement("span");
            originalPrice.className = "text-muted text-decoration-line-through small me-2";
            originalPrice.textContent = formatPrice(product.originalPrice);
            priceGroup.append(originalPrice);
        }
        const price = document.createElement("span");
        price.className = "fw-bold text-primary fs-5";
        price.textContent = formatPrice(product.price);
        priceGroup.append(price);

        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.className = "btn btn-sm btn-outline-dark rounded-pill px-4 py-2 fw-medium btn-add-cart";
        addButton.dataset.productId = product.id;
        addButton.setAttribute("aria-label", `Add ${product.name} to cart`);
        addButton.innerHTML = '<i class="bi bi-bag-plus me-1" aria-hidden="true"></i> Add';

        footer.append(priceGroup, addButton);
        card.append(imageWrapper, makeStarRating(product.rating), title, description, footer);
        column.append(card);
        return column;
    }

    function renderProducts() {
        const filteredProducts = filterProducts();
        productContainer.replaceChildren(...filteredProducts.map(createProductCard));
        productContainer.setAttribute("aria-busy", "false");
        productStatus.hidden = filteredProducts.length > 0;
        productStatus.textContent = filteredProducts.length ? "" : "No products found";
    }

    function updateCartCount() {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = itemCount;
        cartCountElement.setAttribute("aria-label", `${itemCount} items in cart`);
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => {
            const product = products.find((entry) => String(entry.id) === item.id);
            return product ? sum + product.price * item.quantity : sum;
        }, 0);
        cartTotalElement.textContent = formatPrice(total);
    }

    function renderCart() {
        const fragment = document.createDocumentFragment();
        const availableCart = cart.filter((item) => products.some((product) => String(product.id) === item.id));
        if (availableCart.length !== cart.length) {
            cart = availableCart;
            saveCart();
        }

        if (cart.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "text-center text-muted my-4";
            emptyMessage.textContent = "Your shopping bag is empty.";
            fragment.append(emptyMessage);
        }

        cart.forEach((item) => {
            const product = products.find((entry) => String(entry.id) === item.id);
            if (!product) return;

            const row = document.createElement("div");
            row.className = "cart-item d-flex justify-content-between align-items-center gap-3 py-3 border-bottom";
            const details = document.createElement("div");
            details.className = "flex-grow-1";
            const name = document.createElement("h3");
            name.className = "h6 fw-bold mb-1";
            name.textContent = product.name;
            const price = document.createElement("p");
            price.className = "small text-muted mb-0";
            price.textContent = `${formatPrice(product.price)} each`;
            const subtotal = document.createElement("p");
            subtotal.className = "small fw-semibold text-primary mb-0 mt-1";
            subtotal.textContent = `Subtotal: ${formatPrice(product.price * item.quantity)}`;
            details.append(name, price, subtotal);

            const controls = document.createElement("div");
            controls.className = "cart-controls d-flex flex-column align-items-end gap-2";
            const quantityControls = document.createElement("div");
            quantityControls.className = "d-flex align-items-center gap-2";
            const decreaseButton = createCartButton("-", "decrease", item.id, `Decrease ${product.name} quantity`);
            const quantity = document.createElement("span");
            quantity.className = "fw-semibold text-center cart-quantity";
            quantity.textContent = item.quantity;
            quantity.setAttribute("aria-label", `Quantity ${item.quantity}`);
            const increaseButton = createCartButton("+", "increase", item.id, `Increase ${product.name} quantity`);
            quantityControls.append(decreaseButton, quantity, increaseButton);
            controls.append(quantityControls, createCartButton("Remove", "remove", item.id, `Remove ${product.name} from cart`));
            row.append(details, controls);
            fragment.append(row);
        });

        cartItemsContainer.replaceChildren(fragment);
        updateCartCount();
        updateCartTotal();
    }

    function createCartButton(label, action, productId, ariaLabel) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = action === "remove" ? "btn btn-sm btn-link text-danger p-0" : "btn btn-sm btn-outline-dark cart-quantity-button";
        button.textContent = label;
        button.dataset.action = action;
        button.dataset.productId = productId;
        button.setAttribute("aria-label", ariaLabel);
        return button;
    }

    function addToCart(productId) {
        const id = String(productId);
        const existingItem = cart.find((item) => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, quantity: 1 });
        }
        saveCart();
        renderCart();
    }

    function removeFromCart(productId) {
        cart = cart.filter((item) => item.id !== String(productId));
        saveCart();
        renderCart();
    }

    function updateQuantity(productId, change) {
        const item = cart.find((entry) => entry.id === String(productId));
        if (!item) return;
        item.quantity += change;
        if (item.quantity <= 0) removeFromCart(productId);
        else {
            saveCart();
            renderCart();
        }
    }

    async function fetchProducts() {
        productContainer.setAttribute("aria-busy", "true");
        productStatus.textContent = "Loading products...";
        productStatus.hidden = false;

        try {
            const response = await fetch("./products.json");
            if (!response.ok) throw new Error(`Product request failed with status ${response.status}`);
            const data = await response.json();
            if (!Array.isArray(data) || data.length < 12 || !data.every((product) => (
                product.id !== undefined && product.name && validCategories.has(product.category) &&
                Number.isFinite(product.price) && Number.isFinite(product.originalPrice) &&
                Number.isFinite(product.rating) && product.imageUrl
            ))) {
                throw new Error("The product catalog is incomplete or invalid.");
            }

            products = data;
            renderProducts();
            renderCart();
        } catch (error) {
            productContainer.setAttribute("aria-busy", "false");
            productStatus.textContent = "Products could not be loaded. Please try again from a local web server.";
            productStatus.hidden = false;
            console.error("Unable to load ShopNest products:", error);
        }
    }

    searchInput.addEventListener("input", renderProducts);

    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.category;
            categoryButtons.forEach((categoryButton) => {
                const isActive = categoryButton === button;
                categoryButton.classList.toggle("active", isActive);
                categoryButton.setAttribute("aria-pressed", String(isActive));
            });
            renderProducts();
        });
    });

    productContainer.addEventListener("click", (event) => {
        const addButton = event.target.closest(".btn-add-cart");
        if (addButton) addToCart(addButton.dataset.productId);
    });

    cartItemsContainer.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const { action, productId } = button.dataset;
        if (action === "increase") updateQuantity(productId, 1);
        if (action === "decrease") updateQuantity(productId, -1);
        if (action === "remove") removeFromCart(productId);
    });

    updateCartCount();
    fetchProducts();
})();
