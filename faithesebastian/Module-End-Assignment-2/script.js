/* =====================================================
   SHOPNEST - JAVASCRIPT
   ===================================================== */


/* ================= LOAD CART ================= */

function loadSavedCart() {

    try {

        const savedCart =
            JSON.parse(
                localStorage.getItem('shopnest-cart') || '{}'
            );

        if (
            !savedCart ||
            typeof savedCart !== 'object' ||
            Array.isArray(savedCart)
        ) {
            return {};
        }

        return Object.fromEntries(

            Object.entries(savedCart).filter(
                ([, quantity]) =>
                    Number.isInteger(quantity) &&
                    quantity > 0
            )

        );

    } catch {

        localStorage.removeItem('shopnest-cart');

        return {};
    }
}


/* ================= APPLICATION STATE ================= */

const state = {

    products: [],

    category: 'All',

    search: '',

    cart: loadSavedCart()

};


/* ================= DOM ELEMENTS ================= */

const productGrid =
    document.querySelector('#product-grid');

const cartItems =
    document.querySelector('#cart-items');

const cartCount =
    document.querySelector('#cart-count');

const cartTotal =
    document.querySelector('#cart-total');

const cartTotalWrap =
    document.querySelector('#cart-total-wrap');

const cartMessage =
    document.querySelector('#cart-message');

const searchInput =
    document.querySelector('#search-input');

const categoryFilters =
    document.querySelector('#category-filters');

const cartPanel =
    document.querySelector('#cart-panel');

const cartOpen =
    document.querySelector('#cart-open');

const cartClose =
    document.querySelector('#cart-close');


/* ================= LOGIN ELEMENTS ================= */

const loginPanel =
    document.querySelector('#login-panel');

const loginOpen =
    document.querySelector('#login-open');

const loginClose =
    document.querySelector('#login-close');

const loginForm =
    document.querySelector('#login-form');

const loginMessage =
    document.querySelector('#login-message');


/* ================= MONEY FORMAT ================= */

const money = value =>
    `₹${value.toLocaleString('en-IN')}`;


/* =====================================================
   CART FUNCTIONS
   ===================================================== */


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        'shopnest-cart',
        JSON.stringify(state.cart)
    );

}


/* ================= GET VISIBLE PRODUCTS ================= */

function productMatchesSearch(product, query) {

    const searchableText =
        `${product.name} ${product.category}`.toLowerCase();

    return searchableText.includes(query);
}

function getVisibleProducts() {

    const term =
        state.search.trim().toLowerCase();

    return state.products.filter(product =>

        (
            state.category === 'All' ||
            product.category === state.category
        )

        &&

        productMatchesSearch(product, term)

    );

}


/* ================= RENDER PRODUCTS ================= */

function renderProducts() {

    productGrid.replaceChildren();

    const products =
        getVisibleProducts();


    /* No Products */

    if (!products.length) {

        const empty =
            document.createElement('p');

        empty.className =
            'no-products';

        empty.textContent =
            'No products found';

        productGrid.append(empty);

        return;
    }


    /* Create Product Cards */

    products.forEach(product => {

        const card =
            document.createElement('article');

        card.className =
            'product-card';


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.imageUrl}"
                    alt="${product.name}"
                    loading="lazy">

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>


                <h3 class="product-name">
                    ${product.name}
                </h3>


                <span class="rating">
                    ${product.rating} ★
                </span>


                <div class="price">

                    <span class="old-price">
                        ${money(product.originalPrice)}
                    </span>

                    <span class="new-price">
                        ${money(product.price)}
                    </span>

                </div>


                <button
                    class="add-cart"
                    data-add="${product.id}">

                    <i class="bi bi-cart-plus"></i>

                    Add to Cart

                </button>

            </div>

        `;


        productGrid.append(card);

    });

}


/* ================= RENDER CART ================= */

function renderCart() {

    cartItems.replaceChildren();

    let total = 0;

    let itemCount = 0;

    const entries =
        Object.entries(state.cart);


    /* Empty Cart */

    if (!entries.length) {

        cartMessage.hidden = false;
        cartTotalWrap.hidden = true;

    } else {

        cartMessage.hidden = true;
        cartTotalWrap.hidden = false;


        entries.forEach(
            ([id, quantity]) => {

                const product =
                    state.products.find(
                        item =>
                            item.id === Number(id)
                    );


                /* Remove invalid products */

                if (
                    !product ||
                    !Number.isInteger(quantity) ||
                    quantity <= 0
                ) {

                    delete state.cart[id];

                    return;
                }


                total +=
                    product.price * quantity;

                itemCount += quantity;


                /* Cart Row */

                const row =
                    document.createElement('div');

                row.className =
                    'cart-item';


                row.innerHTML = `

                    <img
                        src="${product.imageUrl}"
                        alt="${product.name}">


                    <div class="cart-item-info">

                        <strong>
                            ${product.name}
                        </strong>

                        <span>
                            ${money(product.price)}
                        </span>

                    </div>


                    <div class="quantity-controls">

                        <button
                            data-action="decrease"
                            data-id="${id}"
                            aria-label="Decrease quantity"
                            ${quantity <= 1 ? 'disabled' : ''}>

                            −

                        </button>


                        <span>
                            ${quantity}
                        </span>


                        <button
                            data-action="increase"
                            data-id="${id}"
                            aria-label="Increase quantity"
                            ${quantity >= 10 ? 'disabled' : ''}>

                            +

                        </button>

                    </div>


                    <button
                        class="remove-item"
                        data-action="remove"
                        data-id="${id}">

                        Remove

                    </button>

                `;


                cartItems.append(row);

            }
        );

    }


    saveCart();


    /* Cart Count */

    cartCount.textContent =
        itemCount;

    cartCount.hidden =
        itemCount === 0;

    if (itemCount === 0) {
        cartCount.setAttribute('aria-hidden', 'true');
    } else {
        cartCount.removeAttribute('aria-hidden');
    }


    /* Cart Total */

    cartTotal.textContent =
        money(total);

}


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const product =
        state.products.find(
            item => item.id === Number(id)
        );


    if (!product) {
        return null;
    }


    /* Maximum 10 per product */

    if ((state.cart[id] || 0) >= 10) {

        return null;
    }


    state.cart[id] =
        (state.cart[id] || 0) + 1;


    saveCart();

    renderCart();

    return product;

}


/* ================= CART ALERT ================= */

function showCartAlert(product) {

    Swal.fire({
        toast: true,
        position: 'top-end',
        customClass: {
            container: 'cart-alert-container'
        },
        icon: 'success',
        title: `${product.name} added to cart`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });

}


/* =====================================================
   PRODUCT GRID EVENTS
   ===================================================== */

productGrid.addEventListener(
    'click',
    event => {

        const button =
            event.target.closest('[data-add]');


        if (button) {

            const product = addToCart(
                button.dataset.add
            );

            if (product) {
                showCartAlert(product);
            }

        }

    }
);


/* =====================================================
   CART EVENTS
   ===================================================== */

cartItems.addEventListener(
    'click',
    event => {

        const button =
            event.target.closest('[data-action]');


        if (!button) {
            return;
        }


        const {
            id,
            action
        } = button.dataset;


        if (!state.cart[id]) {
            return;
        }


        /* Increase */

        if (
            action === 'increase' &&
            state.cart[id] < 10
        ) {

            state.cart[id]++;

        }


        /* Decrease */

        if (action === 'decrease') {

            state.cart[id]--;

        }


        /* Remove */

        if (
            action === 'remove' ||
            state.cart[id] <= 0
        ) {

            delete state.cart[id];

        }


        saveCart();

        renderCart();

    }
);


/* =====================================================
   SEARCH
   ===================================================== */

searchInput.addEventListener(
    'input',
    event => {

        state.search =
            event.target.value;

        renderProducts();

    }
);


/* =====================================================
   CATEGORY FILTER
   ===================================================== */

categoryFilters.addEventListener(
    'click',
    event => {

        const button =
            event.target.closest(
                '[data-category]'
            );


        if (!button) {
            return;
        }


        state.category =
            button.dataset.category;


        /* Active Button */

        document
            .querySelectorAll('[data-category]')
            .forEach(item => {

                item.classList.toggle(
                    'active',
                    item === button
                );

            });


        renderProducts();

    }
);


/* =====================================================
   CART MODAL
   ===================================================== */


/* Open Cart */

cartOpen.addEventListener(
    'click',
    () => {

        cartPanel.showModal();

    }
);


/* Close Cart */

cartClose.addEventListener(
    'click',
    () => {

        cartPanel.close();

    }
);


/* Close Cart When Clicking Outside */

cartPanel.addEventListener(
    'click',
    event => {

        if (
            event.target ===
            event.currentTarget
        ) {

            event.currentTarget.close();

        }

    }
);


/* =====================================================
   LOGIN MODAL
   ===================================================== */


/* Open Login */

loginOpen.addEventListener(
    'click',
    () => {

        loginMessage.textContent = '';

        loginPanel.showModal();

    }
);


/* Close Login */

loginClose.addEventListener(
    'click',
    () => {

        loginPanel.close();

    }
);


/* Close Login When Clicking Outside */

loginPanel.addEventListener(
    'click',
    event => {

        if (
            event.target ===
            event.currentTarget
        ) {

            event.currentTarget.close();

        }

    }
);


/* =====================================================
   LOGIN FORM
   ===================================================== */

loginForm.addEventListener(
    'submit',
    event => {

        event.preventDefault();


        const email =
            document.querySelector(
                '#login-email'
            ).value.trim();


        const password =
            document.querySelector(
                '#login-password'
            ).value;


        /* Basic Validation */

        if (!email || !password) {

            loginMessage.textContent =
                'Please enter email and password.';

            loginMessage.style.color =
                '#c62828';

            return;
        }


        /* Demo Login */

        loginMessage.textContent =
            `Welcome back! Login submitted for ${email}.`;

        loginMessage.style.color =
            '#2e8b3c';


        /* Clear Password */

        document.querySelector(
            '#login-password'
        ).value = '';

    }
);


/* =====================================================
   LOAD PRODUCTS
   ===================================================== */

async function loadProducts() {

    try {

        const response =
            await fetch('./products.json');


        if (!response.ok) {

            throw new Error(
                'Product data could not be loaded'
            );

        }


        state.products =
            await response.json();


        renderProducts();

        renderCart();

    } catch (error) {

        console.error(error);


        productGrid.innerHTML = `

            <p class="no-products">

                Unable to load products.
                Please refresh and try again.

            </p>

        `;

    }

}


/* =====================================================
   START APPLICATION
   ===================================================== */

loadProducts();