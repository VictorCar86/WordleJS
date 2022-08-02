// Squares
const squares = document.getElementById("squares");

let squaresToDom = [];

for (let row = 0; row < 6; row++) {
  const squaresUl = document.createElement("ul");
  squaresUl.classList.add("square-row");
  for (let column = 0; column < 5; column++) {
    const squareLi = document.createElement("li");
    squareLi.classList.add("square-column");
    squareLi.id = `${row}-${column}`;
    squaresUl.appendChild(squareLi);
  }
  squaresToDom.push(squaresUl);
}

squares.append(...squaresToDom);

// Keyboard
const keyboard = document.getElementById("keyboard");

let keyboardToDom = [];

const arrayKeyboard = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["enter", "Z", "X", "C", "V", "B", "N", "M", "delete"],
];

arrayKeyboard.map((letters) => {
  const letterRow = document.createElement("ul");
  letterRow.classList.add("letter-row");
  letters.map((letter) => {
    const letterButton = document.createElement("li");
    letterButton.classList.add("letter-column");
    letterButton.id = letter.toUpperCase();
    switch (letter) {
      case "enter":
        letterButton.onclick = sendAnswer;
        break;
      case "delete":
        letterButton.onclick = deleteLetter;
        break;
      default:
        letterButton.onclick = pushLetter;
        letterButton.textContent = letter;
        break;
    }
    letterRow.appendChild(letterButton);
  });
  keyboardToDom.push(letterRow);
});

keyboard.append(...keyboardToDom);

// Game logic
let secretWord = collectionWords[0];

function randomWord(){
    const random = Math.floor(Math.random() * 100)
    if (random > collectionWords.length){
        randomWord()
    } else {
        return secretWord = collectionWords[random]
    }
}
randomWord()

let squarePosition = 0;
let attempts = 0;

let answer = [];
let buttonAvaliable = true;

function pushLetter(event) {
  if (buttonAvaliable) {
    const letterButton = event.target;
    if (answer.length < 5) {
      if (letterButton) {
        document.getElementById(`${attempts}-${squarePosition}`).textContent = letterButton.id;
        answer.push(letterButton.id.toLowerCase());
      } else {
        document.getElementById(`${attempts}-${squarePosition}`).textContent = event;
        answer.push(event.toLowerCase());
      }
      squarePosition++;
    }
  }
  console.log(answer);
}
function deleteLetter() {
  if (buttonAvaliable) {
    if (answer.length) {
      document.getElementById(`${attempts}-${squarePosition - 1}`).textContent =
        "";
      answer.pop();
      squarePosition--;
    } else {
      alert("No hay caracteres por borrar");
    }
  }
  console.log(answer);
}
function sendAnswer() {
  console.log(attempts, squarePosition);
  console.log(secretWord);
  const colorWords = []

  if (answer.length === 5) {
    if (
      !collectionWords.some(
        (element) => JSON.stringify(element) == JSON.stringify(answer)
      )
    ) {
      alert("La palabra ingresada no existe en la base de datos");
    } else {
      if (JSON.stringify(answer) == JSON.stringify(secretWord)) {
        for (let index = 0; index < 5; index++) {
          document.getElementById(
            `${attempts}-${index}`
          ).style.backgroundColor = "#04bc04";
          document.getElementById(`${attempts}-${index}`).style.color = "white";
        }
        setTimeout(() => alert("Has ganado :D"), 500);
        buttonAvaliable = false;
      } else {
        for (let answerIndex = 0; answerIndex < answer.length; answerIndex++) {
          const insertedLetter = answer[answerIndex];

          for (
            let secretIndex = 0;
            secretIndex < secretWord.length;
            secretIndex++
          ) {
            const secretLetter = secretWord[secretIndex];

            function newBackground(newColor) {
              document.getElementById(`${attempts}-${answerIndex}`).style.backgroundColor = newColor;
              document.getElementById(`${attempts}-${answerIndex}`).style.color = "white";
              document.getElementById(insertedLetter.toUpperCase()).style.backgroundColor = newColor;
            }

            // console.log(secretLetter, insertedLetter, secretIndex, answerIndex);
            // if (secretIndex == 4) console.log("-------");

            let wordExist = secretIndex+1;
            if (answerIndex > 4) {
              wordExist = 4
            }
            // console.log(wordExist)
            if (
              secretLetter === insertedLetter &&
              answerIndex === secretIndex
            ) {
              colorWords.push(`${insertedLetter}: green`)
              newBackground("#04bc04");
            }
            else if (
              answerIndex !== secretIndex &&
              insertedLetter === secretLetter &&
              !colorWords.includes(`${insertedLetter}: yellow`) &&
              !colorWords.includes(`${insertedLetter}: green`) &&
              !secretWord.includes(insertedLetter, wordExist)
            ) {
              // console.log(insertedLetter, secretIndex+1, wordExist)
              newBackground("#E5D005")
              colorWords.push(`${insertedLetter}: yellow`)
            }
            else {
              document.getElementById(`${attempts}-${answerIndex}`).classList.add("gray");
              document.getElementById(insertedLetter.toUpperCase()).classList.add("gray");
            }
          }
        }
        if (squarePosition === 5 && attempts === 5) {
          alert(
            `Se han acabado tus intentos\nLa respuesta correcta era ✨${secretWord
              .join("")
              .toUpperCase()}✨`
          );
          buttonAvaliable = false;
        } else {
          attempts++;
          squarePosition = 0;
          answer = [];
        }
      }
    }
  } else {
    alert("Por favor, rellene los demás espacios");
  }
}
