Assignment-2: Build a price and discount calculator using JavaScript
functions and conditionals.

# Objective:

The purpose of this assignment is to test your understanding of JavaScript
variables, operators, conditionals, functions, and scope — the core concepts
covered in Sessions 12 to 15 — by building a practical price and discount
calculator using pure JavaScript with no DOM or arrays.


# Requirements:

● Declare variables for a product: name (string), basePrice (number),
discountPercent (number), taxRate (number), and stockStatus (string —
'in_stock', 'limited', or 'out_of_stock').
● Write a calculateDiscountedPrice(price, discount) function — returns the
price after applying the discount percentage.
● Write a calculateTax(price, taxRate) function — returns the tax amount
(taxRate % of price).
● Write a calculateFinalPrice(price, discount, taxRate) function — returns
the final price: discounted price plus tax amount.
● Write an isFreeShipping(finalPrice) function — returns 'Free Shipping' if
finalPrice >= 500, otherwise returns 'Shipping: Rs.49'.
● Write a getStockMessage(status) function using if/else or switch —
returns 'In Stock', 'Limited Stock', or 'Out of Stock' based on the status
string.
● Call all six functions with your product variables and print a full price
summary to the browser console using console.log.

