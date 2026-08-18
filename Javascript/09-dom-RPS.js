let result = "";

let scores = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
const computerMove = pickComputerMove();

function playGame(playerMove) {
  let result = "";
  const computerMove = pickComputerMove();

  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You lose.";
    } else if (computerMove === "Scissors") {
      result = "You win.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You win.";
    } else if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You lose.";
    } else if (computerMove === "Paper") {
      result = "You win.";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
  }

  if (result === "You win.") {
    scores.wins += 1;
  } else if (result === "You lose.") {
    scores.losses += 1;
  } else if (result === "Tie.") {
    scores.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(scores));

  document.querySelector(".js-result").innerHTML = `${result}`;

  document.querySelector(".js-moves").innerHTML =
    `You <img src="images/${playerMove}.png" alt="" class="move-img"> <img src="images/${computerMove}.png" alt="" class="move-img"> Computer`;
    updateScore();
}
updateScore();


function updateScore() {
  document.querySelector(".js-score").innerText =
    `Wins: ${scores.wins}, Losses: ${scores.losses}, Ties ${scores.ties}.`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 2) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 2 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }

  return computerMove;
}
