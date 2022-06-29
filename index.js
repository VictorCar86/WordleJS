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
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["enter", "Z", "X", "C", "V", "B", "N", "M", "delete"]
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
    [ 'd', 'e', 'd', 'o', 's' ],
    [ 'j', 'o', 'y', 'a', 's' ],
    [ 'a', 'p', 'o', 'y', 'o' ],
    [ 'g', 'a', 't', 'o', 's' ],
    [ 'z', 'o', 'r', 'r', 'o' ],
    [ 'p', 'e', 'r', 'r', 'o' ],
    [ 'g', 'a', 'n', 'a', 'r' ],
    [ 'v', 'o', 't', 'a', 'r' ],
    [ 'm', 'a', 'n', 'g', 'o' ],
    [ 'c', 'o', 'm', 'e', 'r' ],
    [ 'p', 'e', 'c', 'e', 's' ],
    [ 'l', 'o', 'c', 'o', 's' ],
    [ 'v', 'o', 'l', 'a', 'r' ],
    [ 'l', 'i', 'c', 'o', 'r' ],
    [ 'c', 'i', 'r', 'c', 'o' ],
    [ 'r', 'a', 't', 'a', 's' ],
    [ 'p', 'o', 'l', 'l', 'o' ],
    [ 'q', 'u', 'e', 's', 'o' ],
    [ 'c', 'a', 'r', 'r', 'o' ],
    [ 'r', 'u', 'i', 'd', 'o' ],
    [ 'c', 'a', 'z', 'a', 'r' ],
    [ 's', 'e', 't', 'a', 's' ],
    [ 't', 'o', 'p', 'o', 's' ],
    [ 'g', 'a', 'f', 'a', 's' ],
]

let secretWord = collectionWords[0];

// function randomWord(){
//     const random = Math.floor(Math.random() * 100)
//     if (random > collectionWords.length){
//         randomWord()
//     } else {
//         return secretWord = collectionWords[random]
//     }
// }
// randomWord()

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
    console.log(attempts, squarePosition)
    if (answer.length === 5){
        if (!collectionWords.some(element => JSON.stringify(element) == JSON.stringify(answer))){
            alert("La palabra ingresada no existe en la base de datos")
        } else {
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
                        console.log(secretLetter, insertedLetter, answerIndex, secretIndex)
                        if (secretLetter === insertedLetter && secretIndex === answerIndex) {
                            document.getElementById(`${attempts}-${answerIndex}`).style.backgroundColor = "#04bc04"
                            document.getElementById(insertedLetter.toUpperCase()).style.backgroundColor = "#04bc04"
                        } else if (secretLetter != insertedLetter && secretIndex === answerIndex){
                            document.getElementById(`${attempts}-${answerIndex}`).style.backgroundColor = "gray"
                            document.getElementById(insertedLetter.toUpperCase()).style.backgroundColor = "gray"
                        }
                        // if (JSON.stringify(answer).includes(secretLetter)){
                        //     document.getElementById(`${attempts}-${answerIndex}`).style.backgroundColor = "#E5D005"
                        //     document.getElementById(insertedLetter.toUpperCase()).style.backgroundColor = "#E5D005"
                        // }
                    }
                }
                attempts++
                squarePosition = 0
                answer= []
            }
        }
    } else {
        alert("Por favor, rellene los demás espacios")
    }
}