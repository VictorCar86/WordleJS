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
        letterButton.id = letter.toUpperCase()
        letterButton.textContent = letter
        switch (letter){
            case "enter":
                letterButton.onclick = sendAnswer
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
const collectionWords = [
    [ 'c', 'e', 'r', 'd', 'o' ],
    [ 'b', 'a', 'r', 'c', 'o' ],
    [ 'c', 'a', 'r', 't', 'a' ],
    [ 'm', 'o', 'r', 'a', 's' ],
    [ 's', 'u', 'i', 'z', 'a' ],
    [ 'a', 'l', 'm', 'a', 's' ],
    [ 'c', 'h', 'i', 'n', 'a' ],
    [ 'p', 'a', 't', 'o', 's' ],
    [ 'e', 'm', 'o', 'j', 'i' ],
    [ 'm', 'e', 'm', 'e', 's' ],
    [ 'j', 'o', 'y', 'a', 's' ],
    [ 'g', 'a', 't', 'o', 's' ],
    [ 'z', 'o', 'r', 'r', 'o' ],
    [ 'p', 'e', 'r', 'r', 'o' ],
    [ 'v', 'o', 't', 'a', 'r' ],
    [ 'm', 'a', 'n', 'g', 'o' ],
    [ 'p', 'e', 'c', 'e', 's' ],
    [ 'v', 'o', 'l', 'a', 'r' ],
    [ 'r', 'a', 't', 'a', 's' ],
    [ 'r', 'u', 'i', 'd', 'o' ],
    [ 's', 'e', 't', 'a', 's' ],
    [ 't', 'o', 'p', 'o', 's' ],
]

let secretWord = [];

function randomWord(){
    const random = Math.floor(Math.random() * 100)
    if (random > 22){
        randomWord()
    } else {
        return secretWord = collectionWords[random]
    }
}
randomWord()

let squarePosition = 0;
let attempts = 0;

let answer = [];

function pushLetter(){
    const letter = event.target
    if (answer.length < 5){
        console.log(letter.id)
        document.getElementById(`${attempts}-${squarePosition}`).textContent = letter.id
        answer.push(letter.id.toLowerCase())
        squarePosition++
    } else {
        alert("No es posible añadir más caracteres")
    }
    console.log(answer)
}
function deleteLetter(){
    if (answer.length){
        document.getElementById(`${attempts}-${squarePosition-1}`).textContent = ""
        answer.pop()
        squarePosition--
    } else {
        alert("No hay caracteres por borrar")
    }
    console.log(answer)
}
function sendAnswer(){
    if (answer.length === 5){
        if (JSON.stringify(answer) == JSON.stringify(secretWord)){
            for (let index = 0; index < 5; index++) {
                document.getElementById(`${attempts}-${index}`).style.backgroundColor = "#04bc04"
            }
            setTimeout(() => alert("Has ganado :D"), 500)
        } else {
            for (let answerIndex = 0; answerIndex < answer.length; answerIndex++) {
                const insertedLetter = answer[answerIndex];
                for (let secretIndex = 0; secretIndex < secretWord.length; secretIndex++) {
                    const secretLetter = secretWord[secretIndex];
                    if (secretLetter === insertedLetter && answerIndex === secretIndex) {
                        document.getElementById(`${attempts}-${answerIndex}`).style.backgroundColor = "#e5d005"
                    }
                }
            }
            attempts++
            squarePosition = 0
            answer= []
        }
    } else {
        alert("Por favor, rellene los demás espacios")
    }
}