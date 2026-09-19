import { cart, updateCartQuantity, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { priceInDollar } from "./util/money.js";

let productHtml = "";
products.forEach((product) => {
  // Accumulator Pattern
  productHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines"
         >
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${priceInDollar(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-add-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

document.querySelector(".js-product-grid").innerHTML = productHtml;
// timeoutId for each product is in an object
const addedAlertTimeouts = {};

updateCartQuantity();

function addToCart(productId) {
  const selectedQuantity = document.querySelector(
    `.js-quantity-selector-${productId}`,
  );
  const productQuantity = Number(selectedQuantity.value);

  const addedAlert = document.querySelector(`.js-add-to-cart-${productId}`);
  addedAlert.classList.add("added-to-cart-visible");

  const previousTimeoutId = addedAlertTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }
  const timeoutId = setTimeout(() => {
    clearTimeout(timeoutId);
    addedAlert.classList.remove("added-to-cart-visible");
  }, 2000);
  addedAlertTimeouts[productId] = timeoutId;

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += productQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: productQuantity,
    });
  }
  saveToStorage();
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    addToCart(productId);
    updateCartQuantity();
  });
});

