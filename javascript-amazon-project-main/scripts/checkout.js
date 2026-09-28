import {
  cart,
  removeItemFromCart,
  saveToStorage,
  calculateCartQuantity,
  updateQuantity
} from "../data/cart.js";
import { products } from "../data/products.js";
import { priceInDollar } from "./util/money.js";
import deliveryOptions from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

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
                    Quantity: <span class="quantity-label js-quantity-label-${marchingProduct.id}">${cartItem.quantity}</span>
                  </span>

                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${marchingProduct.id}">Update</span>

                    <input class="quantity-input js-quantity-input js-quantity-input-${marchingProduct.id}" data-product-id="${marchingProduct.id}" type="number">

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
                ${deliveryOptionHTML(marchingProduct, cart)}
              </div>
            </div>
          </div>
  `;
});

function deliveryOptionHTML(marchingProduct, cart) {
  let HTML = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDate, 'days').format('dddd, MMMM D');

    const pricestring = deliveryOption.priceCents === 0 
    ? 'FREE Shipping' 
    : `$${priceInDollar(deliveryOption.priceCents)} - Shipping`;
    const ischecked = deliveryOption.id === cart.deliveryOptionId
  HTML += `
  <div class="delivery-option">
    <input type="radio"
    ${ischecked ? 'checked' : ''}"
      class="delivery-option-input"
      
      name="delivery-option-${marchingProduct.id}">
    <div>
      <div class="delivery-option-date">
        ${deliveryDate}
      </div>
      <div class="delivery-option-price">
        ${pricestring}
      </div>
    </div>
  </div>
  `;
});
  return HTML;
}


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
    const editedQuantity = document.querySelector(`.js-quantity-input-${productId}`);
    editedQuantity.focus();
  });
});


function handleSaveQuantity(saveQuantity) {
  const { productId } = saveQuantity.dataset;
  const container = document.querySelector(
    `.js-cart-item-container-${productId}`,
  );
  const editedQuantity = document.querySelector(
    `.js-quantity-input-${productId}`,
  );
  const newQuantity = Number(editedQuantity.value);
  

  if (newQuantity < 0 || newQuantity >= 1000) {
    alert("Please enter a valid quantity between 0 and 1000");
    editedQuantity.value = "";
    return;
  };

  updateQuantity(productId, newQuantity);

  const quantityLabel = document.querySelector(
    `.js-quantity-label-${productId}`,
  );
  quantityLabel.innerHTML = newQuantity;
  saveToStorage();
  container.classList.remove("is-editing-quantity");
  updateCheckoutQuantity();
  editedQuantity.value = "";
}


document.querySelectorAll(".save-quantity-link").forEach((saveQuantity) => {
  saveQuantity.addEventListener("click", () => {
   handleSaveQuantity (saveQuantity);
  });  
});

document.querySelectorAll(".js-quantity-input").forEach((inputField) => {
  inputField.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
    const { productId } = inputField.dataset;
    const saveQuantity = document.querySelector(`.save-quantity-link[data-product-id="${productId}"]`);
    handleSaveQuantity(saveQuantity);
    }
  });
});


function updateCheckoutQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-checkout-items").innerHTML = `${cartQuantity} items`;
};

updateCheckoutQuantity();

