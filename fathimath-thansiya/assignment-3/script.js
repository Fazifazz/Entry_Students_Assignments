// variables for a product
const name = "Laptop";
const basePrice = 60000;
const discountPercent = 10;
const taxRate = 5;
const stockStatus = "in_stock";

// discounted price
const calculateDiscountedPrice = (price, discount) => {
  const discountPrice = (price * discount) / 100;
  const discountAmount = price - discountPrice;

  return discountAmount;
};

// calculate tax
const calculateTax = (price, taxRate) => {
  const taxAmount = (price * taxRate) / 100;

  return taxAmount;
};

// final price
const calculateFinalPrice = (price, discount, taxRate) => {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  const finalPrice = discountedPrice + calculateTax(discountedPrice, taxRate);

  return finalPrice;
};

// free shipping or not
const isFreeShipping = (finalPrice) => {
  if (finalPrice >= 500) {
    return "Free Shipping";
  } else {
    return "Shipping: Rs.49";
  }
};

// stock status
const getStockMessage = (status) => {
  switch (status) {
    case "in_stock":
      return "In Stock";

    case "limited":
      return "Limited Stock";

    case "out_of_stock":
      return "Out of Stock";

    default:
      return "Invalid Status";
  }
};

// calling functions with product values
const discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
const taxAmount = calculateTax(discountedPrice, taxRate);
const finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
const shipping = isFreeShipping(finalPrice);
const stockMessage = getStockMessage(stockStatus);

// printing summary
console.log("----- Product Price Summary -----");
console.log("Product Name:", name);
console.log("Base Price: Rs.", basePrice);
console.log("Discount:", discountPercent + "%");
console.log("Discounted Price: Rs.", discountedPrice);
console.log("Tax Rate:", taxRate + "%");
console.log("Tax Amount: Rs.", taxAmount);
console.log("Final Price: Rs.", finalPrice);
console.log("Shipping:", shipping);
console.log("Stock Status:", stockMessage);
