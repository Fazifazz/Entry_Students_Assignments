// Product Variables
const productName = "CR7 Jersey";
const basePrice = 1000;
const discountPercent = 20;
const taxRate = 18;
const stockStatus = "in_stock";

// Calculate Discounted Price
function calculateDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}

// Calculate Tax
function calculateTax(price, taxRate) {
    return price * taxRate / 100;
}

// Calculate Final Price
function calculateFinalPrice(price, discount, taxRate) {
    const discountedPrice = calculateDiscountedPrice(price, discount);
    const taxAmount = calculateTax(discountedPrice, taxRate);

    return discountedPrice + taxAmount;
}

// Free Shipping Check
function isFreeShipping(finalPrice) {
    if (finalPrice >= 500) {
        return "Free Shipping";
    } else {
        return "Shipping: Rs.49";
    }
}

// Stock Message
function getStockMessage(status) {
    if (status === "in_stock") {
        return "In Stock";
    } else if (status === "limited") {
        return "Limited Stock";
    } else {
        return "Out of Stock";
    }
}

// Function Calls
const discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
const taxAmount = calculateTax(discountedPrice, taxRate);
const finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
const shipping = isFreeShipping(finalPrice);
const stockMessage = getStockMessage(stockStatus);

// Console Output
console.log("===== PRODUCT SUMMARY =====");
console.log("Product Name:", productName);
console.log("Base Price: Rs.", basePrice);
console.log("Discount:", discountPercent + "%");
console.log("Discounted Price: Rs.", discountedPrice);
console.log("Tax Amount: Rs.", taxAmount);
console.log("Final Price: Rs.", finalPrice);
console.log("Shipping:", shipping);
console.log("Stock Status:", stockMessage);
