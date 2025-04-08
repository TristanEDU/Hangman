const wordDisplay = document.querySelector(".word-display"); // I figured out that this const sets something in this case wordDisplay as a permanent variable. I means that in the future whenever I say "wordDisplay" I want you to search my html for the class word-display and act on it.
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// // Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
  // // Ressetting game variables and UI elements
  correctLetters = [];
  wrongGuessCount = 0;
  // console log for testing
  console.log("Initial wrongGuessCount:", wrongGuessCount); // I learned the basics of consol logging. I still am unsure about a lot of it but I can now generally figure out how to log something after a couple of tries.
  hangmanImage.src = "images/hangman-0.svg";
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  //     // Selecting a random word and hint from the wordList
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]; // I figured out how it is calling the random words. In the word-list.js there is a const that sets wordList to always refer to the word/hint pairs it contains. I still don't understand how this js doc knows that that is what that one says but it does. I also have yet to figure out how it randomizes the pairs.
  currentWord = word; // Making currentWord as random word
  document.querySelector(".hint-text b").innerText = hint;
  resetGame(); // I understand how it modifies the html to accept the word/hint. I am still trying to understand why it sets the placement for the hint text but not the placement for the actual word.
};

const gameOver = (isVictory) => {
  // After game complete.. showing modal with relevant details
  const modalText = isVictory ? `You found the word:` : "The correct word was:";
  gameModal.querySelector("img").src = `images/${
    isVictory ? "victory" : "lost"
  }.gif`;
  gameModal.querySelector("h4").innerText = isVictory
    ? "Congrats!"
    : "Game Over!";
  gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
  gameModal.classList.add("show");
};

const initGame = (button, clickedLetter) => {
  // I understand on a broad scale what all of this does but I do not really have a clear understanding of each element yet.
  console.log("initGame called with Letter:", clickedLetter); // ChatGPT suggested console log for learning/practice purposes
  // Checking if clickedLetter is exist on the currentWord
  if (currentWord.includes(clickedLetter)) {
    console.log(clickedLetter, "is in the word"); // ChatGPT suggested console log for learning/practice purposes
    console.log("current Word", currentWord);
    // Showing all correct letters on the word display
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        console.log("Correct letter so far:", correctLetters); //correct letter log, it should update every time a correct letter is clicked but for some reason it will only update every a the previous correct letter and not the current one.
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    console.log(clickedLetter, "is NOT in the word"); // ChatGPT suggested console log for learning/practice purposes
    // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
    wrongGuessCount++;
    // Console log for testing purposes
    console.log("Current wrong guess count", wrongGuessCount);
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  console.log("button status", button.disabled); // Disabling the clicked button so user can't click again and console logging it
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  // Calling gameOver function if any of these condition meets
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);

// console logs for learning and testing purposes:
wrongGuessCount++;
console.log("Updated wrongGuessCount:", wrongGuessCount);

// ChatGPT practice code. Anything in this section was written in response to a promt from GPT
// const testDiv = document.querySelector(".test");
// const levelDiv = document.querySelector(".level-select");

// for (let i = 1; i <= 5; i++) {
//     const button = document.createElement("button");
//     button.innerText = "Level " + i;
//     testDiv.appendChild(button);

//     button.addEventListener("click", () => {
//         console.log("You Selected Level " + i);
//     });
// }

// function createLevelButton() {
// console.log("reached function")
//     const button = document.createElement("button");
//     button.innerText = "Easy";
//     levelDiv.appendChild(button);

//     button.addEventListener("click", () => {
//         console.log("You selected Easy difficulty");
//     });
// }

function createLevelButtons() {
  console.log("reached function");

  const easybtn = document.createElement("button");
  easybtn.innerText = "Easy";
  easybtn.addEventListener("click", () => {
    console.log("You selected Easy difficulty");
  });
  levelDiv.appendChild(easybtn);

  const MediumBtn = document.createElement("button");
  MediumBtn.innerText = "Medium";
  MediumBtn.addEventListener("click", () => {
    console.log("You selected Medium difficulty");
  });
  levelDiv.appendChild(MediumBtn);

  const HardBtn = document.createElement("button");
  HardBtn.innerText = "Hard";
  HardBtn.addEventListener("click", () => {
    console.log("You selected Hard difficulty");
  });
  levelDiv.appendChild(HardBtn);
}

createLevelButtons();
