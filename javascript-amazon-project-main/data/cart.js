export const cart = [];

export function updateCartQuantity() {
   let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quatity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    console.log(cartQuantity);
}