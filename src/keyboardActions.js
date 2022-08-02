document.addEventListener("keyup", (letter) => {
    switch (letter.key){
        case "Backspace":
            deleteLetter()
            break
        case "Enter":
            sendAnswer()
            break
        case "q":
            pushLetter("Q")
            break
        case "w":
            pushLetter("W")
            break
        case "e":
            pushLetter("E")
            break
        case "r":
            pushLetter("R")
            break
        case "t":
            pushLetter("T")
            break
        case "y":
            pushLetter("Y")
            break
        case "u":
            pushLetter("U")
            break
        case "i":
            pushLetter("I")
            break
        case "o":
            pushLetter("O")
            break
        case "p":
            pushLetter("P")
            break
        case "a":
            pushLetter("A")
            break
        case "s":
            pushLetter("S")
            break
        case "d":
            pushLetter("D")
            break
        case "f":
            pushLetter("F")
            break
        case "g":
            pushLetter("G")
            break
        case "h":
            pushLetter("H")
            break
        case "j":
            pushLetter("J")
            break
        case "k":
            pushLetter("K")
            break
        case "l":
            pushLetter("L")
            break
        case "z":
            pushLetter("Z")
            break
        case "x":
            pushLetter("X")
            break
        case "c":
            pushLetter("C")
            break
        case "v":
            pushLetter("V")
            break
        case "b":
            pushLetter("B")
            break
        case "n":
            pushLetter("N")
            break
        case "m":
            pushLetter("M")
            break
    }
})