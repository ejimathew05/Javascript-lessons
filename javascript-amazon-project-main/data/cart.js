export let cart = JSON.parse(localStorage.getItem('cart')) || [
]

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(productId,
 productQuantity) {
  let matchingItem;
  cart.forEach((Item) => {
    if (productId === Item.productId) {
      matchingItem = Item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: productQuantity,
    });
    console.log(productQuantity);
  }

  console.log(cart);
  saveToStorage();
}


export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity
  });
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