// Product variables
let name = "Wireless Headphones";
let basePrice = 1200;
let discountPercent = 20;
let taxRate = 18;
let stockStatus = "in_stock";

// Function to calculate discounted price
function calculateDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}

// Function to calculate tax amount
function calculateTax(price, taxRate) {
    return price * taxRate / 100;
}

// Function to calculate final price
function calculateFinalPrice(price, discount, taxRate) {
    let discountedPrice = calculateDiscountedPrice(price, discount);
    let taxAmount = calculateTax(discountedPrice, taxRate);

    return discountedPrice + taxAmount;
}

// Function to check shipping status
function isFreeShipping(finalPrice) {
    if (finalPrice >= 500) {
        return "Free Shipping";
    } else {
        return "Shipping: Rs.49";
    }
}

// Function to get stock message
function getStockMessage(status) {
    if (status === "in_stock") {
        return "In Stock";
    } else if (status === "limited") {
        return "Limited Stock";
    } else if (status === "out_of_stock") {
        return "Out of Stock";
    }
}

// Calculate values using the product variables
let discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
let taxAmount = calculateTax(discountedPrice, taxRate);
let finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
let shippingStatus = isFreeShipping(finalPrice);
let stockMessage = getStockMessage(stockStatus);

// Print complete price summary
console.log("----- Price & Discount Summary -----");
console.log("Product Name: " + name);
console.log("Base Price: Rs." + basePrice);
console.log("Discount Percentage: " + discountPercent + "%");
console.log("Discounted Price: Rs." + discountedPrice);
console.log("Tax Rate: " + taxRate + "%");
console.log("Tax Amount: Rs." + taxAmount);
console.log("Final Price: Rs." + finalPrice);
console.log("Shipping Status: " + shippingStatus);
console.log("Stock Status: " + stockMessage);