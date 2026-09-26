let productArray = [];

let addToCartArray = [];

//========================================================
// Fetch Product details and render it dynamically
//========================================================

const productSection = document.getElementById("featured-pdts-section");

// Featured Products Heading
const productHeading = document.createElement("h2");
productHeading.innerHTML = "Featured Products";
productHeading.setAttribute("id", "featured_pdts");
productSection.appendChild(productHeading);

//Product Container
const productContainer = document.createElement("div");
productContainer.setAttribute("class", "container");

async function productDetails() {
  const response = await fetch("https://fakestoreapi.com/products?_limit=12");

  if (!response.ok)
    throw new Error(
      "HTTP Status Code - ${response.status} - ${response.statusText}",
    );

  const fetchedproducts = await response.json();

  fetchedproducts.forEach((pdt) => {
    let productItem = {
      id: pdt.id,
      name: pdt.title,
      category: pdt.category,
      price: pdt.price,
      originalPrice: pdt.price + 500,
      rating: pdt.rating.rate,
      imageUrl: pdt.image,
    };

    productArray.push(productItem);
  });

  //Product row
  const productRow = document.createElement("div");
  productRow.setAttribute("class", "row g-4 featured-pdt-row");

  productArray.forEach((pdt) => {

    const productCol = document.createElement("div");
    productCol.setAttribute("class", "col-12 col-sm-6 col-lg-3");

    const productArticle = document.createElement("article");
    productArticle.setAttribute("class", "card h-100");

    const prdtImageAnchor = document.createElement("a");
    const pdtImage = document.createElement("img");
    pdtImage.setAttribute("src", `${pdt.imageUrl}`);
    pdtImage.setAttribute("alt", "Featured Product Image");
    pdtImage.setAttribute("class", "mx-auto feat-pdt-img-new");
    
    prdtImageAnchor.appendChild(pdtImage);

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    const shortCardTitle = pdt.name.slice(0, 24);
    cardTitle.innerHTML = shortCardTitle;

    const cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");

    if (pdt.category.includes("cloth")) cardText.innerHTML = "CLOTHING";
    else cardText.innerHTML = pdt.category.toUpperCase();

    const cardRate = rateRender(pdt.rating);

    const cardOriginalPrice = document.createElement("p");
    cardOriginalPrice.setAttribute(
      "class",
      "text-decoration-line-through text-muted",
    );
    cardOriginalPrice.innerHTML = `$${pdt.originalPrice}`;

    const cardPrice = document.createElement("p");
    cardPrice.setAttribute("class", "text-danger fw-bold");
    cardPrice.innerHTML = `$${pdt.price}`;

    const addToCartBtnAnchor = document.createElement("a");
    addToCartBtnAnchor.setAttribute("class", "btn btn-primary add-to-cart-btn");
    addToCartBtnAnchor.setAttribute("id", `${pdt.id}`);
    addToCartBtnAnchor.innerHTML = "ADD TO CART";

    addToCartBtnAnchor.addEventListener("click", (e) => {
      addToCart(Number(e.target.id));
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardRate);
    cardBody.appendChild(cardOriginalPrice);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(addToCartBtnAnchor);

    productArticle.appendChild(prdtImageAnchor);
    productArticle.appendChild(cardBody);

    productCol.appendChild(productArticle);
    productRow.appendChild(productCol);
  });

  productContainer.appendChild(productRow);
  productSection.appendChild(productContainer);
}

productDetails();

//=======================================
// Add to cart function
//========================================

function addToCart(pId)
{
    let pdtInCart = 0;

      addToCartArray = JSON.parse(localStorage.getItem("currentCart")) || [];

      addToCartArray.forEach(p => {
        if (p.pdt_id === pId) {
          pdtInCart = 1;
          p.pdt_quant++;
        }
      });

      if (pdtInCart === 0) {
        addToCartArray.push({ pdt_id: pId, pdt_quant: 1 });
      }

      localStorage.setItem("currentCart", JSON.stringify(addToCartArray));
      updateCartQuantity();
}

//========================================================
//Search Products - live suggestions
//========================================================

const searchInput = document.getElementById("searchInput");

const searchForm = document.getElementById("searchForm");

const productListArea = document.createElement("p");
productListArea.style.border = "2px";
productListArea.style.position = "absolute";
productListArea.style.backgroundColor = "white";
productListArea.style.borderRadius = "5px";
productListArea.style.zIndex = "100px";
productListArea.style.marginTop = "38px";
productListArea.style.marginLeft = "145px";

const productSearchList = document.createElement("div");
productSearchList.innerHTML = "";

const category = document.getElementById("categoryFilter");
let selectedCategory = category.value.toLowerCase();

category.addEventListener("change", () => {
  selectedCategory = category.value;
  searchInput.value = "";
  productSearchList.innerHTML = "";
});

searchInput.addEventListener("input", (e) => {
  productSearchList.innerHTML = "Searching....";

  let matchFound = 0;
  productSearchList.innerHTML = "";
  const searchedWord = e.target.value.toUpperCase();
  if (searchedWord === "") productSearchList.innerHTML = "";
  else {
    productArray.forEach((pdt) => {
      const pdtname = pdt.name.toUpperCase();

      const productCategory = pdt.category.toLowerCase();
      const categoryAll =
        selectedCategory === "all"
          ? true
          : productCategory.includes(selectedCategory);

      if (pdtname.includes(searchedWord) && matchFound < 6 && categoryAll) {
        
        const matchedPdtList = document.createElement("div");

        matchedPdtList.className = "searchClass";
        matchedPdtList.setAttribute("data-bs-toggle", "modal");
        matchedPdtList.setAttribute("data-bs-target", "#ProductModal");

        matchedPdtList.innerHTML = `
            <b class="bi bi-search"></b>
            &nbsp;
            <div>${pdtname.slice(0, 25)}</div>
        `;

        matchedPdtList.addEventListener("click", () => {
            displayProduct(pdt.id);
        });

        productSearchList.appendChild(matchedPdtList);

        matchFound++;
      }
    });

    if (matchFound === 0) {
      productSearchList.innerHTML = "Product searched not found       ";
    }

    productListArea.appendChild(productSearchList);
    searchInput.before(productListArea);
  }
});

searchInput.addEventListener("blur", () => {
    setTimeout(()=>{
        productSearchList.innerHTML = ""}, 700);
});



// Display Searched Product 

 let pdt_id = 0;
 let modalBtnHandler;

function displayProduct(pdt_id){

    productArray.forEach(pd => {

        if(pd.id === pdt_id)
        {
            //Modal Title
            const modalTitle = document.getElementById("mdl_title")
            modalTitle.innerHTML = `<b>${pd.name}</b>`

            //Product Modal Body
            const pdt_mdlbody = document.getElementById("pdt_mdlbody")
            pdt_mdlbody.innerHTML = `<img src=${pd.imageUrl} width='200px' height='250px' alt='Product Image'/>`
            pdt_mdlbody.appendChild(rateRender(`${pd.rating}`));

            const pdt_htmlbody = document.createElement("div");
            pdt_htmlbody.setAttribute("id","pdtDtlBody");

            let category = pd.category.toUpperCase();
            if(pd.category.toLowerCase().includes('clothing'))
                category ="CLOTHING";

            pdt_htmlbody.innerHTML =`<b>${category} </b><br><div class='text-decoration-line-through text-muted'>$${pd.originalPrice}</div><div style="color: red;">$${pd.price}</div>`;
            pdt_mdlbody.appendChild(pdt_htmlbody);

            const modalBtn = document.getElementById("modal_add_to_cart")

            if(modalBtnHandler)
            {
                modalBtn.removeEventListener("click",modalBtnHandler);
            }

            modalBtnHandler = () =>{
                 addToCart(pdt_id);
                const pdt_alert = document.createElement("div");
                pdt_alert.setAttribute("id","pdt_alert");
                pdt_alert.innerHTML="<h5>Added to Cart successfully! </h5><br>";
                pdt_alert.style.color="green";

                pdt_mdlbody.prepend(pdt_alert);
            }
            
            modalBtn.addEventListener("click", modalBtnHandler );     
        }
    });
    
}


//========================================================
//To render product rating
//========================================================

function rateRender(pdtRate)
{
    const cardRate = document.createElement("p");

    let starAppendCount = 0;

    while (pdtRate > 0) {
        const spanRate = document.createElement("span");

        if (pdtRate <= 0.5) spanRate.setAttribute("class", "bi bi-star-half");
        else spanRate.setAttribute("class", "bi bi-star-fill");

        cardRate.appendChild(spanRate);
        starAppendCount++;
        pdtRate--;
    }

    while (starAppendCount < 5) {
        const spanRate = document.createElement("span");
        spanRate.setAttribute("class", "bi bi-star");

        cardRate.appendChild(spanRate);
        starAppendCount++;
    }
    return cardRate;
}



//========================================================
//Shopping CART 
//========================================================

const cart = document.getElementById("ShopNest-cart");
let cartAmount = 0;

cart.addEventListener("click", () => {
  addToCartArray = JSON.parse(localStorage.getItem("currentCart")) || [];
  createCartPanel();

  const cartPanel = document.getElementById("cartPanel");
  const cartOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartPanel);

  cartOffcanvas.show();
});

// To create Cart Panel

function createCartPanel() {
  const cartDiv = document.getElementById("cartBody");
  cartDiv.innerHTML = "";

  addToCartArray = JSON.parse(localStorage.getItem("currentCart")) || [];

  cartAmount = 0;
  addToCartArray.forEach((pdtId) => {
    productArray.forEach((pdt) => {
   
      if (pdt.id === pdtId.pdt_id) {
        cartAmount = cartAmount + pdt.price * pdtId.pdt_quant;

        const pdtDiv = document.createElement("div");
        //  pdtDiv.innerHTML =`<img src = ${pdt.imageUrl} alt='Product Image' width=45px height=45px /><br><div style='position:center'> $ ${pdt.price} <br> <button class='minusQuantity btn btn-primary' id='pdtMinus_${pdt.id}'>-</button> &nbsp; ${pdtId.pdt_quant} &nbsp; <button class='addQuantity btn btn-primary' id='pdtAdd_${pdt.id}'>+</button> &nbsp;<button class='removeItem btn btn-primary bi bi-trash' id='pdtRemove_${pdt.id}' style="margin-right: 10px;"></button><hr>`
        pdtDiv.innerHTML = `<div id='pdt_title_${pdt.id}'>${pdt.name.slice(0, 24)}</div><br><img src = ${pdt.imageUrl} alt='Product Image' width=45px height=45px /><br><div style='position:center'> $${pdt.price}  <br>`;
        if (pdtId.pdt_quant > 1)
          pdtDiv.innerHTML += `<button class='minusQuantity btn btn-primary' id='pdtMinus_${pdt.id}'>-</button>`;
        else
          pdtDiv.innerHTML += `<button class='removeItem btn btn-primary' id='pdtRemove_${pdt.id}' style='margin-right: 10px;'><i class='bi bi-trash'></i></button>`;

        pdtDiv.innerHTML += `&nbsp; ${pdtId.pdt_quant} &nbsp; <button class='addQuantity btn btn-primary' id='pdtAdd_${pdt.id}'>+</button> &nbsp;<hr>`;

        cartDiv.appendChild(pdtDiv);

        // Quantity in Cart - minus

        if (pdtId.pdt_quant > 1) {
          const minusQuantity = pdtDiv.querySelector(`#pdtMinus_${pdt.id}`);

          minusQuantity.addEventListener("click", (e) => {
            addToCartArray = JSON.parse(localStorage.getItem("currentCart"));

            addToCartArray.forEach((prod) => {
              if (prod.pdt_id === pdt.id) {
                prod.pdt_quant--;
                
                localStorage.setItem(
                  "currentCart",
                  JSON.stringify(addToCartArray),
                );
              }
            });

            calculateTotCartAmt();
            createCartPanel();
            updateCartQuantity();
          });
        }

        // Quantity in Cart - add
        const addQuantity = pdtDiv.querySelector(`#pdtAdd_${pdt.id}`);

        addQuantity.addEventListener("click", (e) => {

          addToCartArray = JSON.parse(localStorage.getItem("currentCart"));

          addToCartArray.forEach((prod) => {
            if (prod.pdt_id === pdt.id) {
              prod.pdt_quant++;
              localStorage.setItem(
                "currentCart",
                JSON.stringify(addToCartArray),
              );
            }
          });
    
          calculateTotCartAmt();
          updateCartQuantity();
          createCartPanel();
        });

        //Remove item from cart

        if (pdtId.pdt_quant == 1) {
          const removeItem = pdtDiv.querySelector(`#pdtRemove_${pdt.id}`);

          removeItem.addEventListener("click", (e) => {
            addToCartArray = JSON.parse(localStorage.getItem("currentCart"));

            addToCartArray = addToCartArray.filter(
              (prod) => prod.pdt_id !== pdt.id,
            );
            localStorage.setItem("currentCart", JSON.stringify(addToCartArray));

            calculateTotCartAmt();
            createCartPanel();

            updateCartQuantity();
          });
        }
      }
    });
  });

  updateCartQuantity();

  const cartTotal = document.createElement("div");

  if (cartAmount === 0) 
    cartTotal.innerHTML += "<h6>Your cart is empty!</h6>";
  else
    cartTotal.innerHTML = `<hr><h6>Total Amount : $${cartAmount.toFixed(2)}</h6><hr>`;

  cartDiv.prepend(cartTotal);

   if (cartAmount !== 0)
   {
        const checkoutBtnDiv = document.createElement("div");
        checkoutBtnDiv.innerHTML = `<button type="button" class="btn btn-primary">Checkout</button>`;
        cartDiv.appendChild(checkoutBtnDiv);
   }
}

//========================================================
//Calculate Total Cart Amount
//========================================================

function calculateTotCartAmt() {
  cartAmount = 0;

  addToCartArray = JSON.parse(localStorage.getItem("currentCart"));
  addToCartArray.forEach((prod) => {
    productArray.forEach((pdt) => {
      if (prod.pdt_id === pdt.id) {
        cartAmount = cartAmount + prod.pdt_quant * pdt.price;
      }
    });
  });

}

//========================================================
// Calculate total product quantity in cart and display
//========================================================

let cartQuantity = 0;

function updateCartQuantity() {
  addToCartArray = JSON.parse(localStorage.getItem("currentCart")) || [];

  if (addToCartArray.length !== 0) 
    cartQuantity = addToCartArray.reduce((cartQuantity, pdt) => cartQuantity + pdt.pdt_quant, 0);
  else 
    cartQuantity = 0;
  
  const cartQuantityDisplay = document.getElementById("cartQuantity");
  cartQuantityDisplay.innerHTML = cartQuantity;
  cartQuantityDisplay.style.backgroundColor = "red";
  cartQuantityDisplay.style.display = cartQuantity === 0 ? "none" : "inline";
}

updateCartQuantity();
