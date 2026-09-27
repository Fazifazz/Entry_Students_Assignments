// --- STATE MANAGEMENT ---
let products = [];
let cart = [];
let activeCategory = 'All';
let searchQuery = '';

// --- DOM ELEMENTS ---
const productGrid = document.getElementById('productGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const noProductsMessage = document.getElementById('noProductsMessage');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const searchInput = document.getElementById('searchInput');
const categoryButtons = document.getElementById('categoryButtons');

const cartToggle = document.getElementById('cartToggle');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    loadCartFromStorage();
    setupEventListeners();
    await fetchProducts();
}

// --- DATA FETCHING ---
async function fetchProducts() {
    try {
        // Simulate network delay for loading effect (optional, makes it look more realistic)
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        products = await response.json();
        
        // Hide spinner
        loadingSpinner.style.display = 'none';
        
        renderProducts();
    } catch (error) {
        console.error("Failed to fetch products:", error);
        productGrid.innerHTML = `<div class="no-results">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <h2>Failed to load products</h2>
            <p>Please check your connection and try again later.</p>
        </div>`;
    }
}

// --- RENDERING ---
function renderProducts() {
    // Filter products based on search and category
    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Clear grid (except spinner if it was there)
    productGrid.innerHTML = '';

    // Handle 'No products found' state
    if (filteredProducts.length === 0) {
        noProductsMessage.classList.remove('hidden');
        productGrid.style.display = 'none';
    } else {
        noProductsMessage.classList.add('hidden');
        productGrid.style.display = 'grid';
        
        // Render each product
        filteredProducts.forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image-container">
                    <span class="product-category-badge">${product.category}</span>
                    <img src="${product.imageUrl}" alt="${product.name}" class="product-image" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <i class="fa-solid fa-star"></i>
                        <span>${product.rating}</span>
                    </div>
                    <div class="product-price-container">
                        <div>
                            <span class="price">₹${product.price.toFixed(2)}</span>
                            ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            `;
            productGrid.appendChild(card);
        });
        
        // Attach event listeners to new buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                addToCart(id);
            });
        });
    }
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderProducts();
    });

    // Category filtering
    categoryButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Update active styling
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            // Update state and render
            activeCategory = e.target.getAttribute('data-category');
            renderProducts();
        }
    });

    // Reset filters button
    resetFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        activeCategory = 'All';
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if(btn.getAttribute('data-category') === 'All') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        renderProducts();
    });

    // Cart Sidebar Toggle
    cartToggle.addEventListener('click', () => cartOverlay.classList.add('open'));
    closeCartBtn.addEventListener('click', () => cartOverlay.classList.remove('open'));
    
    // Close cart when clicking outside sidebar
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('open');
        }
    });
}

// --- CART LOGIC ---
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    
    // Animate cart badge
    cartCount.classList.add('bump');
    setTimeout(() => cartCount.classList.remove('bump'), 300);
}

function updateCartQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        
        // Remove item if quantity becomes 0
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    saveCartToStorage();
    renderCart();
    updateCartTotal();
    updateCartBadge();
}

function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty.</div>';
        return;
    }

    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₹${total.toFixed(2)}`;
}

function updateCartBadge() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// --- LOCAL STORAGE ---
function saveCartToStorage() {
    localStorage.setItem('shopNestCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const storedCart = localStorage.getItem('shopNestCart');
    if (storedCart) {
        try {
            cart = JSON.parse(storedCart);
            renderCart();
            updateCartTotal();
            updateCartBadge();
        } catch (e) {
            console.error('Failed to parse cart from local storage', e);
            cart = [];
        }
    }
}
