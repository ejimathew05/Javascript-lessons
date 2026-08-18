function calculatetotal() {
  const inputElement = document.querySelector(".js-cost-input");
  let cost = Number(inputElement.value);

  if (cost > 0 && cost <= 40) {
    cost = Math.round((cost + 10) * 100) / 100;
  } else if (cost < 0) {
    cost = "<span>Error: cost cannot be less than $0 </span>";
  }

  if (cost > 0) {
    document.querySelector(".js-total-cost").innerHTML = `$${cost}`;
  } else {
    document.querySelector(".js-total-cost").innerHTML = `${cost}`;
  }
}

function calc(event) {
  if (event.key === "Enter") {
    calculatetotal();
  }
}

function subscribe() {
  const buttonElem = document.querySelector(".js-subscribe-button");
  buttonElem.classList.add("subscribed-button");
  if (buttonElem.innerText === "Subscribe") {
    buttonElem.innerText = "Subscribed";
  } else {
    buttonElem.innerText = "Subscribe";
    buttonElem.classList.remove("subscribed-button");
  }
}
