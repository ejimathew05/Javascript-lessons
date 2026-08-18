
 //1
    let add = function() {
        console.log(2+3);
    }

    add();
    add();

    //2
    const runTwice = function(fun) {
        fun();
        fun();
    }
    runTwice(add);
    
    document.querySelector('.click-finish')
      .addEventListener('click', () => {change()});
      function change() {
        let button = document.querySelector(".finish-button");
        if (button.innerHTML === "Finish") {
          //you can use this style
          setTimeout(function () {
            button.innerHTML = "Finished!";
          }, 1000);
           button.innerHTML = "Loading...";
        } else {
          setTimeout(() => {
            //you can also use this style
            button.innerHTML = "Finish";
          }, 1000);
          button.innerHTML = "Loading...";
        } 
      }

let timeoutID;

document.querySelector('.click-add')
  .addEventListener('click', () => {addToCart();});
function addToCart () { 
  const addtocart = document.querySelector('.add-to-cart');
    if (addtocart.innerHTML === 'Add to Cart') {
      const adding = document.querySelector('.added');
      adding.innerHTML = 'Added';
      clearTimeout(timeoutID);
      timeoutID = setTimeout (() => {adding.innerHTML = '';}, 2000);
    }
}

// 12g, 12h, 12i
let messageID;
function startNotificationToggle() {
messageID = setInterval (function () {
  if (document.title === 'App'  && message > 0) {
    document.title =  `(${message}) New message`
  } else {document.title = 'App'};
}, 1000)
}

let message = 0;

document.querySelector('.click-add-button')
  .addEventListener('click', addButton('new'));

document.querySelector('.click-add-button')
  .addEventListener('click', addButton('new'));


function addButton(notification) {
  if (notification === 'new') {
    message ++;
  ;
  } else if (notification === 'delete' && message > 0) { 
  message --;
}  if (message === 0) {document.title = 'App'};

console.log(message);}

startNotificationToggle();
 

//Todo: 
TODO:('Add event listeners to the RPS final Project and the TO-DO list project' )// DONE 


//PART TWO FOR EXERCISE TWO

// 1
/* 
const multiply = (array) => {
  let result = 0;
  array.forEach((value, index) => {
    result = result + value
  });
  return result;
}

console.log(multiply([2, 3, 5,4]));
console.log(multiply([7, 10]));

const multiplypara = (a,b) => a*b;
console.log(multiplypara(1, 6));


// 2
function countPositive (nums) {
      let positivenums = 0;
    nums.forEach((value, index) => {
    if (value > 0) {
      positivenums++;
    }
   });
   return positivenums;
}

console.log(countPositive([1, -3, 5]));


function addNum (array, nums) {
return array.map(value => value + nums);
}
console.log(addNum([1, 2, 3], 2));

// 3&4
function removeEgg(foods) {
 return foods.filter(value => value !== 'egg' )} 

// or 
function removeEgg(foods) {
  let eggRemove = 0;
  return foods.filter ((value) => {
    if (value === 'egg' && eggRemove < 2) {
      eggRemove ++;
      return false;
    } else {return true;}
  })
}


console.log(removeEgg(['egg', 'apple', 'egg', 'egg', 'ham']));
*/
// 5


