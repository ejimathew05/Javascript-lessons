export let cart = JSON.parse(localStorage.getItem('cart')) || [
      {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
]

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, productQuantity) {
  let matchingItem;
  cart.forEach((Item) => {
    if (productId === Item.productId) {
      matchingItem = Item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += productQuantity;
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
    cartQuantity += item.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  console.log(cartQuantity);
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