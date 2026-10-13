// ================= SHOPNEST JAVASCRIPT =================

// Products
let products = [];

// Cart
let cart = JSON.parse(
    localStorage.getItem("shopnest-cart") || "[]"
);

// Current category
let activeCategory = "All";


// ================= DOM ELEMENTS =================

const productGrid =
    document.querySelector("#product-grid");

const productStatus =
    document.querySelector("#product-status");

const searchInput =
    document.querySelector("#product-search");

const searchForm =
    document.querySelector("#search-form");

const filterButtons =
    document.querySelectorAll("[data-category]");

const cartItems =
    document.querySelector("#cart-items");

const cartTotal =
    document.querySelector("#cart-total");

const cartCount =
    document.querySelector("#cart-count");

const headerCartCount =
    document.querySelector("#header-cart-count");


// ================= FORMAT PRICE =================

function formatPrice(price) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price);

}


// ================= CREATE STARS =================

function createRating(rating) {

    let stars = "";

    const starCount =
        Math.round(rating);


    for (let i = 0; i < 5; i++) {

        if (i < starCount) {

            stars += `
                <i
                    class="fa-solid fa-star"
                    aria-hidden="true"
                ></i>
            `;

        } else {

            stars += `
                <i
                    class="fa-regular fa-star"
                    aria-hidden="true"
                ></i>
            `;
        }
    }


    return stars;
}


// ================= DISPLAY PRODUCTS =================

function renderProducts() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    const visibleProducts =
        products.filter((product) => {

            const matchesName =
                product.name
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesCategory =
                activeCategory === "All" ||
                product.category === activeCategory;


            return matchesName &&
                matchesCategory;
        });


    productGrid.innerHTML = "";


    if (visibleProducts.length === 0) {

        productStatus.textContent =
            "No products found";

        return;
    }


    productStatus.textContent = "";


    visibleProducts.forEach((product) => {

        productGrid.innerHTML += `

            <div class="col-12 col-sm-6 col-md-4 col-lg-3">

                <article class="ft-outer p-3 h-100">

                    <img
                        src="${product.imageUrl}"
                        alt="${product.name}"
                        class="product-image"
                        loading="lazy"
                    >

                    <div class="ft-details">

                        <p class="mb-2 item-name">
                            ${product.name}
                        </p>


                        <p class="product-category">
                            ${product.category}
                        </p>


                        <div class="product-rating">

                            <span class="rating-stars">
                                ${createRating(product.rating)}
                            </span>

                            ${product.rating.toFixed(1)} / 5

                        </div>


                        <div class="price-details d-flex flex-wrap align-items-baseline gap-2 mt-2">

                            <strong class="price">
                                ${formatPrice(product.price)}
                            </strong>

                            <s class="text-muted">
                                ${formatPrice(product.originalPrice)}
                            </s>

                        </div>


                        <div class="cart-cta">

                            <button
                                type="button"
                                class="fw-medium"
                                data-add-to-cart="${product.id}"
                            >
                                Add to Cart
                            </button>

                        </div>

                    </div>

                </article>

            </div>

        `;
    });
}


// ================= SAVE CART =================

function saveCart() {

    localStorage.setItem(
        "shopnest-cart",
        JSON.stringify(cart)
    );
}


// ================= DISPLAY CART =================

function renderCart() {

    // Remove invalid products
    cart = cart.filter((item) =>
        products.some(
            (product) =>
                product.id === item.id
        )
    );


    cartItems.innerHTML = "";


    let total = 0;

    let itemCount = 0;


    cart.forEach((item) => {

        const product =
            products.find(
                (product) =>
                    product.id === item.id
            );


        if (!product) {
            return;
        }


        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;

        itemCount += item.quantity;


        cartItems.innerHTML += `

            <div class="cart-row">

                <span class="cart-product-name">
                    ${product.name}
                </span>


                <span class="cart-product-price">
                    ${formatPrice(itemTotal)}
                </span>


                <div class="quantity-controls">

                    <button
                        type="button"
                        class="quantity-button"
                        data-cart-action="decrease"
                        data-product-id="${product.id}"
                    >
                        -
                    </button>


                    <span class="cart-quantity">
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        class="quantity-button"
                        data-cart-action="increase"
                        data-product-id="${product.id}"
                    >
                        +
                    </button>


                    <button
                        type="button"
                        class="cart-remove"
                        data-cart-action="remove"
                        data-product-id="${product.id}"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;
    });


    // Empty cart
    if (
        cart.length === 0 &&
        products.length > 0
    ) {

        cartItems.innerHTML = `
            <p class="cart-empty">
                Your cart is empty.
            </p>
        `;
    }


    // Cart count
    cartCount.textContent =
        String(itemCount);


    headerCartCount.textContent =
        String(itemCount);


    // Cart total
    cartTotal.textContent =
        formatPrice(total);


    saveCart();
}


// ================= ADD TO CART =================

productGrid.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(
                "[data-add-to-cart]"
            );


        if (!button) {
            return;
        }


        const productId =
            Number(
                button.dataset.addToCart
            );


        const existingItem =
            cart.find(
                (item) =>
                    item.id === productId
            );


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
);


// ================= CART BUTTONS =================

cartItems.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(
                "[data-cart-action]"
            );


        if (!button) {
            return;
        }


        const productId =
            Number(
                button.dataset.productId
            );


        const action =
            button.dataset.cartAction;


        const item =
            cart.find(
                (item) =>
                    item.id === productId
            );


        if (!item) {
            return;
        }


        // Increase
        if (action === "increase") {

            item.quantity += 1;
        }


        // Decrease
        if (action === "decrease") {

            item.quantity -= 1;


            if (item.quantity <= 0) {

                cart = cart.filter(
                    (item) =>
                        item.id !== productId
                );
            }
        }


        // Remove
        if (action === "remove") {

            cart = cart.filter(
                (item) =>
                    item.id !== productId
            );
        }


        saveCart();

        renderCart();
    }
);


// ================= SEARCH =================

searchInput.addEventListener(
    "input",
    () => {

        renderProducts();

    }
);


// ================= SEARCH FORM =================

searchForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        renderProducts();

    }
);


// ================= CATEGORY FILTER =================

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                activeCategory =
                    button.dataset.category;


                filterButtons.forEach(
                    (filter) => {

                        const isActive =
                            filter === button;


                        filter.classList.toggle(
                            "active",
                            isActive
                        );


                        filter.setAttribute(
                            "aria-pressed",
                            String(isActive)
                        );

                    }
                );


                renderProducts();

            }
        );
    }
);


// ================= LOAD PRODUCTS =================

async function loadProducts() {

    try {

        const response =
            await fetch("products.json");


        if (!response.ok) {

            throw new Error(
                "Unable to load products"
            );
        }


        products =
            await response.json();


        renderProducts();

        renderCart();


    } catch (error) {

        console.error(error);

        productStatus.textContent =
            "Products could not be loaded. Please try again.";
    }
}


// ================= START =================

loadProducts();