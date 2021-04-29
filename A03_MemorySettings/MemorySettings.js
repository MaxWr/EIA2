"use strict";
window.onload = function main() {
    handleStart();
};
function handleStart() {
    document.getElementById("startButton")?.addEventListener("click", createGame);
}
let cards = [];
let oneCardRevealed = false;
let firstRevealedCard;
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
function createGame() {
    let cardAmountInput = document.getElementById("cardAmount");
    let cardAmount = parseInt(cardAmountInput.value);
    for (let i = 0; i < cardAmount; i++) {
        let div0 = document.createElement("div");
        let slider = document.getElementById("cardSize");
        let colorPick = document.getElementById("colorPickBack");
        div0.style.backgroundColor = colorPick.value;
        div0.style.width = slider.value + "px";
        div0.style.height = slider.value + "px";
        let p0 = document.createElement("p");
        p0.textContent = i.toString();
        p0.style.visibility = "hidden";
        let colorPickFont = document.getElementById("colorPickFont");
        p0.style.color = colorPickFont.value;
        let fontPick = document.getElementById("fontPick");
        p0.style.fontFamily = fontPick.value;
        div0.appendChild(p0);
        let div1 = document.createElement("div");
        div1.style.backgroundColor = colorPick.value;
        div1.style.width = slider.value + "px";
        div1.style.height = slider.value + "px";
        let p1 = document.createElement("p");
        p1.innerText = i.toString();
        p1.style.visibility = "hidden";
        p1.style.fontFamily = fontPick.value;
        div1.appendChild(p1);
        cards.push(div0, div1);
    }
    cards = shuffleArray(cards);
    for (let j = 0; j < cardAmount * 2; j++) {
        document.body.appendChild(cards[j]);
        cards[j].addEventListener("click", revealCard);
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function revealCard(_event) {
    let card = _event.target;
    let x = card.children[0];
    x.style.visibility = "visible";
    let colorPickFront = document.getElementById("colorPickFront");
    let colorPickBack = document.getElementById("colorPickBack");
    card.style.backgroundColor = colorPickFront.value;
    if (oneCardRevealed) {
        //sleep(700);
        let y = firstRevealedCard.children[0];
        if (x.textContent == y.textContent) {
            for (let a = 0; a < cards.length; a++) {
                let b = cards[a].children[0];
                if (b.textContent == x.textContent)
                    cards.splice(a, 1);
            }
            card.remove();
            firstRevealedCard.remove();
        }
        else {
            x.style.visibility = "hidden";
            y.style.visibility = "hidden";
            card.style.backgroundColor = colorPickBack.value;
            firstRevealedCard.style.backgroundColor = colorPickBack.value;
        }
        oneCardRevealed = false;
    }
    else {
        firstRevealedCard = card;
        oneCardRevealed = true;
    }
    if (cards.length == 1) {
        let c = document.getElementById("endScreen");
        c.style.visibility = "visible";
    }
}
//# sourceMappingURL=MemorySettings.js.map