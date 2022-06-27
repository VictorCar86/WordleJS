// Squares
const squares = document.getElementById("squares");

let squaresToDom = [];

for (let row = 0; row < 6; row++){
    const squaresUl = document.createElement("ul");
    squaresUl.classList.add("square-row")
    for (let column = 0; column < 5; column++){
        const squareLi = document.createElement("li");
        squareLi.classList.add("square-column")
        squareLi.id = `${row}-${column}`
        squaresUl.appendChild(squareLi)
    }
    squaresToDom.push(squaresUl)
}

squares.append(...squaresToDom)

// Keyboard
const keyboard = document.getElementById("keyboard");

let keyboardToDom = [];

const arrayKeyboard = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"]
];

arrayKeyboard.map((letters) => {
    const letterRow = document.createElement("ul");
    letterRow.classList.add("letter-row")
    letters.map((letter) => {
        const letterButton = document.createElement("li")
        letterButton.classList.add("letter-column")
        letterButton.id = letter
        letterButton.textContent = letter
        switch (letter){
            case "enter":
                //letterButton.onclick()
                break
            case "delete":
                letterButton.onclick = deleteLetter
                break
            default:
                letterButton.onclick = pushLetter
                break
        }
        letterRow.appendChild(letterButton)
    })
    keyboardToDom.push(letterRow)
})

keyboard.append(...keyboardToDom)

// Game logic
let secretWord = ["p", "e", "r", "r", "o"];

let attempts = 0;

let answer = [];

function pushLetter(){
    const letter = event.target
    if (answer.length < 5){
        document.getElementById(`0-${attempts}`).textContent = letter.id
        answer.push(letter.id)
        attempts++
    } else {
        alert("No es posible añadir más caracteres")
    }
    console.log(answer)
}
function deleteLetter(){
    if (answer.length){
        document.getElementById(`0-${attempts-1}`).textContent = ""
        answer.pop()
        attempts--
    } else {
        alert("No hay caracteres por borrar")
    }
    console.log(answer)
}