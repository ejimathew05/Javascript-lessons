export let cart = JSON.parse(localStorage.getItem('cart')) || [
]

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

 
export function calculateCartQuantity () {
   let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity
  });
  return cartQuantity;
}

export function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}


export function removeItemFromCart(productId) {
  const newCart = [];
   
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
cart = newCart;
saveToStorage();
} 

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    };
  });
  matchingItem.quantity = newQuantity;
}