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
let formData;
function createGame() {
    formData = new FormData(document.forms[0]);
    let cardAmount = parseInt(formData.get("cardAmount"));
    for (let i = 0; i < cardAmount; i++) {
        let div0 = document.createElement("div");
        let div1 = document.createElement("div");
        div0.style.backgroundColor = formData.get("colorPickBack");
        div0.style.width = formData.get("cardSize") + "px";
        div0.style.height = formData.get("cardSize") + "px";
        div0.id = "A";
        div1.style.backgroundColor = formData.get("colorPickBack");
        div1.style.width = formData.get("cardSize") + "px";
        div1.style.height = formData.get("cardSize") + "px";
        div1.id = "B";
        let p0 = document.createElement("p");
        let p1 = document.createElement("p");
        p0.textContent = i.toString();
        p0.style.visibility = "hidden";
        p0.style.color = formData.get("colorPickFont");
        p0.style.fontFamily = formData.get("font");
        p1.textContent = i.toString();
        p1.style.visibility = "hidden";
        p1.style.color = formData.get("colorPickFont");
        p1.style.fontFamily = formData.get("font");
        div0.appendChild(p0);
        div1.appendChild(p1);
        cards.push(div0, div1);
    }
    cards = shuffleArray(cards);
    for (let j = 0; j < cardAmount * 2; j++) {
        document.getElementById("container").appendChild(cards[j]);
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
let card;
let x;
let y;
function revealCard(_event) {
    card = _event.target;
    x = card.children[0];
    if (firstRevealedCard != null)
        y = firstRevealedCard.children[0];
    if (firstRevealedCard != null && card.id == firstRevealedCard.id && x.textContent == y.textContent)
        return;
    x.style.visibility = "visible";
    card.style.backgroundColor = formData.get("colorPickFront");
    if (oneCardRevealed) {
        if (x.textContent == y.textContent) {
            for (let a = 0; a < cards.length; a++) {
                let b = cards[a].children[0];
                if (b.textContent == x.textContent)
                    cards.splice(a, 1);
            }
            setTimeout(removeCards, 1000);
        }
        else {
            setTimeout(hideCards, 1000);
        }
        oneCardRevealed = false;
    }
    else {
        firstRevealedCard = card;
        oneCardRevealed = true;
    }
    if (cards.length == 2) {
        let c = document.getElementById("endScreen");
        c.style.visibility = "visible";
    }
}
function hideCards() {
    x.style.visibility = "hidden";
    y.style.visibility = "hidden";
    card.style.backgroundColor = formData.get("colorPickBack");
    firstRevealedCard.style.backgroundColor = formData.get("colorPickBack");
    firstRevealedCard = null;
}
function removeCards() {
    card.remove();
    firstRevealedCard.remove();
}
//# sourceMappingURL=MemorySettings.js.map