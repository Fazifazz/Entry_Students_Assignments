// variables declaration

let name = 'Laptop';
let basePrice = 49999;
let discountPercent = 12;
let taxRate = 7;
let stockStatus = 'limited';

// function creation

// 1. Calculate discounted price

function calculateDiscountedPrice(price,discount){
    return price-(price*discount/100);
}

// 2. Calculate tax amount

function calculateTax(price, taxRate){
    return price*taxRate/100;
}

// 3. Calculate final price

function calculateFinalPrice(price, discount, taxRate) {
    let discountedPrice = calculateDiscountedPrice(price, discount);

    let taxAmount = calculateTax(discountedPrice, taxRate);

    return discountedPrice + taxAmount;
}

// 4. Check free shipping


function isFreeShipping(finalPrice){
    if(finalPrice>=500){
        return 'Free Shipping';
    }else{
        return 'Shipping: Rs.49'
    }
}

// 5. Get stock message

function getStockMessage(status){
    switch(status){
        case'in_stock':
            return 'Product is In Stock';
        case 'limited':
            return 'Limited product';
        case 'out_of_stock':
            return 'product is Out of Stock, Not available to checkout';
    }
}


// Calling all functions

let discountPrice=calculateDiscountedPrice(basePrice,discountPercent);
let taxAmount=calculateTax(discountPrice, taxRate);
let finalPrice=calculateFinalPrice(basePrice,discountPercent,taxRate);
let Shipping=isFreeShipping(finalPrice);
let status=getStockMessage(stockStatus);

//product summary

console.log('Product details');
console.log('Product name:',name);
console.log('Base price :',basePrice);
console.log('availability of product:',status);
console.log('discount percentge:',discountPercent);
console.log('discounted price:',discountPrice);
console.log('Tax amount:',taxAmount);
console.log('shipping status :',Shipping);
if(Shipping==='Shipping: Rs.49'){
    console.log('product total price :',finalPrice+49);

}else{
    console.log('product total price :',finalPrice);
};












