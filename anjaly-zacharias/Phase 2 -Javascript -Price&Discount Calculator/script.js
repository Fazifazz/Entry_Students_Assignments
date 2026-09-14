let productName = "Anarkali";
let basePrice = 2399;
let discountPercent = 10;
let taxRate = 18;
let stockStatus = "in_stock";

function calculateDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}

function calculateTax(price, taxRate) {
    return (price * taxRate / 100);
}

function calculateFinalPrice(price, discount, taxRate) {
    let discounted = calculateDiscountedPrice(price, discount);
    let tax = calculateTax(discounted, taxRate);
    return discounted + tax;
}

function isFreeShipping(finalPrice) {
    return finalPrice >= 500 ? "Free Shipping" : "Shipping: Rs.49";
}

function getStockMessage(status) {
    switch(status) {
        case "in_stock": return "In Stock";
        case "limited": return "Limited Stock";
        case "out_of_stock": return "Out of Stock";
        default: return "Unknown";
    }
}

let discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
let taxAmount = calculateTax(discountedPrice, taxRate);
console.log("Product:", productName);
console.log("Base Price:", basePrice);
console.log("Product:", productName);
console.log("Base Price:", basePrice);
console.log("Discounted Price:", discountedPrice);
console.log("Tax Amount:", taxAmount);
console.log("Final Price:", finalPrice);
console.log("Shipping:", shipping);
console.log("Stock:", stock);

document.getElementById("price1").innerHTML =
    "₹" + finalPrice.toFixed(2) + "<br><small>" + shipping + " | " + stock + "</small>";