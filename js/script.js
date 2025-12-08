console.log("connected")

var errors = 0;
var cardList = [
    "cake",
    "cinnamon",
    "cookie",
    "cupcake",
    "donut",
    "icecream",
    "macaron",
    "pie",
    "popsicle",
    "poptart"
]

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected;
var card2Selected;


window.onload = function () {
    shuffleCards();
    startGame();

    document.getElementById("resetBtn").addEventListener("click", resetGame);
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); //two of each card
    console.log(cardSet)
    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    //arrange board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".svg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    // see cards for a moment: 
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.svg";
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".svg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".svg";
            setTimeout(update, 1000);

        }
    }
}

function update() {
    if (card1Selected.src != card2Selected.src) {
        //not a match
        card1Selected.src = "back.svg";
        card2Selected.src = "back.svg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}

function resetGame() {
    // Clear the board HTML
    document.getElementById("board").innerHTML = "";

    // Reset game variables
    errors = 0;
    document.getElementById("errors").innerText = errors;
    board = [];
    card1Selected = null;
    card2Selected = null;

    // Shuffle and start a new game
    shuffleCards();
    startGame();
}



