document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".box");
  const popup = document.querySelector(".flex");
  const newGameButton = document.getElementById("button");
  const restartButton = document.getElementById("restart");
  const message = document.getElementById("message");

  const winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let currentPlayer = "X";
  let movesMade = 0;

  function disableButtons() {
    buttons.forEach((button) => {
      button.disabled = true;
    });
    popup.classList.remove("hide");
  }

  function enableButtons() {
    buttons.forEach((button) => {
      button.textContent = "";
      button.disabled = false;
    });
    popup.classList.add("hide");
  }

  function announceWinner(player) {
    disableButtons();
    message.innerHTML = `Player '${player}' won the game!`;
    document.querySelector("#result").style.visibility = "visible";
    document.querySelector("#result").style.opacity = 1;
    message.style.visibility = 'visible';
    message.style.opacity = 1;
  }

  function declareDraw() {
    disableButtons();
    message.innerHTML = "It's a Draw!";
    message.style.visibility = 'visible';
    message.style.opacity = 1;

  }

  newGameButton.addEventListener("click", () => {
    movesMade = 0;
    enableButtons();
  });

  restartButton.addEventListener("click", () => {
    movesMade = 0;
    enableButtons();
  });

  function checkForWinner() {
    for (const combination of winningCombinations) {
      const [firstIndex, secondIndex, thirdIndex] = combination;
      const firstValue = buttons[firstIndex].textContent;
      const secondValue = buttons[secondIndex].textContent;
      const thirdValue = buttons[thirdIndex].textContent;

      if (firstValue !== "" && firstValue === secondValue && secondValue === thirdValue) {
        announceWinner(firstValue);
        return true;
      }
    }

    return false;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.disabled) {
        return;
      }

      button.textContent = currentPlayer;
      button.disabled = true;

      movesMade++;

      if (!checkForWinner() && movesMade === 9) {
        declareDraw();
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });
  });

  enableButtons(); // Ensure buttons are enabled on page load
});
