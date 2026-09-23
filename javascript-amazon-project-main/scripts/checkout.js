import {
  cart,
  removeItemFromCart,
  saveToStorage,
  calculateCartQuantity,
  updateQuantity
} from "../data/cart.js";
import { products } from "../data/products.js";
import { priceInDollar } from "./util/money.js";

let cartSummaryHTML = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let marchingProduct;
  // Deduplecation/Normalizing a Product: using the productId to find the matching product in the products array
  products.forEach((product) => {
    if (product.id === productId) {
      marchingProduct = product;
    }
  });

  if (!marchingProduct) {
    console.warn(`Product with id ${productId} not found in products array`);
    return;
  }

  cartSummaryHTML += `
  <div class="cart-item-container 
  js-cart-item-container-${marchingProduct.id}"> 
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${marchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${marchingProduct.name}
                </div>
                <div class="product-price">
                  $${priceInDollar(marchingProduct.priceCents)} 
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
                  </span>

                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${marchingProduct.id}">Update</span>

                    <input class="quantity-input js-quantity-input">
                    <span class="save-quantity-link link-primary" data-product-id="${marchingProduct.id}">Save</span>
                 
                  <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${marchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${marchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${marchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${marchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-quantity").forEach((link) => {
  link.addEventListener("click", () => {
    const {productId} = link.dataset;
    removeItemFromCart(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.remove();
    updateCheckoutQuantity();
    saveToStorage();
  });
});


document.querySelectorAll(".js-update-quantity-link").forEach((quantity) => {
  quantity.addEventListener("click", () => {
    const {productId} = quantity.dataset;
     const container = document.querySelector(
      `.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  });
});


document.querySelectorAll(".save-quantity-link").forEach((saveQuantity) => {
  saveQuantity.addEventListener("click", () => {
    const {productId} = saveQuantity.dataset;
     const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove('is-editing-quantity');
   const editedQuantity = document.querySelector('.js-quantity-input');
   const newQuantity = Number(editedQuantity.value);
   updateQuantity(productId, newQuantity);
  if (newQuantity >=  0 && newQuantity < 1000){
  const quantityLabel = document.querySelector('.js-quantity-label');
  quantityLabel.innerHTML = newQuantity;
  saveToStorage();
  updateCheckoutQuantity();} else {alert('error')};
  editedQuantity.value = '';
  });
});

function updateCheckoutQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-checkout-items").innerHTML = `${cartQuantity} items`;
};

updateCheckoutQuantity();

