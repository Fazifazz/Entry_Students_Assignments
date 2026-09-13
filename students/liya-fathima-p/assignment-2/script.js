/* Assignment: Build a price and discount calculator using JavaScript
functions and conditionals. */

/* Declare variables for a product */

const name_product = "watch";
const basePrice = 4000;
const discountPercent = 20;
const taxRate = 30;
const stockStatus = "in_stock";


/* Calculate discounted price */

function calculateDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}


/* Calculate tax amount */

function calculateTax(price, taxRate) {
    return price * taxRate / 100;
}


/* Calculate final price */

function calculateFinalPrice(price, discount, taxRate) {
    const discountedPrice = calculateDiscountedPrice(price, discount);
    const taxAmount = calculateTax(discountedPrice, taxRate);

    return discountedPrice + taxAmount;
}


/* Check shipping */

function isFreeShipping(finalPrice) {
    if (finalPrice >= 500) {
        return "Free Shipping";
    } else {
        return "Shipping: Rs.49";
    }
}


/* Get stock message */

function getStockMessage(status) {
    if (status === "in_stock") {
        return "In Stock";
    } else if (status === "limited") {
        return "Limited Stock";
    } else {
        return "Out of Stock";
    }
}

//calling functions

const discounted_price = calculateDiscountedPrice( basePrice,discountPercent);

const tax_price = calculateTax(discounted_price,taxRate);

const final_price = calculateFinalPrice(basePrice, discountPercent, taxRate);

const shipping = isFreeShipping(final_price);

const stock_message = getStockMessage(stockStatus);


/* Print full price summary */

console.log("Product Summary:");
console.log("Product Name:", name_product);
console.log("Price:", basePrice);
console.log("Discounted Price:", discounted_price);
console.log("Tax:", tax_price);
console.log("Final Price:", final_price);
console.log("Shipping:", shipping);
console.log("Stock:", stock_message);