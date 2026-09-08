let productName = 'Smart watch';
let basePrice = 1500;
let discountPercent = 30;
let taxRate = 18;
let stockStatus = 'in_stock';

// Discounted price calculation
function calculateDiscountedPrice(price, discount) {
  return price - (price * discount) / 100;
}

// Tax amount calculation
function calculateTax(price, taxRate) {
  let tax = (price * taxRate) / 100;
  return tax;
}

// Final price calculation (Discounted price + Tax amount)
function calculateFinalPrice(price, discount, taxRate) {
  let discountedPrice = calculateDiscountedPrice(price, discount);
  let calculatedTax = calculateTax(discountedPrice, taxRate);
  return discountedPrice + calculatedTax;
}

// Free shipping function
function isFreeShipping(finalPrice) {
  if (finalPrice >= 500) {
    return 'Free shipping available';
  } else {
    return 'Shipping: Rs.49';
  }
}

// stock status message
function getStockMessage(status) {
  if (status === 'in_stock') {
    return 'In Stock';
  } else if (status === 'limited') {
    return 'Limited Stock';
  } else if (status === 'out_of_stock') {
    return 'Out of Stock';
  } else {
    return 'Unknown Stock Status';
  }
}

// Calling the functions
let discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
// console.log(discountedPrice);
let calculatedTax = calculateTax(discountedPrice, taxRate);
// console.log(calculatedTax);
let finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
// console.log(finalPrice);
let shippingMessage = isFreeShipping(finalPrice);
// console.log(shippingMessage);
let stockMessage = getStockMessage(stockStatus);
// console.log(stockMessage);

//price summary to the browser console
console.log(`Product Name : ${productName}`);
console.log(`Base Price : Rs.${basePrice}`);
console.log(`Discount : ${discountPercent}%`);
console.log(`Tax : ${taxRate}%`);
console.log(`Final Price: Rs.${finalPrice}`);
console.log(`Shipping : ${shippingMessage}`);
console.log(`Stock Status: ${stockMessage}`);
