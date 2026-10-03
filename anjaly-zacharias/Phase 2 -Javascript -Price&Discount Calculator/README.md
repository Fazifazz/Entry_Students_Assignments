# Price and Discount Calculator using JavaScript

## 1. Objective

The objective of this project is to build a price and discount calculator using JavaScript functions and conditionals. The project demonstrates how to perform calculations such as discount, tax, and final price, and dynamically display the results on a webpage.

---

## 2. Description of the Project

This project is an e-commerce web page named **E-Kart.co**, developed using HTML, CSS, Bootstrap, and JavaScript. It displays various products such as clothing, footwear, bags, watches, electronics, and books.

JavaScript is used to:

* Calculate discounted price
* Calculate tax amount
* Compute final price
* Determine shipping charges
* Display stock availability
* Dynamically update the product price on the webpage

---

## 3. Variables Used

The following variables are declared in JavaScript:

* Product Name (string)
* Base Price (number)
* Discount Percentage (number)
* Tax Rate (number)
* Stock Status (string: 'in_stock', 'limited', 'out_of_stock')

---

## 4. Functions Implemented

### 4.1 calculateDiscountedPrice(price, discount)

This function calculates the price after applying the discount percentage.

### 4.2 calculateTax(price, taxRate)

This function calculates the tax amount based on the given tax rate.

### 4.3 calculateFinalPrice(price, discount, taxRate)

This function calculates the final price by adding tax to the discounted price.

### 4.4 isFreeShipping(finalPrice)

This function checks whether the product is eligible for free shipping. If the final price is greater than or equal to ₹500, it returns "Free Shipping", otherwise "Shipping: Rs.49".

### 4.5 getStockMessage(status)

This function returns stock availability message using conditional statements:

* "In Stock"
* "Limited Stock"
* "Out of Stock"

---

## 5. Output

The calculated results are displayed in two ways:

1. **Console Output** using console.log()
2. **Webpage Display** by dynamically updating the product price using JavaScript

---

## 6. Technologies Used

* HTML – Structure of the webpage
* CSS – Styling and layout
* Bootstrap – Responsive design
* JavaScript – Logic and calculations

---

## 7. Conclusion

This project helped in understanding the use of JavaScript functions, conditionals, and DOM manipulation. It shows how static content can be converted into dynamic content using JavaScript, improving user interaction in web applications.
