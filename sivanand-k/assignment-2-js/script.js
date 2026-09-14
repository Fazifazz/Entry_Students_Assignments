// Product Details

const productName = "Wireless Headphones";
const basePrice = 1200;
const discountPercent = 10;
const taxRate = 18;
const stockStatus = "in_stock";

// Calculate price after discount


function calculateDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}

// Calculate tax amount
function calculateTax(price, taxRate) {
    return price * taxRate / 100;
}

// Calculate final price
function calculateFinalPrice(price, discount, taxRate) {
    const discountedPrice = calculateDiscountedPrice(price, discount);
    const tax = calculateTax(discountedPrice, taxRate);

    return discountedPrice + tax;
}

// Check shipping eligibility
function isFreeShipping(finalPrice) {
    if (finalPrice >= 500) {
        return "Free Shipping";
    } else {
        return "Shipping: Rs.49";
    }
}

// Get stock message
function getStockMessage(status) {
    if (status === "in_stock") {
        return "In Stock";
    } else if (status === "limited") {
        return "Limited Stock";
    } else {
        return "Out of Stock";
    }
}

// Function calls
const discountedPrice = calculateDiscountedPrice(
    basePrice,
    discountPercent
);

const tax = calculateTax(
    discountedPrice,
    taxRate
);

const finalPrice = calculateFinalPrice(
    basePrice,
    discountPercent,
    taxRate
);

const shipping = isFreeShipping(finalPrice);

const stockMessage = getStockMessage(stockStatus);

// Price Summary
console.log("----- Price & Discount Calculator -----");
console.log("Product Name:", productName);
console.log("Base Price: Rs." + basePrice);
console.log("Discounted Price: Rs." + discountedPrice);
console.log("Tax: Rs." + tax);
console.log("Final Price: Rs." + finalPrice);
console.log("Shipping:", shipping);
console.log("Stock Status:", stockMessage);