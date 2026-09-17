let name = "laptop";
let basePrice = 80000;
let discountPercent = 10;
let taxRate = 10;  //the percentage of money you have to pay as tax.
let stockStatus = "limited_stock";  // can be "in_stock", "limited_stock", or "out_of_stock".

// returns the price after applying the discount percentage.
function calculateDiscountedPrice(basePrice, discountPercent) {
    let discountPercentage = basePrice * discountPercent / 100;
    let discountPrice = basePrice - discountPercentage;
    return discountPrice
}

// Write a calculateTax(price, taxRate) function — returns the tax amount (taxRate % of price)
function calculateTax(basePrice, taxRate) {
    let taxAmount = basePrice * taxRate / 100;
    return taxAmount;
}


// Write a calculateFinalPrice(price, discount, taxRate) function —
// returns the final price: discounted price plus tax amount.
function calculateFinalPrice(discountPercent, taxRate) {

    let discountPercentage = basePrice * discountPercent / 100;

    let discountPrice = basePrice - discountPercentage;

    let taxAmount = discountPrice * taxRate / 100;

    let finalPrice = discountPrice + taxAmount;

    return finalPrice;
}



// Write an isFreeShipping(finalPrice) function — returns 'Free Shipping' if
// finalPrice >= 500, otherwise returns 'Shipping: Rs.49'.
function isFreeShipping(finalPrice) {
    if (finalPrice >= 500) {
        return "Free Shipping";
    } else {
        return "Shipping: Rs.49";
    }
}

// Using Ternary operator 
function isFreeShipping(finalPrice) {
    let shipping = finalPrice >= 500 ? "Free Shipping" : "Shipping: Rs.49";
    return shipping;
}
console.log(isFreeShipping(calculateFinalPrice(discountPercent, taxRate)));



// Write a getStockMessage(status) function using if/else or switch —
// returns 'In Stock', 'Limited Stock', or 'Out of Stock' based on the status string.
function getStockMessage(stockStatus) {
    if (stockStatus === "in_stock") {
        return "In Stock";
    }
    else if (stockStatus === "limited_stock") {
        return "Limited Stock";
    }
    else {
        return "Out of Stock";
    }
}
console.log(getStockMessage(stockStatus));

// using switch statement
function getStockMessage1(stockStatus) {
    switch (stockStatus) {
        case "in_stock":
            return "In Stock";
            break;

        case "limited_stock":
            return "Limited Stock";
            break;

        case "out_of_stock":
            return "Out of Stock";
            break;

        default:
            return "Invalid Stock Status";
    }
}
// console.log(getStockMessage1(stockStatus));

// Call all six functions with your product variables and print a full price
// summary to the browser console using console.log.

console.log("Product Price Summary:");
console.log(calculateDiscountedPrice(basePrice, discountPercent));
console.log(calculateTax(basePrice, taxRate));
console.log(calculateFinalPrice(discountPercent, taxRate));
console.log(isFreeShipping(calculateFinalPrice(discountPercent, taxRate)));
console.log(getStockMessage(stockStatus));

