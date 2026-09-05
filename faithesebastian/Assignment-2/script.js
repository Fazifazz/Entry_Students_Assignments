
// Product variables
let ProductName = "Laptop";
let basePrice = "70000";
let discountPercent = "10";
let taxRate = "9";
let stockStatus = "in_stock";


// Function to calculate discount amount
function calculateDiscountAmount(price, discount) {
    return price * discount / 100;
}

// Function to calculate discounted price
const calculateDiscountedPrice = (price, discount) => {
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

// Function to check free shipping
function isFreeShipping(finalPrice) {
    if (finalPrice >= 500) {
        return "Free Shipping";
    } else {
        return "Shipping: Rs.49";
    }
}

// Function to get stock message
function getStockMessage(status) {
    switch (status) {
        case "in_stock":
            return "In Stock";

        case "limited":
            return "Limited Stock";

        case "out_of_stock":
            return "Out of Stock";

        default:
            return "Unknown Stock Status";
    }
}


// call all functions
let discountAmount = calculateDiscountAmount(basePrice, discountPercent);
let discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
let taxAmount = calculateTax(discountedPrice, taxRate);
let finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
let shippingMessage = isFreeShipping(finalPrice);
let stockMessage = getStockMessage(stockStatus);


// Print full price summary
console.log("----- PRICE SUMMARY -----");
console.log(`Product Name: ${ProductName}`);
console.log(`Base Price: Rs.${basePrice}`);
console.log(`Discount: ${discountPercent}%`);
console.log("Discount Amount: Rs." + discountAmount);
console.log(`Discounted Price: Rs.${discountedPrice.toFixed(2)}`);
console.log(`Tax: ${taxRate}%`);
console.log(`Tax Amount: Rs.${taxAmount.toFixed(2)}`);
console.log(`Final Price: Rs. ${finalPrice.toFixed(2)}`);
console.log(`Shipping: ${shippingMessage}`);
console.log(`Stock Status: ${stockMessage}`);
console.log("-------------------------");

